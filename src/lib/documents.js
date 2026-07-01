// src/lib/documents.js
// Handles real uploads to Supabase Storage + nurse_documents table rows.
// Replaces the old local-state-only fake upload in App.jsx.

import { supabase } from "../supabase"

const BUCKET = "nurse-documents"
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export function validateFile(file) {
  if (!file) return "No file selected"
  if (!ALLOWED_TYPES.includes(file.type)) return "Only JPG, PNG, or PDF allowed"
  if (file.size > MAX_SIZE_BYTES) return "File too large. Max 5MB"
  return null
}

export async function uploadNurseDocument(userId, file, docType = "other") {
  const validationError = validateFile(file)
  if (validationError) return { error: validationError }

  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
  const storagePath = `${userId}/${timestamp}_${safeName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: false })

  if (uploadError) return { error: uploadError.message }

  const { data, error: dbError } = await supabase
    .from("nurse_documents")
    .insert({
      user_id: userId,
      doc_type: docType,
      file_name: file.name,
      file_path: storagePath,
      file_size_kb: +(file.size / 1024).toFixed(1),
      mime_type: file.type,
    })
    .select()
    .single()

  if (dbError) return { error: dbError.message }

  // Convenience pointer on the profile for the latest resume
  if (docType === "resume") {
    await supabase
      .from("nurse_profiles")
      .update({ resume_path: storagePath })
      .eq("user_id", userId)
  }

  return { document: data }
}

export async function listNurseDocuments(userId) {
  const { data, error } = await supabase
    .from("nurse_documents")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false })

  if (error) return { error: error.message }
  return { documents: data }
}

export async function deleteNurseDocument(doc) {
  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([doc.file_path])
  if (storageError) return { error: storageError.message }

  const { error: dbError } = await supabase
    .from("nurse_documents")
    .delete()
    .eq("id", doc.id)
  if (dbError) return { error: dbError.message }

  return { success: true }
}

// Generates a short-lived signed URL to view/download a private document
export async function getDocumentSignedUrl(filePath) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 60 * 5) // 5 minutes
  if (error) return { error: error.message }
  return { url: data.signedUrl }
}
