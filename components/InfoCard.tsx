import Image from "next/image"
import Link from "next/link";

interface InfoCardProps {
    isImage?: boolean;
    title: string;
    text: string;
    btnText: string;
    extraTxt?: string;
    btnHref: string;
}

export const InfoCard = ({isImage = false, title, text, btnText, btnHref, extraTxt }: InfoCardProps) => {
    return (
        <div className="flex relative flex-col items-center justify-center linear-card w-full md:h-[580px] lg:h-[416px] md:px-0 px-4 py-4 rounded-[48px]">
            <Image 
                src='/icons/big-circle.svg' 
                alt='Decorative circle background' 
                width={400} 
                height={400} 
                className="absolute h-full w-full top-1/2 left-1/2 -translate-1/2 pointer-events-none select-none" 
                loading="lazy"
                priority={false}
            />
            <Image 
                src='/icons/medium-circle.svg' 
                alt='Decorative medium circle background' 
                width={300} 
                height={300} 
                className="absolute h-full w-full  top-1/2 left-1/2 -translate-1/2 pointer-events-none select-none" 
                loading="lazy"
                priority={false}
            />
            <Image 
                src='/icons/small-circle.svg' 
                alt='Decorative small circle background' 
                width={200} 
                height={200} 
                className="absolute h-full w-full top-1/2 left-1/2 -translate-1/2 pointer-events-none select-none" 
                loading="lazy"
                priority={false}
            />
            <h2 className="h2 text-standart-white max-w-[720px] text-center mx-auto mb-4">
                {title}
            </h2>
            <p className="p-body-20 !text-standart-white max-w-[600] mx-auto text-center">
                {text}
            </p>
            {btnHref.includes('http') ? (
                <a 
                    href={btnHref} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-white my-6">{btnText}
                </a>
            ) : (
                <Link href={btnHref} className="btn btn-white my-6">{btnText}</Link>
            )}
            <p className="label text-standart-white max-w-[432px] text-center mx-auto">{extraTxt}</p>
            {isImage &&
                <Image
                    src="/images/girl2.png"
                    alt="Professional woman representing Toolsey users"
                    width={285}
                    height={414}
                    className="lg:block hidden absolute max-w-[285px] right-12 bottom-0"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 1024px) 0px, 285px"
                />
            }
        </div>
    )
}