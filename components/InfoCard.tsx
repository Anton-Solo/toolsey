import Image from "next/image"

interface InfoCardProps {
    isImage?: boolean;
    title: string;
    text: string;
    btnText: string;
    extraTxt?: string;
}

export const InfoCard = ({isImage = false, title, text, btnText, extraTxt }: InfoCardProps) => {
    return (
        <div className="flex relative flex-col items-center justify-center linear-card w-full h-[580px] rounded-[48px]">
            <img src='/icons/big-circle.svg' alt='circle' className="absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none select-none"/>
            <img src='/icons/medium-circle.svg' alt='circle' className="absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none select-none"/>
            <img src='/icons/small-circle.svg' alt='circle' className="absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none select-none"/>
            <h2 className="h2 text-standart-white max-w-[720px] text-center mx-auto mb-4">
                {title}
            </h2>
            <p className="p-body-20 !text-standart-white max-w-[600] mx-auto text-center">
                {text}
            </p>
            <button className="btn btn-white my-6">{btnText}</button>
            <p className="label text-standart-white max-w-[432px] text-center mx-auto">{extraTxt}</p>
            {isImage &&
                <Image
                    src="/images/girl2.png"
                    alt="girl"
                    width={285}
                    height={414}
                    className="lg:block hidden absolute max-w-[285px] right-12 bottom-0"
                />
            }
        </div>
    )
}