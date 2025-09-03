import { SearchIcon } from "../icons/blog/SearchIcon"
import { Select } from "../Select"

export const Filters = () => {
    return (
        <div className="flex lg:flex-nowrap flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-3 bg-standart-white input sm:max-w-[416px] w-full relative">
                <SearchIcon />
                <input 
                    type="text" 
                    placeholder="Search articles, topics, or keywords" 
                    className="w-full h-full outline-0" 
                />
            </div>
            <div className="flex lg:flex-nowrap flex-wrap items-center flex-col sm:flex-row gap-8 sm:w-max w-full">
                <Select
                    options={[{value: 'all', label: 'All categories'}, {value: 'category-1', label: 'Category 1'}, {value: 'category-2', label: 'Category 2'}, {value: 'category-3', label: 'Category 3'}]}
                    placeholder="All categories"
                    inputClassName="sm:w-[304px] w-full"
                    dropdownClassName="bg-standart-white"
                />
                <Select
                    options={[{value: 'most-popular', label: 'Most popular'}, {value: 'most-recent', label: 'Most recent'}]}
                    placeholder="Most popular"
                    inputClassName="sm:w-[304px] w-full"
                    dropdownClassName="bg-standart-white"
                />
            </div>
        </div>
    )
}