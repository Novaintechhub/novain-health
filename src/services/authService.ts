'use client';

import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  User,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';

// This function will be called on the client, where the firebase app is initialized.
const getClientAuth = async (): Promise<Auth | null> => {
  if (typeof window === 'undefined') {
    return null;
  }
  const { auth } = await import('@/lib/firebase');
  return auth;
};

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return null;
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
};

export const signInWithApple = async (): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return null;
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
