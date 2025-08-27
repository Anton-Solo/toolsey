import type { IAdvantage } from "@/types/home.types"

export const AdvantageCard = ({ label, text, Icon }: IAdvantage) => {
    return (
        <div className="lg:block flex flex-col items-center max-w-[416px]">
            <Icon className="mb-3"/>
            <p className="p-body-24 font-bold mb-3">
                {label}
            </p>
            <p className="p-body-16 lg:text-left text-center">{text}</p>
        </div>
    )
}