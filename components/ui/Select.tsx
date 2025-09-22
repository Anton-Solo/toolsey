'use client';

import { useState, useRef, useEffect } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    inputClassName?: string;
    dropdownClassName?: string;
    optionClassName?: string;
    optionActiveClassName?: string;
    disabled?: boolean;
}

export const Select = ({
    options,
    value,
    onChange,
    placeholder = "Choose the option",
    inputClassName = "",
    dropdownClassName = "",
    optionClassName = "",
    optionActiveClassName = "",
    disabled = false
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === selectedValue);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setSelectedValue(value || "");
    }, [value]);

    const handleOptionClick = (optionValue: string) => {
        setSelectedValue(optionValue);
        setIsOpen(false);
        onChange?.(optionValue);
    };

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                setIsOpen(!isOpen);
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    const currentIndex = options.findIndex(opt => opt.value === selectedValue);
                    const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
                    setSelectedValue(options[nextIndex].value);
                    onChange?.(options[nextIndex].value);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    const currentIndex = options.findIndex(opt => opt.value === selectedValue);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
                    setSelectedValue(options[prevIndex].value);
                    onChange?.(options[prevIndex].value);
                }
                break;
        }
    };

    return (
        <div ref={selectRef} className="relative sm:w-max w-full">
            <div
                className={`input bg-standart-white flex items-center !pr-10 cursor-pointer ${inputClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleInputClick}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="select-dropdown"
            >
                <span className="block truncate">
                    {displayValue}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className={`w-3.5 h-[7px] transition-transform ${isOpen ? 'rotate-180' : ''}`} width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 7L0 0H14L7 7Z" fill="#15192D"/>
                    </svg>
                </span>
            </div>

            {/* Dropdown */}
            <div className={`absolute top-full left-0 right-0 z-10 ${isOpen ? 'block' : 'hidden'}`}>
                <div
                    className={`input flex flex-col gap-2 !h-max bg-standart-white w-full overflow-y-auto !p-4 max-h-60 ${dropdownClassName}`}
                    role="listbox"
                    id="select-dropdown"
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`cursor-pointer hover:text-primary ${optionClassName} ${
                                selectedValue === option.value ? optionActiveClassName : ''
                            }`}
                            onClick={() => handleOptionClick(option.value)}
                            role="option"
                            aria-selected={selectedValue === option.value}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};