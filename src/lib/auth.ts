
"use client";

import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  User,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signInWithCustomToken as fbSignInWithCustomToken,
} from "firebase/auth";
import type { Auth } from "firebase/auth";

const getClientAuth = async (): Promise<Auth | null> => {
  if (typeof window === "undefined") return null;
  const { auth } = await import("@/lib/firebase");
  return auth;
};

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return null;
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, googleProvider);
    await auth.currentUser?.getIdToken(true); // force refresh to pick up custom claims
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

export const signInWithApple = async (): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return null;
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, appleProvider);
    await auth.currentUser?.getIdToken(true);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Apple:", error);
    return null;
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return null;
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);
    await auth.currentUser?.getIdToken(true);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
    return null;
  }
};

export const signInWithCustomToken = async (token: string): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return null;
    await setPersistence(auth, browserLocalPersistence);
    const result = await fbSignInWithCustomToken(auth, token);
    return result.user;
  } catch (error) {
    console.error("Error signing in with custom token:", error);
    return null;
  }
};


export const signOut = async (): Promise<void> => {
  try {
    const auth = await getClientAuth();
    if (!auth) return;
    const { signOut: firebaseSignOut } = await import("firebase/auth");
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
