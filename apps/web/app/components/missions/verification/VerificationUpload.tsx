'use client';

import { useState, useRef } from 'react';
import { Button } from '@H1V3M1ND/ui';
import { Camera, Video, MapPin, Upload } from 'lucide-react';
import { VerificationRequirement, VerificationType } from '@H1V3M1ND/types';

interface VerificationUploadProps {
  verification: VerificationRequirement;
  onUpload: (files: File[]) => void;
  onLocationSubmit?: (coords: { latitude: number; longitude: number }) => void;
}

export function VerificationUpload({
  verification,
  onUpload,
  onLocationSubmit,
}: VerificationUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    // Validate file types if specified
    if (verification.metadata?.allowedFileTypes) {
      const invalidFiles = files.filter((file) => {
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        return !verification.metadata?.allowedFileTypes?.includes(ext);
      });

      if (invalidFiles.length) {
        alert(
          'Some files have invalid types. Allowed types: ' +
            verification.metadata.allowedFileTypes.join(', ')
        );
        return;
      }
    }

    // Validate number of files for multi-photo
    if (verification.type === VerificationType.MultiPhoto) {
      const totalFiles = uploadCount + files.length;
      if (verification.metadata?.minPhotos && totalFiles < verification.metadata.minPhotos) {
        alert(`Please upload at least ${verification.metadata.minPhotos} photos`);
        return;
      }
      if (verification.metadata?.maxPhotos && totalFiles > verification.metadata.maxPhotos) {
        alert(`Maximum ${verification.metadata.maxPhotos} photos allowed`);
        return;
      }
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // TODO: Replace with actual upload logic
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUploadCount((prev) => prev + files.length);
      onUpload(files);
      clearInterval(interval);
      setUploadProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLocationVerification = async () => {
    if (!onLocationSubmit) return;

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      onLocationSubmit({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error('Location access failed:', error);
      alert('Could not access location. Please enable location services and try again.');
    }
  };

  const renderUploadButton = () => {
    switch (verification.type) {
      case VerificationType.Photo:
        return (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <Button
              variant="outline"
              size="lg"
              className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
          </div>
        );

      case VerificationType.MultiPhoto:
        return (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <Button
              variant="outline"
              size="lg"
              className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photos ({uploadCount}/{verification.metadata?.minPhotos})
            </Button>
          </div>
        );

      case VerificationType.Video:
        return (
          <div className="space-y-2">
            <input
              type="file"
              accept="video/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <Button
              variant="outline"
              size="lg"
              className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Video className="w-5 h-5 mr-2" />
              Record Video
            </Button>
            {verification.metadata?.maxVideoLength && (
              <p className="text-xs text-cyber-gray text-center">
                Maximum length: {verification.metadata.maxVideoLength} seconds
              </p>
            )}
          </div>
        );

      case VerificationType.AutoGPS:
      case VerificationType.ManualGPS:
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="lg"
              className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
              onClick={handleLocationVerification}
            >
              <MapPin className="w-5 h-5 mr-2" />
              {verification.type === VerificationType.AutoGPS
                ? 'Verify Location'
                : 'Submit Location'}
            </Button>
            {verification.metadata?.gpsCoordinates && (
              <p className="text-xs text-cyber-gray text-center">
                Required coordinates: {verification.metadata.gpsCoordinates.latitude.toFixed(6)},{' '}
                {verification.metadata.gpsCoordinates.longitude.toFixed(6)}
              </p>
            )}
          </div>
        );

      case VerificationType.Document:
      case VerificationType.Code:
        return (
          <div className="space-y-2">
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              ref={fileInputRef}
              accept={verification.metadata?.allowedFileTypes?.join(',')}
            />
            <Button
              variant="outline"
              size="lg"
              className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload {verification.type === VerificationType.Document ? 'Document' : 'Code'}
            </Button>
            {verification.metadata?.allowedFileTypes && (
              <p className="text-xs text-cyber-gray text-center">
                Allowed types: {verification.metadata.allowedFileTypes.join(', ')}
              </p>
            )}
          </div>
        );

      default:
        return (
          <Button
            variant="outline"
            size="lg"
            className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Verification
          </Button>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderUploadButton()}
      {isUploading && (
        <div className="w-full bg-cyber-dark/50 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-neon-cyan transition-all duration-200"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}
