import { z } from 'zod';

export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be no more than 100 characters')
    .trim(),
  
  companyName: z
    .string()
    .max(100, 'Company name must be no more than 100 characters')
    .optional()
    .or(z.literal('')),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim(),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((val) => {
      // Allow partial input during typing (e.g., "123", "123-", "123-4", etc.)
      const digits = val.replace(/\D/g, '');
      return digits.length <= 10;
    }, 'Phone number must be no more than 10 digits')
    .refine((val) => {
      // Only validate complete format when we have 10 digits
      const digits = val.replace(/\D/g, '');
      if (digits.length === 10) {
        return /^\d{3}-\d{3}-\d{4}$/.test(val);
      }
      return true; // Allow partial input
    }, 'Please enter a valid phone number in format 333-444-5555'),
  
  comment: z
    .string()
    .optional()
    .or(z.literal(''))
});

export type FormData = z.infer<typeof formSchema>;
