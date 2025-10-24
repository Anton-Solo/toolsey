"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ArrowSlider } from '../icons/home-form/ArrowSlider';
import { TESTIMONIALS } from '../../constans/testimonials';

export const TestimonialsSlider = () => {
    return (
        <div className="relative w-full overflow-hidden pb-[100px] px-4 sm:px-0">
            <button aria-label="Previous" className="swiper-button-prev !left-[20%] sm:!left-[35%] md:!left-[40%] lg:!left-[45%] !bottom-[10px] !top-auto after:!content-[''] !w-[48px] !h-[48px] rounded-[33px] bg-primary flex items-center justify-center hover:scale-105 transition-all duration-300">
                <ArrowSlider className='!w-4'/>
            </button>
            <button aria-label="Next" className="swiper-button-next !right-[20%] sm:!right-[35%] md:!right-[40%] lg:!right-[45%] !left-auto !bottom-[10px] !top-auto after:!content-[''] !w-[48px] !h-[48px] rounded-[33px] bg-primary flex items-center justify-center hover:scale-105 transition-all duration-300">
                <ArrowSlider className='rotate-180 !w-4'/>
            </button>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                spaceBetween={15}
                slidesPerView={1.2}
                centeredSlides={false}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                        centeredSlides: false,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                        centeredSlides: true,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 32,
                        centeredSlides: true,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 32,
                        centeredSlides: true,
                    },
                }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                {TESTIMONIALS.map((testimonial) => (
                    <SwiperSlide key={testimonial.id} className="!w-auto">
                        <div className='md:w-[416px] w-[302px] h-[416px] p-6 md:p-8 rounded-3xl bg-standart-white border border-card-bg flex flex-col'>
                            <div className='mb-6 flex'>
                                <Image
                                    src={testimonial.company_logo}
                                    alt={`${testimonial.company} logo`}
                                    width={testimonial.width}
                                    height={64}
                                    className="object-contain h-[64px]"
                                />
                            </div>
                            
                            <p className='p-body-24 font-bold mb-10 flex-1'>
                                &ldquo;{testimonial.text}&rdquo;
                            </p>
                            
                            <div className='flex items-center gap-4'>
                                {testimonial.image && (
                                    <div className='w-12 h-12 rounded-full'>
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className='p-body-16 text-foreground font-bold'>{testimonial.company}</p>
                                    <p className='p-body-16 text-accent-dark font-medium'>{testimonial.name} | {testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>   
        </div>
    )
}