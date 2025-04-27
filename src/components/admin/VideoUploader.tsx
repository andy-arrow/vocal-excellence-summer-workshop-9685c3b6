
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const VideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // Check file type
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file",
          variant: "destructive"
        });
        return;
      }

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('public_videos')
        .upload('performance.mp4', file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public_videos')
        .getPublicUrl('performance.mp4');

      toast({
        title: "Upload successful",
        description: "The video has been uploaded successfully",
      });

      // Optionally refresh the page to show the new video
      window.location.reload();

    } catch (error: any) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading the video",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-medium mb-4">Upload Hero Video</h2>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Upload a video file (MP4 format recommended). The video will be displayed in the hero section.
        </p>
        <div className="flex items-center gap-4">
          <Button
            disabled={uploading}
            className="relative"
            onClick={() => document.getElementById('video-upload')?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Select Video'
            )}
          </Button>
          <input
            type="file"
            id="video-upload"
            className="hidden"
            accept="video/*"
            onChange={uploadVideo}
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;
