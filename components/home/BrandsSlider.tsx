"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const BrandsSlider = () => {
    return (
        <Swiper
            // spaceBetween={50}
            slidesPerView={2}
            centeredSlides={true}
            breakpoints={{
                768: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                    centeredSlides: false
                },
                1024: {
                    slidesPerView: 10,
                    spaceBetween: 50,
                    centeredSlides: false
                }
            }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {Array.from({ length: 20 }, (_, index) => (
                <SwiperSlide key={index}>
                    <div className='uppercase'>
                        Logo
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}