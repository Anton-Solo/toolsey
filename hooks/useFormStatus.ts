'use client';

import { useState, useTransition } from 'react';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
}

interface UseFormStatusReturn {
    formData: FormData;
    errors: FormErrors;
    isPending: boolean;
    isSubmitting: boolean;
    isValid: boolean;
    setFormData: (data: Partial<FormData>) => void;
    setFieldValue: (field: keyof FormData, value: string) => void;
    validateForm: () => boolean;
    clearErrors: () => void;
    resetForm: () => void;
    submitForm: (onSubmit: (data: FormData) => Promise<void> | void) => Promise<void>;
}

const initialFormData: FormData = {
    fullName: '',
    email: '',
    phone: ''
};

const initialErrors: FormErrors = {};

export const useFormStatus = (): UseFormStatusReturn => {
    const [formData, setFormDataState] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const [isPending, startTransition] = useTransition();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 10;
    };

    const validateField = (field: keyof FormData, value: string): string | undefined => {
        switch (field) {
            case 'fullName':
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 2) return 'Full name must be at least 2 characters';
                return undefined;
            
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!validateEmail(value)) return 'Please enter a valid email address';
                return undefined;
            
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!validatePhone(value)) return 'Please enter a valid phone number';
                return undefined;
            
            default:
                return undefined;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            const field = key as keyof FormData;
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const setFormData = (data: Partial<FormData>) => {
        setFormDataState(prev => ({ ...prev, ...data }));
        const newErrors = { ...errors };
        Object.keys(data).forEach(key => {
            delete newErrors[key as keyof FormErrors];
        });
        setErrors(newErrors);
    };

    const setFieldValue = (field: keyof FormData, value: string) => {
        setFormDataState(prev => ({ ...prev, [field]: value }));
        
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const clearErrors = () => {
        setErrors(initialErrors);
    };

    const resetForm = () => {
        setFormDataState(initialFormData);
        setErrors(initialErrors);
        setIsSubmitting(false);
    };

    const submitForm = async (onSubmit: (data: FormData) => Promise<void> | void) => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            await startTransition(async () => {
                await onSubmit(formData);
            });
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isValid = Object.keys(errors).length === 0 && 
                   formData.fullName.trim() !== '' && 
                   formData.email.trim() !== '' && 
                   formData.phone.trim() !== '';

    return {
        formData,
        errors,
        isPending,
        isSubmitting,
        isValid,
        setFormData,
        setFieldValue,
        validateForm,
        clearErrors,
        resetForm,
        submitForm
    };
};
