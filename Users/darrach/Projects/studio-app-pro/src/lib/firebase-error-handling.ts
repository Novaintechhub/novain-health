
"use client";

import { EventEmitter } from 'events';

// 1. Define the custom error class
export class FirestorePermissionError extends Error {
  public path: string;
  public operation: 'read' | 'write' | 'delete' | 'list';
  public resourceData?: Record<string, any>;

  constructor(
    message: string,
    path: string,
    operation: 'read' | 'write' | 'delete' | 'list',
    resourceData?: Record<string, any>
  ) {
    super(message);
    this.name = 'FirestorePermissionError';
    this.path = path;
    this.operation = operation;
    this.resourceData = resourceData;
  }
}

// 2. Create the event emitter instance
class ErrorEmitter extends EventEmitter {}
export const errorEmitter = new ErrorEmitter();
