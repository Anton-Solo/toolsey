'use client';

import { useState } from 'react';
import { formSchema, type FormData } from '@/lib/validation/schemas';
import { ZodError } from 'zod';

interface FormErrors {
    fullName?: string;
    companyName?: string;
    email?: string;
    phone?: string;
    comment?: string;
}

interface UseFormStatusReturn {
    formData: FormData;
    errors: FormErrors;
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
    companyName: '',
    email: '',
    phone: '',
    comment: ''
};

const initialErrors: FormErrors = {};

export const useFormStatus = (): UseFormStatusReturn => {
    const [formData, setFormDataState] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (field: keyof FormData, value: string): string | undefined => {
        try {
            const fieldSchema = formSchema.pick({ [field]: true });
            fieldSchema.parse({ [field]: value });
            return undefined;
        } catch (error) {
            if (error instanceof ZodError) {
                return error.issues[0]?.message;
            }
            return undefined;
        }
    };

    const validateForm = (): boolean => {
        try {
            formSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors: FormErrors = {};
                error.issues.forEach((err) => {
                    const field = err.path[0] as keyof FormData;
                    if (field) {
                        newErrors[field] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
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
        
        // Validate field in real-time, but skip phone validation during typing
        if (field === 'phone') {
            // For phone, only validate if it's a complete number (10 digits)
            const digits = value.replace(/\D/g, '');
            if (digits.length === 10) {
                const error = validateField(field, value);
                setErrors(prev => {
                    const newErrors = { ...prev };
                    if (error) {
                        newErrors[field] = error;
                    } else {
                        delete newErrors[field];
                    }
                    return newErrors;
                });
            } else {
                // Clear phone error if not complete
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[field];
                    return newErrors;
                });
            }
        } else {
            // For other fields, validate immediately
            const error = validateField(field, value);
            setErrors(prev => {
                const newErrors = { ...prev };
                if (error) {
                    newErrors[field] = error;
                } else {
                    delete newErrors[field];
                }
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
            await onSubmit(formData);
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
