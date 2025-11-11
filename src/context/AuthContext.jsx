import { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../pages/utils/firebase";
import axios from "axios";

// Create Context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔹 Helper: Send Firebase token to backend
  const loginWithToken = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Change URL if needed
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Login with token failed:", error);
      throw new Error("Backend login failed");
    }
  };

  // 🔹 Register user
  const register = async (email, password, name, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL,
    });
    return userCredential.user;
  };

  // 🔹 Login with email & password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const response = await loginWithToken(token);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 🔹 Login with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      const response = await loginWithToken(token);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    register,
    login,
    loginWithGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
