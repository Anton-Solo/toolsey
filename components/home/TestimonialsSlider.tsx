"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

export const TestimonialsSlider = () => {
    return (
        <div className="relative w-full overflow-visible">
            <Swiper
                spaceBetween={32}
                slidesPerView={4}
                centeredSlides={true}
                loop={true}
                className="!overflow-visible px-[50px]"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {Array.from({ length: 10 }, (_, index) => (
                    <SwiperSlide key={index} className="!w-auto">
                        <div className='w-[416px] p-8 rounded-3xl bg-standart-white border border-card-bg'>
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