'use client';

import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";
import { FormElipse1 } from "../icons/home-form/FormElipse1";
import { FormElipse2 } from "../icons/home-form/FormElipse2";
import { FormElipse3 } from "../icons/home-form/FormElipse3";
import { FormElipse4 } from "../icons/home-form/FormElipse4";
import { FormElipse5 } from "../icons/home-form/FormElipse5";
import { FormElipse6 } from "../icons/home-form/FormElipse6";
import { useCalendly } from "@/hooks/useCalendly";

// Calendly configuration
const CALENDLY_URL = "https://calendly.com/d/cwvy-bn4-8wr/toolsey-discovery-call";

export const FormBlock = () => {
    const [phone, setPhone] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const { openPopup, openDirectLink } = useCalendly();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare Calendly options with form data
        const calendlyOptions = {
            url: CALENDLY_URL,
            prefill: {
                name: fullName,
                email: email,
                phone: phone
            },
            utm: {
                utmSource: 'toolsey_website',
                utmMedium: 'form_submission',
                utmCampaign: 'discovery_call',
                utmContent: 'homepage_form'
            }
        };

        // Option 1: Direct redirect to Calendly (recommended for better UX)
        openDirectLink(calendlyOptions);
        
        // Option 2: Open popup widget (uncomment if you prefer this approach)
        // openPopup(calendlyOptions);
    };

    const handlePopupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const calendlyOptions = {
            url: CALENDLY_URL,
            prefill: {
                name: fullName,
                email: email,
                phone: phone
            },
            utm: {
                utmSource: 'toolsey_website',
                utmMedium: 'popup_form',
                utmCampaign: 'discovery_call',
                utmContent: 'homepage_form'
            }
        };

        openPopup(calendlyOptions);
    };


    return (
        <div className="relative flex items-center">
            <div className="relative -mr-[123px] md:block hidden">
                <FormElipse1 className="-mb-[110px] ml-[70px] md:block hidden"/>
                <FormElipse2 className="md:block hidden"/>
                <FormElipse3 className="-mt-[90px] ml-[115px] md:block hidden"/>
                <Image 
                    alt="girl image"
                    src="/images/girl.png"
                    width={365}
                    height={281}
                    className="w-[281px] absolute top-[16%] left-[10px] md:block hidden"
                />
            </div>
            <form 
                onSubmit={handleSubmit}
                className="relative z-30 bg-standart-white p-8 rounded-4xl shadow-form flex flex-col gap-6 text-accent max-w-[416px] w-full"
            >
                <input 
                    type='text'
                    placeholder="Full name *"
                    className="input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input 
                    type='email'
                    placeholder="Email *"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <PhoneInput
                    defaultCountry="us"
                    value={phone}
                    onChange={setPhone}
                />
                <p>It only takes 15 minutes to learn why 30,000 pros use Toolsey to generate more sales. </p>
                
                {/* Primary button - Direct redirect */}
                <button 
                    type="submit"
                    className="btn btn-primary h-14 text-[20px]"
                >
                    Discovery Call
                </button>
                
                {/* Alternative button - Popup widget (uncomment if needed) */}
                {/* 
                <button 
                    type="button"
                    onClick={handlePopupSubmit}
                    className="btn btn-outline h-14 text-[20px] mt-2"
                >
                    Open Calendar Popup
                </button>
                */}
            </form>
            <div className="relative -ml-[300px] md:block hidden">
                <Image 
                    alt="man image"
                    src="/images/man.png"
                    width={182}
                    height={213}
                    className="absolute top-[27%] right-0 w-[182px] md:block hidden"
                />
                <FormElipse4 className="-mb-[110px] ml-[110px] md:block hidden"/>
                <FormElipse5 className="md:block hidden"/>
                <FormElipse6 className="-mt-[90px] ml-[160px] md:block hidden"/>
            </div>
        </div>
    )
}