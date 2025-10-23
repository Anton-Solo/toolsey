'use client';

import { useState } from 'react';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { subscribeToNewsletter, SubscribeNewsletterData } from '@/lib/api/blog';
import { toast } from 'sonner';

export const WeeklyNews = ({ isPost = false }: { isPost?: boolean }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { executeRecaptcha, resetRecaptcha } = useRecaptcha('recaptcha-newsletter');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error('Please enter your email address');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise<void>((resolve, reject) => {
                executeRecaptcha(async (token: string) => {
                    try {
                        const data: SubscribeNewsletterData = {
                            email: email.trim(),
                            'g-recaptcha-response': token,
                        };

                        const response = await subscribeToNewsletter(data);

                        if (response.status) {
                            toast.success(response.message || 'Successfully subscribed to newsletter!');
                            setEmail('');
                        } else {
                            toast.error(response.message || 'Failed to subscribe. Please try again.');
                        }
                        resetRecaptcha();
                        resolve();
                    } catch (error) {
                        console.error('Newsletter subscription error:', error);
                        const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
                        toast.error(errorMessage);
                        resetRecaptcha();
                        reject(error);
                    }
                });
            });
        } catch (error) {
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`flex justify-between items-center gap-6 linear-card rounded-4xl px-8 py-16 text-standart-white ${isPost ? 'flex-wrap' : 'sm:flex-nowrap flex-wrap'}`}>
            <div className={`${isPost ? 'w-full' : 'max-w-[541px]'}`}>
                <h2 className="h2 !mb-4 !text-standart-white">
                    Weekly newsletter
                </h2>
                <p className="p-body-20 !mb-0 !text-standart-white">
                    No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.
                </p>
            </div>
            <form 
                onSubmit={handleSubmit}
                className={`flex gap-4 items-end max-sm:w-full ${isPost ? 'flex-row max-sm:flex-wrap justify-end' : 'flex-col'}`}
            >
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input bg-standart-white sm:w-[416px] w-full text-accent-foreground" 
                    disabled={isSubmitting}
                    required
                />
                <button 
                    type="submit"
                    className={`btn btn-white !w-max ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : 'Subscribe'}
                </button>
            </form>
            
            <div id="recaptcha-newsletter" style={{ display: 'none' }}></div>
        </div>
    )
}