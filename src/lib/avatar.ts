import { supabase } from "@/integrations/supabase/client";

/** Bucket name used for all user avatar uploads. */
export const AVATAR_BUCKET = "avatars";

/** Accepted MIME types for avatar uploads. */
export const AVATAR_ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** Maximum avatar file size: 5 MB */
export const AVATAR_MAX_BYTES = 5 * 1024 * 1024;

/**
 * Generates the storage object path for a user avatar.
 * Uses a fixed path per-user so re-uploading overwrites the previous file.
 */
export function avatarPath(userId: string, ext: string): string {
  return `${userId}/avatar.${ext}`;
}

/**
 * Returns the public URL for an avatar stored in the avatars bucket.
 */
export function getAvatarPublicUrl(storagePath: string): string {
  return supabase.storage.from(AVATAR_BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

/**
 * Uploads an avatar file and returns its public URL.
 * Throws on upload failure.
 */
export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const rawExt = file.name.split(".").pop() ?? "jpg";
  const ext = rawExt.toLowerCase();
  const path = avatarPath(userId, ext);

  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: true });

  if (error) {
    throw new Error(error.message || "Failed to upload avatar");
  }

  return getAvatarPublicUrl(path);
}
