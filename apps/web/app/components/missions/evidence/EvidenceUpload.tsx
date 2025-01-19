'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@H1V3M1ND/ui';
import { Progress } from '@H1V3M1ND/ui';
import { cn } from '@H1V3M1ND/ui/lib/utils';

interface EvidenceFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

interface EvidenceUploadProps {
  onUploadComplete: (files: EvidenceFile[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
}

export function EvidenceUpload({
  onUploadComplete,
  maxFiles = 5,
  acceptedFileTypes = ['image/*', 'application/pdf', '.txt'],
}: EvidenceUploadProps) {
  const [files, setFiles] = useState<EvidenceFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading' as const,
      }));

      setFiles((prev) => {
        const updated = [...prev, ...newFiles].slice(0, maxFiles);
        simulateUpload(updated);
        return updated;
      });
    },
    [maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  });

  const simulateUpload = (uploadFiles: EvidenceFile[]) => {
    uploadFiles.forEach((file) => {
      if (file.status === 'uploading') {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    progress,
                    status: progress === 100 ? 'success' : 'uploading',
                  }
                : f
            )
          );

          if (progress === 100) {
            clearInterval(interval);
            onUploadComplete(files);
          }
        }, 500);
      }
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          'hover:border-cyber-purple hover:bg-cyber-dark/50',
          isDragActive && 'border-neon-purple bg-cyber-dark/50',
          'focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-cyber-purple mb-4" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop the files here' : 'Drag & drop evidence files here'}
        </p>
        <p className="text-sm text-gray-500">or click to select files</p>
        <p className="text-xs text-gray-400 mt-2">
          Supported files: Images, PDFs, Text files (max {maxFiles} files)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center p-3 bg-cyber-dark rounded-lg border border-cyber-purple/30"
            >
              <FileText className="h-5 w-5 text-cyber-purple mr-3" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                {file.status === 'uploading' && <Progress value={file.progress} className="mt-2" />}
                {file.status === 'error' && (
                  <p className="text-xs text-red-400 mt-1">{file.errorMessage}</p>
                )}
              </div>
              {file.status === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 ml-3" />
              ) : file.status === 'error' ? (
                <AlertCircle className="h-5 w-5 text-red-500 ml-3" />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="ml-3 hover:bg-red-500/10 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
