'use client';

import { useEffect, useState } from "react";
import { ChatIcon } from "@/components/icons/support/ChatIcon";

interface ZohoDeskAsap {
    invoke: (action: string) => void;
    [key: string]: unknown;
}

declare global {
    interface Window {
        ZohoDeskAsap?: ZohoDeskAsap;
    }
}

export function ZohoDeskChat() {
    const [isZohoReady, setIsZohoReady] = useState(false);

    useEffect(() => {
        if (window.ZohoDeskAsap && typeof window.ZohoDeskAsap.invoke === 'function') {
            setIsZohoReady(true);
            return;
        }

        const checkInterval = setInterval(() => {
            if (window.ZohoDeskAsap && typeof window.ZohoDeskAsap.invoke === 'function') {
                setIsZohoReady(true);
                clearInterval(checkInterval);
            }
        }, 100);

        const timeout = setTimeout(() => {
            clearInterval(checkInterval);
            if (!isZohoReady) {
                console.warn('Zoho Desk failed to load within 15 seconds');
            }
        }, 15000);

        return () => {
            clearInterval(checkInterval);
            clearTimeout(timeout);
        };
    }, [isZohoReady]);

    const handleChatClick = () => {
        if (window.ZohoDeskAsap && typeof window.ZohoDeskAsap.invoke === 'function') {
            try {
                window.ZohoDeskAsap.invoke('open');
            } catch (error) {
                console.error('Error opening Zoho Desk chat:', error);
                const launcher = document.querySelector('[id*="asap-web-launcherbox"], [id*="zoho"]');
                if (launcher) {
                    (launcher as HTMLElement).click();
                }
            }
        } else {
            console.warn('Zoho Desk is not loaded yet');
        }
    };

    return (
        <div className="p-[40px] rounded-4xl bg-standart-white max-w-[640px] w-full">
            <div className="flex justify-center mb-6">
                <ChatIcon />
            </div>
            <h3 className="p-body-24 font-bold mb-4 text-foreground max-w-[210px] mx-auto text-center">
                Chat with our Well Trained AI Expert
            </h3>
            <p className="p-body-16 text-accent mb-6 text-center">Available 24/7</p>
            <div className="flex justify-center">
                <button className="btn btn-primary" onClick={handleChatClick}>Chat with us</button>
            </div>
        </div>
    );
}

