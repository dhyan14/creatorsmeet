'use client';

import { useState, useEffect, useCallback } from 'react';

interface UsernameCheckResult {
    checking: boolean;
    available: boolean | null;
    message: string;
}

export function useUsernameAvailability(username: string, debounceMs: number = 300) {
    const [result, setResult] = useState<UsernameCheckResult>({
        checking: false,
        available: null,
        message: ''
    });

    const checkUsername = useCallback(async (usernameToCheck: string) => {
        if (!usernameToCheck || usernameToCheck.length < 3) {
            setResult({
                checking: false,
                available: null,
                message: ''
            });
            return;
        }

        setResult(prev => ({ ...prev, checking: true }));

        try {
            const response = await fetch(
                `/api/auth/check-username?username=${encodeURIComponent(usernameToCheck)}`
            );
            const data = await response.json();

            setResult({
                checking: false,
                available: data.available,
                message: data.message || ''
            });
        } catch (error) {
            console.error('Username check failed:', error);
            setResult({
                checking: false,
                available: null,
                message: 'Failed to check availability'
            });
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            checkUsername(username);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [username, debounceMs, checkUsername]);

    return result;
}
