'use client';
import { useState, useCallback } from 'react';

export function useCookieConsent() {
    const [consent, setConsent] = useState<boolean | null>(() => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('cookieConsent') !== null;
    });

    const acceptCookies = useCallback(() => {
        localStorage.setItem('cookieConsent', 'accepted');
        setConsent(true);
    }, []);

    const declineCookies = useCallback(() => {
        localStorage.setItem('cookieConsent', 'declined');
        setConsent(true);
    }, []);

    return { consent, acceptCookies, declineCookies };
}
