import { useEffect, useLayoutEffect } from 'react';

/**
 * useIsomorphicLayoutEffect hook
 *
 * This hook provides a safe way to use useLayoutEffect that works in both
 * client-side and server-side environments. It uses useLayoutEffect on the
 * client and useEffect on the server to avoid hydration mismatches.
 *
 * Based on research findings for fixing "Cannot read properties of undefined (reading 'useLayoutEffect')"
 * errors in Laravel + Inertia.js + React applications.
 */
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
