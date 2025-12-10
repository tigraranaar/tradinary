'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                    }
                ]);

            if (error) {
                throw error;
            }

            setSubmitStatus({ 
                type: 'success', 
                message: 'Thank you for your message! We will get back to you soon.' 
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: 'Something went wrong. Please try again later.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className='px-4 md:px-16 lg:px-24 min-h-screen'>
                <div className='max-w-6xl mx-auto py-20'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-center mb-16'
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold mb-4'>
                            Get in Touch
                        </h1>
                        <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
                            Have a question or want to work together? We&apos;d love to hear from you.
                        </p>
                    </motion.div>

                    <div className='flex justify-center'>
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='w-full max-w-2xl'
                        >
                            <form onSubmit={handleSubmit} className='glass p-8 rounded-lg space-y-6'>
                                <div>
                                    <label htmlFor='name' className='block text-sm font-medium mb-2'>
                                        Name
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition'
                                        placeholder='Your name'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='email' className='block text-sm font-medium mb-2'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition'
                                        placeholder='your.email@example.com'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='subject' className='block text-sm font-medium mb-2'>
                                        Subject
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition'
                                        placeholder='What is this about?'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='message' className='block text-sm font-medium mb-2'>
                                        Message
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition resize-none'
                                        placeholder='Your message...'
                                    />
                                </div>

                                {submitStatus.type && (
                                    <div
                                        className={`p-4 rounded-lg ${
                                            submitStatus.type === 'success'
                                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                        }`}
                                    >
                                        {submitStatus.message}
                                    </div>
                                )}

                                <motion.button
                                    type='submit'
                                    disabled={isLoading}
                                    className='btn glass w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed'
                                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                                >
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>
    );
}
