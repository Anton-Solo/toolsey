"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const BrandsSlider = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={10}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
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