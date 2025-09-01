'use client';

import { useState, useRef } from 'react';
import { ArrowIcon } from "@/components/icons/support/ArrowIcon";

interface FAQItemProps {
    question: string;
    answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const answerParagraphs = answer.split('\n\n');

    return (
        <div className="bg-standart-white rounded-lg p-6">
            <p 
                className="flex items-center justify-between gap-4 p-body-20 font-bold cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <ArrowIcon className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </p>
            <div 
                ref={contentRef}
                className={`transition-all duration-300 overflow-hidden`}
                style={{ 
                    maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0',
                }}
            >
                {answerParagraphs.map((paragraph, index) => (
                    <p key={index} className={index !== 0 ? 'mt-4' : 'mt-6'}>
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
};