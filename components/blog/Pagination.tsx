'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PaginationProps {
    meta: PaginationMeta;
    baseUrl?: string;
    className?: string;
}

export const Pagination = ({ meta, baseUrl = '/blog', className = '' }: PaginationProps) => {
    const searchParams = useSearchParams();
    const { current_page, last_page } = meta;

    if (last_page <= 1) return null;

    const buildUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `${baseUrl}?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        range.push(1);

        for (let i = Math.max(2, current_page - delta); i <= Math.min(last_page - 1, current_page + delta); i++) {
            range.push(i);
        }

        if (last_page > 1) {
            range.push(last_page);
        }

        const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

        let prev = 0;
        for (const page of uniqueRange) {
            if (page - prev > 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(page);
            prev = page;
        }

        return rangeWithDots;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={`flex justify-center items-center gap-2 mt-12 ${className}`}>
            {current_page > 1 ? (
                <Link
                    href={buildUrl(current_page - 1)}
                    className="px-3 py-2 sm:px-4 rounded-lg bg-white text-primary hover:bg-gray-100 border border-gray-200 transition-colors duration-200 flex items-center gap-1"
                    aria-label="Previous page"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                </Link>
            ) : (
                <div className="px-3 py-2 sm:px-4 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                </div>
            )}

            <div className="hidden sm:flex items-center gap-2">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="px-2 py-2 text-gray-500">
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const isActive = pageNumber === current_page;

                    return (
                        <Link
                            key={pageNumber}
                            href={buildUrl(pageNumber)}
                            className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                                isActive
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-primary hover:bg-gray-100 border-gray-200'
                            }`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNumber}
                        </Link>
                    );
                })}
            </div>

            <div className="sm:hidden flex items-center gap-2">
                <span className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg border">
                    Page {current_page} of {last_page}
                </span>
            </div>

            {current_page < last_page ? (
                <Link
                    href={buildUrl(current_page + 1)}
                    className="px-3 py-2 sm:px-4 rounded-lg bg-white text-primary hover:bg-gray-100 border border-gray-200 transition-colors duration-200 flex items-center gap-1"
                    aria-label="Next page"
                >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            ) : (
                <div className="px-3 py-2 sm:px-4 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed flex items-center gap-1">
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export const PaginationInfo = ({ meta, className = '' }: { meta: PaginationMeta; className?: string }) => {
    const { current_page, last_page, per_page, total } = meta;
    const from = (current_page - 1) * per_page + 1;
    const to = Math.min(current_page * per_page, total);

    return (
        <div className={`text-sm text-gray-600 text-center mt-4 ${className}`}>
            Showing {from} to {to} of {total} results (Page {current_page} of {last_page})
        </div>
    );
};
