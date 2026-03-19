import { createClient } from "@/lib/supabase/client";

export default async function ImageToUrl(file: File): Promise<string | undefined> {
    const supabase = createClient()
    try {
          //   setUploading(true);
          const filePath = `${Date.now()}.${file.name.split('.').pop()}`;
    
          // Upload the file
          const { error: uploadError } = await supabase.storage
            .from('blog_data')
            .upload(filePath, file);
    
          if (uploadError) throw uploadError;
    
          // Get public URL
          const { data:url } = supabase.storage.from('blog_data').getPublicUrl(filePath);
          const imageUrl = url.publicUrl;
          return imageUrl;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error('Image upload error:', message);
        } finally {
          //   setUploading(false);
        }
}