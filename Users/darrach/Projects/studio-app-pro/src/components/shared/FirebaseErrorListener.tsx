
"use client";

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter, FirestorePermissionError } from '@/lib/firebase-error-handling';

export default function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error("Caught Firestore Permission Error:", error);
      
      const description = (
        <div className="text-xs font-mono bg-gray-800 text-white p-2 rounded-md overflow-x-auto">
          <p><strong>Operation:</strong> {error.operation}</p>
          <p><strong>Path:</strong> {error.path}</p>
          {error.resourceData && (
            <p><strong>Data:</strong> {JSON.stringify(error.resourceData, null, 2)}</p>
          )}
        </div>
      );

      toast({
        variant: 'destructive',
        title: 'Firestore Permission Denied',
        description: description,
        duration: 20000,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
