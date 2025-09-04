'use client';

import { SearchIcon } from "../icons/blog/SearchIcon"
import { Select } from "../Select"
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface FiltersProps {
    availableCategories?: string[];
}

export const Filters = ({ availableCategories = [] }: FiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    // Get current filter values from URL
    const currentCategory = searchParams.get('category') || '';
    const currentSort = searchParams.get('sort') || 'most-recent';

    // Create category options
    const categoryOptions = [
        { value: '', label: 'All categories' },
        ...availableCategories.map(category => ({
            value: category,
            label: category
        }))
    ];

    const sortOptions = [
        { value: 'most-recent', label: 'Most recent' },
        { value: 'most-popular', label: 'Most popular' }
    ];

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (value && value !== '') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        // Reset to first page when filters change
        params.delete('page');
        
        router.push(`/blog?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters('search', searchTerm);
    };

    return (
        <div className="flex lg:flex-nowrap flex-wrap items-center justify-between gap-8">
            <form onSubmit={handleSearch} className="flex items-center gap-3 bg-standart-white input sm:max-w-[416px] w-full relative">
                <SearchIcon />
                <input 
                    type="text" 
                    placeholder="Search articles, topics, or keywords" 
                    className="w-full h-full outline-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <div className="flex lg:flex-nowrap flex-wrap items-center flex-col sm:flex-row gap-8 sm:w-max w-full">
                <Select
                    options={categoryOptions}
                    placeholder="All categories"
                    inputClassName="sm:w-[304px] w-full"
                    dropdownClassName="bg-standart-white"
                    value={currentCategory}
                    onChange={(value) => updateFilters('category', value)}
                />
                <Select
                    options={sortOptions}
                    placeholder="Most recent"
                    inputClassName="sm:w-[304px] w-full"
                    dropdownClassName="bg-standart-white"
                    value={currentSort}
                    onChange={(value) => updateFilters('sort', value)}
                />
            </div>
        </div>
    )
}