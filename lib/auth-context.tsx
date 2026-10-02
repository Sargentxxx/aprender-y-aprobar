"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { UserProfile, UserRole } from "@/lib/types";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "alberto.ezequiel.garcia@gmail.com";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  role: UserRole;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string, preferredRole?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRoleForDemo: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  profile: null,
  loading: true,
  role: "student",
  isAdmin: false,
  isTeacher: false,
  isStudent: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  logout: async () => {},
  switchRoleForDemo: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync profile when Firebase User changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);

          const isSuperAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            if (isSuperAdmin && data.role !== "admin") {
              await updateDoc(userRef, { role: "admin" });
              setProfile({ ...data, role: "admin" });
            } else {
              setProfile(data);
            }
          } else {
            // Create user profile document
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || "",
              displayName: user.displayName || user.email?.split("@")[0] || "Estudiante",
              photoURL: user.photoURL || undefined,
              role: isSuperAdmin ? "admin" : "student",
              universityName: "Universidad Siglo 21",
              career: "Licenciatura en Administración",
              studyStreak: 1,
              lastActiveDate: new Date().toISOString().split("T")[0],
              badges: ["Bienvenida", "Explorador Universitario"],
              totalStudyMinutes: 45,
              createdAt: new Date().toISOString(),
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          // Fallback in memory
          const fallbackRole = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "student";
          setProfile({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "Usuario",
            role: fallbackRole,
            studyStreak: 1,
            lastActiveDate: new Date().toISOString().split("T")[0],
            badges: ["Bienvenida"],
            totalStudyMinutes: 0,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.error("Email sign in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string, preferredRole: UserRole = "student") => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const isSuperAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const roleToAssign = isSuperAdmin ? "admin" : preferredRole;

      const newProfile: UserProfile = {
        uid: res.user.uid,
        email: email,
        displayName: name,
        role: roleToAssign,
        universityName: "Universidad Siglo 21",
        career: "Ciencias Económicas",
        studyStreak: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        badges: ["Bienvenida"],
        totalStudyMinutes: 0,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", res.user.uid), newProfile);
      setProfile(newProfile);
    } catch (err) {
      console.error("Sign up error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
    setFirebaseUser(null);
  };

  // Demo switcher to preview portals easily
  const switchRoleForDemo = async (newRole: UserRole) => {
    if (profile && firebaseUser) {
      const updated = { ...profile, role: newRole };
      setProfile(updated);
      try {
        await updateDoc(doc(db, "users", firebaseUser.uid), { role: newRole });
      } catch (err) {
        console.warn("Could not persist demo role change to firestore:", err);
      }
    }
  };

  const role = profile?.role || "student";
  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";
  const isStudent = role === "student";

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        loading,
        role,
        isAdmin,
        isTeacher,
        isStudent,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        switchRoleForDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
