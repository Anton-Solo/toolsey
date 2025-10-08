"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import Image from 'next/image';

export const BrandsSlider = () => {
    return (
        <Swiper
            // spaceBetween={50}
            modules={[Autoplay]}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            speed={3000}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
            breakpoints={{
                768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    centeredSlides: false
                },
                1024: {
                    slidesPerView: 8,
                    spaceBetween: 50,
                    centeredSlides: false
                },
                1300: {
                    slidesPerView: 10,
                    spaceBetween: 50,
                    centeredSlides: false
                }
            }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/VE.png"
                        alt="VE Roofing"
                        width={72}
                        height={72}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/ahronian.png"
                        alt="Ahronian Landscaping"
                        width={80}
                        height={72}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/better.png"
                        alt="Better Choice Roofing for GSTL"
                        width={109}
                        height={80}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/beardman.png"
                        alt="beardman"
                        width={100}
                        height={100}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/ad-lib.png"
                        alt="ad lib"
                        width={102}
                        height={50}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/berkshire.png"
                        alt="berkshire"
                        width={112}
                        height={30}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/bioPURE.png"
                        alt="bioPURE"
                        width={96}
                        height={66}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/innovation.png"
                        alt="Innovation Carwash Services"
                        width={99}
                        height={64}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/duque.png"
                        alt="Duque Roofing"
                        width={102}
                        height={50}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/recovery.png"
                        alt="Recovery Remodeling"
                        width={78}
                        height={92}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/do-it.png"
                        alt="Do it Right Roofing"
                        width={118}
                        height={84}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/raber.png"
                        alt="Raber"
                        width={108}
                        height={43}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/paragon.png"
                        alt="Paragon Exteriors"
                        width={100}
                        height={54}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/TJD.png"
                        alt="TJD Roofing"
                        width={110}
                        height={60}
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[128px] h-[128px] flex items-center justify-center bg-standart-white rounded-2xl'>
                    <Image
                        src="/images/nextt.png"
                        alt="Nextt Home Builders"
                        width={120}
                        height={27}
                    />
                </div>
            </SwiperSlide>
        </Swiper>
    )
}