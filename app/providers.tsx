'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';

export function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        setLoading(true);
        setFadeOut(false);

        // This will run when the route has completed loading
        const timeoutId = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setLoading(false), 300); // Match this with your CSS transition time
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return <Loader fadeOut={fadeOut} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationEvents />
            {children}
        </>
    );
}
