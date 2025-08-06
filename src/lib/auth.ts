import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  User,
} from "firebase/auth";

// This function will be called on the client, where the firebase app is initialized.
const getClientAuth = async () => {
  const { auth } = await import("./firebase");
  return auth;
}

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

export const signInWithApple = async (): Promise<User | null> => {
  try {
    const auth = await getClientAuth();
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Apple:", error);
    // Handle specific Apple sign-in errors if necessary
    return null;
  }
};
