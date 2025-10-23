'use client';

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormStatus } from "@/hooks/useFormStatus";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { submitContactForm, ContactFormData } from "@/lib/api/contact";
import { toast } from "sonner";

export const ContactForm = () => {
    const {
        formData,
        errors,
        isSubmitting,
        setFieldValue,
        submitForm,
        resetForm
    } = useFormStatus();

    const { executeRecaptcha, resetRecaptcha } = useRecaptcha('recaptcha-contact');

    const handleSubmit = async (data: { fullName: string; companyName: string; email: string; phone: string; comment: string }) => {
        return new Promise<void>((resolve, reject) => {
            executeRecaptcha(async (token: string) => {
                try {
                    const contactData: ContactFormData = {
                        full_name: data.fullName,
                        email: data.email,
                        phone_number: data.phone,
                        comments: data.comment || undefined,
                        company_name: data.companyName || undefined,
                        'g-recaptcha-response': token,
                    };

                    const response = await submitContactForm(contactData);

                    if (response.status) {
                        toast.success(response.message || 'Your message has been sent successfully!');
                        resetForm();
                        resetRecaptcha();
                        resolve();
                    } else {
                        toast.error(response.message || 'Failed to send message. Please try again.');
                        resetRecaptcha();
                        reject(new Error(response.message || 'Failed to send message'));
                    }
                } catch (error) {
                    console.error('Contact form error:', error);
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
        <form 
            onSubmit={onSubmit}
            className="relative z-30 bg-standart-white p-8 rounded-4xl shadow-form flex flex-col gap-6 text-accent w-full"
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
                    type='text'
                    placeholder="Company name"
                    className={`input w-full ${errors.companyName ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={formData.companyName}
                    aria-label="Company name"
                    onChange={(e) => setFieldValue('companyName', e.target.value)}
                    disabled={isSubmitting}
                />
                {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
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
            <label className="block w-full">
                <textarea 
                    placeholder="Your comment"
                    className={`input !py-2 w-full min-h-[128px] max-h-[128px] resize-y ${errors.comment ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={formData.comment}
                    aria-label="Your comment"
                    onChange={(e) => setFieldValue('comment', e.target.value)}
                    disabled={isSubmitting}
                />
                {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
                )}
            </label>

            <button 
                type="submit"
                className={`btn btn-primary h-14 text-[20px] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Processing...' : 'Contact us'}
            </button>

            <div id="recaptcha-contact"></div>
        </form>
    )
}