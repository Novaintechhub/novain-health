
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (dataUri: string) => void;
  currentImageUrl?: string | null;
}

export default function ImageUpload({ onImageChange, currentImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={preview || "https://placehold.co/96x96.png"} alt="Profile preview" />
          <AvatarFallback>
            <Camera className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </div>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/gif"
      />
      <Button type="button" variant="outline" onClick={handleUploadClick}>
        Upload Photo
      </Button>
    </div>
  );
}

    