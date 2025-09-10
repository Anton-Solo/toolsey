'use client';

import { SearchIcon } from "../icons/blog/SearchIcon"
import { Select } from "../Select"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FiltersProps {
    availableCategories?: {
        id: number;
        slug: string;
        summary: string | null;
        title: string;
    }[];
}

export const Filters = ({ availableCategories = [] }: FiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const currentCategory = searchParams.get('category') || '';
    const currentSort = searchParams.get('sort') || 'newest';

    const categoryOptions = [
        { value: '', label: 'All categories' },
        ...availableCategories.map(category => ({
            value: String(category.id),
            label: category.title
        }))
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'popular', label: 'Most popular' },
        { value: 'oldest', label: 'Oldest' },
    ];

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (value && value !== '') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        params.delete('page');
        
        router.push(`/blog?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters('searchText', searchTerm);
    };

    return (
        <div className="flex lg:flex-nowrap flex-wrap items-center justify-between gap-8">
            <form onSubmit={handleSearch} className="flex items-center gap-3 bg-standart-white input sm:max-w-[416px] w-full relative">
                <SearchIcon />
                <input 
                    type="text" 
                    aria-label="Search articles, topics, or keywords"
                    placeholder="Search articles, topics, or keywords" 
                    className="w-full h-full outline-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <div className="flex lg:flex-nowrap flex-wrap items-center flex-col sm:flex-row gap-8 sm:w-max w-full">
                <Select
                    options={categoryOptions}
                    aria-label="All categories"
                    placeholder="All categories"
                    inputClassName="sm:w-[304px] w-full"
                    dropdownClassName="bg-standart-white"
                    value={currentCategory}
                    onChange={(value) => updateFilters('category', value)}
                />
                <Select
                    options={sortOptions}
                    aria-label="Most recent"
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