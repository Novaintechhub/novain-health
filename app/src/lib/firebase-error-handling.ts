
"use client";

import { EventEmitter } from 'events';
import type { DocumentReference, DocumentData } from 'firebase/firestore';

// Create a singleton event emitter
export const errorEmitter = new EventEmitter();

export type FirestoreOperation = 'get' | 'list' | 'create' | 'update' | 'delete';

export class FirestorePermissionError extends Error {
    constructor(
        public message: string,
        public path: string,
        public operation: FirestoreOperation,
        public resource?: DocumentData
    ) {
        super(message);
        this.name = 'FirestorePermissionError';
    }
}
