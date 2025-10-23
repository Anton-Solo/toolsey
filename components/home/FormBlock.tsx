'use client';

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";
import { FormElipse1 } from "../icons/home-form/FormElipse1";
import { FormElipse2 } from "../icons/home-form/FormElipse2";
import { FormElipse3 } from "../icons/home-form/FormElipse3";
import { FormElipse4 } from "../icons/home-form/FormElipse4";
import { FormElipse5 } from "../icons/home-form/FormElipse5";
import { FormElipse6 } from "../icons/home-form/FormElipse6";
import { useFormStatus } from "@/hooks/useFormStatus";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { submitContactForm, ContactFormData } from "@/lib/api/contact";
import { toast } from "sonner";

export const FormBlock = () => {
    const {
        formData,
        errors,
        isSubmitting,
        setFieldValue,
        submitForm,
        resetForm
    } = useFormStatus();

    const { executeRecaptcha, resetRecaptcha } = useRecaptcha('recaptcha-formblock');

    const handleSubmit = async (data: { fullName: string; companyName: string; email: string; phone: string; comment: string }) => {
        return new Promise<void>((resolve, reject) => {
            executeRecaptcha(async (token: string) => {
                try {
                    const contactData: ContactFormData = {
                        full_name: data.fullName,
                        email: data.email,
                        phone_number: data.phone,
                        'g-recaptcha-response': token,
                    };

                    const response = await submitContactForm(contactData);

                    if (response.status) {
                        toast.success(response.message || 'Your request has been sent successfully! We will contact you soon.');
                        resetForm();
                        resetRecaptcha();
                        resolve();
                    } else {
                        toast.error(response.message || 'Failed to send request. Please try again.');
                        resetRecaptcha();
                        reject(new Error(response.message || 'Failed to send request'));
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
                    toast.error(errorMessage);
                    resetRecaptcha();
                    reject(error);
                }
            });
        });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm(handleSubmit);
    };

    return (
        <div className="relative flex items-center">
            <div className="relative -mr-[123px] md:block hidden">
                <FormElipse1 className="-mb-[110px] ml-[70px] md:block hidden"/>
                <FormElipse2 className="md:block hidden"/>
                <FormElipse3 className="-mt-[90px] ml-[115px] md:block hidden"/>
                <Image 
                    alt="girl image"
                    priority={true}
                    src="/images/girl.png"
                    width={365}
                    height={281}
                    className="w-[281px] absolute top-[16%] left-[10px] md:block hidden"
                />
            </div>
            <form 
                onSubmit={onSubmit}
                className="relative z-30 bg-standart-white p-8 rounded-4xl shadow-form flex flex-col gap-6 text-accent max-w-[416px] w-full"
            >
                <label className="block w-full">
                    <input 
                        type='text'
                        placeholder="Full name *"
                        className={`input w-full ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={formData.fullName}
                        aria-label="Full name"
                        onChange={(e) => setFieldValue('fullName', e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                </label>
                <label className="block w-full">
                    <input 
                        type='email'
                        placeholder="Email *"
                        className={`input w-full ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        aria-label="Email"
                        value={formData.email}
                        onChange={(e) => setFieldValue('email', e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </label>
                <div className="block w-full">
                    <PhoneInput
                        defaultCountry="us"
                        value={formData.phone}
                        onChange={(phone) => setFieldValue('phone', phone)}
                        aria-label="Phone"
                        disabled={isSubmitting}
                        className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>
                <p>It only takes 15 minutes to learn why 10,000+ pros use Toolsey to generate more sales. </p>
                
                <button 
                    type="submit"
                    className={`btn btn-primary h-14 text-[20px] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Discovery Call'}
                </button>

                <div id="recaptcha-formblock"></div>
            </form>
            <div className="relative -ml-[300px] md:block hidden">
                <Image 
                    alt="man image"
                    src="/images/man.png"
                    priority={true}
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