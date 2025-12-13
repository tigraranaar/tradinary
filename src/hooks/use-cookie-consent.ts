"use client";
import { useSyncExternalStore, useCallback } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem("cookieConsent");
}

function getServerSnapshot() {
  return null;
}

export function useCookieConsent() {
  const consentValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const consent = consentValue !== null;

  const acceptCookies = useCallback(() => {
    localStorage.setItem("cookieConsent", "accepted");
    window.dispatchEvent(new Event("storage"));
  }, []);

  const declineCookies = useCallback(() => {
    localStorage.setItem("cookieConsent", "declined");
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { consent, acceptCookies, declineCookies };
}
