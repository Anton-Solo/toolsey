'use client';

import { useEffect, useState } from "react";

interface ZohoDeskAsap {
    invoke: (action: string) => void;
    [key: string]: unknown;
}

declare global {
    interface Window {
        ZohoDeskAsap?: ZohoDeskAsap;
        ZohoDeskAsapReady?: (callback?: () => void) => void;
        ZohoDeskAsapReadyStatus?: boolean;
        ZohoDeskAsap__asyncalls?: Array<() => void> | null;
    }
}

export function ZohoDeskWidget() {
    const [isZohoReady, setIsZohoReady] = useState(false);

    useEffect(() => {
        if (window.ZohoDeskAsap && typeof window.ZohoDeskAsap.invoke === 'function') {
            setIsZohoReady(true);
            return;
        }

        const existingScript = document.getElementById('zohodeskasapscript');
        if (!existingScript) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'zohodeskasapscript';
            script.defer = true;
            script.src = 'https://desk.zoho.com/portal/api/web/asapApp/1144382000000417001?orgId=888053208';
            
            const firstScript = document.getElementsByTagName('script')[0];
            if (firstScript && firstScript.parentNode) {
                firstScript.parentNode.insertBefore(script, firstScript);
            }
            
            window.ZohoDeskAsapReady = function(callback?: () => void) {
                const asyncCalls = window.ZohoDeskAsap__asyncalls = window.ZohoDeskAsap__asyncalls || [];
                if (window.ZohoDeskAsapReadyStatus) {
                    if (callback) asyncCalls.push(callback);
                    asyncCalls.forEach((cb) => cb && cb());
                    window.ZohoDeskAsap__asyncalls = null;
                } else if (callback) {
                    asyncCalls.push(callback);
                }
            };

            script.onload = () => {
                const checkZoho = setInterval(() => {
                    if (window.ZohoDeskAsap && typeof window.ZohoDeskAsap.invoke === 'function') {
                        setIsZohoReady(true);
                        clearInterval(checkZoho);
                    }
                }, 100);

                setTimeout(() => clearInterval(checkZoho), 10000);
            };
        }
    }, []);

    return null;
}

