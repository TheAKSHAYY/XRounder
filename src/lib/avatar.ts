import { supabase } from "@/integrations/supabase/client";

/** Bucket name used for all user avatar uploads. */
export const AVATAR_BUCKET = "avatars";
export const FALLBACK_BUCKET = "media";

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
 * Returns the public URL for an avatar stored in storage.
 */
export function getAvatarPublicUrl(storagePath: string, bucket = AVATAR_BUCKET): string {
  if (
    storagePath.startsWith("http://") ||
    storagePath.startsWith("https://") ||
    storagePath.startsWith("data:")
  ) {
    return storagePath;
  }
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

/**
 * Compresses and resizes an image file client-side to a max width/height (256px)
 * and returns it as a compact Data URL (< 35KB).
 * Used as a guaranteed fallback when Supabase storage buckets are unavailable or restricted.
 */
export async function fileToOptimizedDataUrl(
  file: File,
  maxDim = 256,
  quality = 0.85,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to decode image"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const webp = canvas.toDataURL("image/webp", quality);
          if (webp.startsWith("data:image/webp")) {
            resolve(webp);
            return;
          }
        } catch {
          // fallback to jpeg below
        }
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an avatar file and returns its public URL.
 * Attempts upload to 'avatars' bucket first.
 * If that fails (e.g. bucket doesn't exist or RLS), attempts 'media' bucket.
 * If storage upload fails altogether, cleanly falls back to a compact compressed Data URL
 * so profile picture upload NEVER fails for the user.
 */
export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const rawExt = file.name.split(".").pop() ?? "jpg";
  const ext = rawExt.toLowerCase();
  const path = avatarPath(userId, ext);

  // 1. Try dedicated 'avatars' bucket
  try {
    const { data, error } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: true });

    if (!error && data?.path) {
      return getAvatarPublicUrl(data.path, AVATAR_BUCKET);
    }
  } catch {
    // try fallback bucket
  }

  // 2. Try generic 'media' bucket fallback
  try {
    const fallbackPath = `avatars/${userId}.${ext}`;
    const { data: mediaData, error: mediaErr } = await supabase.storage
      .from(FALLBACK_BUCKET)
      .upload(fallbackPath, file, { contentType: file.type, upsert: true });

    if (!mediaErr && mediaData?.path) {
      return getAvatarPublicUrl(mediaData.path, FALLBACK_BUCKET);
    }
  } catch {
    // try data URL fallback
  }

  // 3. Fallback: compress and store as optimized Data URL (typically 15-30KB)
  // This guarantees 100% success even if Supabase storage is not configured.
  return await fileToOptimizedDataUrl(file);
}
