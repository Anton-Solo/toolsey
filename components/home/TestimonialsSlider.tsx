"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ArrowSlider } from '../icons/home-form/ArrowSlider';

export const TestimonialsSlider = () => {
    return (
        <div className="relative w-full overflow-hidden pb-[100px] px-4 sm:px-0">
            <button aria-label="Previous" className="swiper-button-prev !left-[20%] sm:!left-[35%] md:!left-[40%] lg:!left-[45%] !bottom-0 !top-auto after:!content-[''] !w-[48px] !h-[48px] rounded-[33px] bg-primary flex items-center justify-center hover:scale-105 transition-all duration-300">
                <ArrowSlider className='!w-4'/>
            </button>
            <button aria-label="Next" className="swiper-button-next !right-[20%] sm:!right-[35%] md:!right-[40%] lg:!right-[45%] !left-auto !bottom-0 !top-auto after:!content-[''] !w-[48px] !h-[48px] rounded-[33px] bg-primary flex items-center justify-center hover:scale-105 transition-all duration-300">
                <ArrowSlider className='rotate-180 !w-4'/>
            </button>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                spaceBetween={15}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 32,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 32,
                    },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {Array.from({ length: 10 }, (_, index) => (
                    <SwiperSlide key={index} className="!w-auto">
                        <div className='w-full sm:max-w-[416px] max-w-[304px] p-6 md:p-8 rounded-3xl bg-standart-white border border-card-bg'>
                            <p className='p-body-20 !text-accent-dark mb-10'>
                                Before Toolsey, we were constantly losing leads due to slow responses and messy spreadsheets. 
                                Now, every new request gets an automatic reply within minutes, and the whole team can track jobs easily. Honestly, 
                                it&apos;s like having an extra person working for us 24/7.
                            </p>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 rounded-full'>
                                    <Image
                                        src="/images/test-avatar.png"
                                        alt="avatar"
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className='p-body-16 text-foreground font-bold'>Szymon Opyd</p>
                                    <p className='p-body-16 text-accent-dark font-medium'>Handyman</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>   
        </div>
    )
}