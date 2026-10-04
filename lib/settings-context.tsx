"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface SocialLinks {
  instagram: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
  facebook: string;
}

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
  buttonEnabled: boolean;
  tooltipText: string;
}

export interface SystemSettings {
  whatsapp: WhatsAppConfig;
  social: SocialLinks;
}

export const DEFAULT_SETTINGS: SystemSettings = {
  whatsapp: {
    phoneNumber: "+54 9 385 584-9201",
    defaultMessage: "¡Hola! Estoy en la plataforma de Aprender y Aprobar y quisiera consultar sobre las cátedras y materias de mi facultad.",
    buttonEnabled: true,
    tooltipText: "¿Dudas con tu materia? ¡Escribinos por WhatsApp!",
  },
  social: {
    instagram: "https://instagram.com/aprenderyaprobar",
    youtube: "https://youtube.com/@aprenderyaprobar",
    tiktok: "https://tiktok.com/@aprenderyaprobar",
    linkedin: "https://linkedin.com/company/aprender-y-aprobar",
    facebook: "https://facebook.com/aprenderyaprobar",
  },
};

const SETTINGS_STORAGE_KEY = "aprender_y_aprobar_settings_v1";

interface SettingsContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => Promise<void>;
  updateWhatsApp: (whatsapp: Partial<WhatsAppConfig>) => Promise<void>;
  updateSocial: (social: Partial<SocialLinks>) => Promise<void>;
  resetSettings: () => Promise<void>;
  getWhatsAppUrl: () => string;
  cleanPhoneNumber: (phone?: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function cleanPhoneNumber(phone?: string): string {
  if (!phone) return "";
  // Strip everything except digits
  return phone.replace(/[^\d]/g, "");
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            whatsapp: { ...DEFAULT_SETTINGS.whatsapp, ...(parsed.whatsapp || {}) },
            social: { ...DEFAULT_SETTINGS.social, ...(parsed.social || {}) },
          };
        }
      } catch (err) {
        console.warn("Could not load settings from localStorage:", err);
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Try loading from Firestore on mount
  useEffect(() => {
    let isMounted = true;
    async function loadRemoteSettings() {
      try {
        const docRef = doc(db, "system_settings", "general");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const remoteData = docSnap.data() as Partial<SystemSettings>;
          setSettings((prev) => {
            const merged: SystemSettings = {
              whatsapp: { ...prev.whatsapp, ...(remoteData.whatsapp || {}) },
              social: { ...prev.social, ...(remoteData.social || {}) },
            };
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
              } catch (_) {}
            }
            return merged;
          });
        }
      } catch (err) {
        // Fallback to localStorage / defaults seamlessly
        console.info("Using local settings storage (Firestore optional)");
      }
    }

    loadRemoteSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const persistSettings = async (nextSettings: SystemSettings) => {
    setSettings(nextSettings);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings));
      } catch (err) {
        console.warn("Error saving settings to localStorage:", err);
      }
    }

    // Attempt remote save to Firestore
    try {
      const docRef = doc(db, "system_settings", "general");
      await setDoc(docRef, nextSettings, { merge: true });
    } catch (err) {
      // Non-blocking if offline or rules prevent write
      console.info("Saved settings locally. Remote sync skipped.");
    }
  };

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    const updated: SystemSettings = {
      whatsapp: { ...settings.whatsapp, ...(newSettings.whatsapp || {}) },
      social: { ...settings.social, ...(newSettings.social || {}) },
    };
    await persistSettings(updated);
  };

  const updateWhatsApp = async (whatsapp: Partial<WhatsAppConfig>) => {
    const updated: SystemSettings = {
      ...settings,
      whatsapp: { ...settings.whatsapp, ...whatsapp },
    };
    await persistSettings(updated);
  };

  const updateSocial = async (social: Partial<SocialLinks>) => {
    const updated: SystemSettings = {
      ...settings,
      social: { ...settings.social, ...social },
    };
    await persistSettings(updated);
  };

  const resetSettings = async () => {
    await persistSettings(DEFAULT_SETTINGS);
  };

  const getWhatsAppUrl = () => {
    const cleanNumber = cleanPhoneNumber(settings.whatsapp.phoneNumber);
    const text = encodeURIComponent(settings.whatsapp.defaultMessage || "");
    if (!cleanNumber) return "#";
    return `https://wa.me/${cleanNumber}${text ? `?text=${text}` : ""}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateWhatsApp,
        updateSocial,
        resetSettings,
        getWhatsAppUrl,
        cleanPhoneNumber,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
