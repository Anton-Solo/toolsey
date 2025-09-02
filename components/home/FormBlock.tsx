'use client';


import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";
import { FormElipse1 } from "../icons/home-form/FormElipse1";
import { FormElipse2 } from "../icons/home-form/FormElipse2";
import { FormElipse3 } from "../icons/home-form/FormElipse3";
import { FormElipse4 } from "../icons/home-form/FormElipse4";
import { FormElipse5 } from "../icons/home-form/FormElipse5";
import { FormElipse6 } from "../icons/home-form/FormElipse6";

export const FormBlock = () => {
    const [phone, setPhone] = useState<string>();

    return (
        <div className="relative flex items-center">
            <div className="relative -mr-[123px] md:block hidden">
                <FormElipse1 className="-mb-[110px] ml-[70px] md:block hidden"/>
                <FormElipse2 className="md:block hidden"/>
                <FormElipse3 className="-mt-[90px] ml-[115px] md:block hidden"/>
                <Image 
                    alt="girl image"
                    src="/images/girl.png"
                    width={365}
                    height={281}
                    className="w-[281px] absolute top-[16%] left-[10px] md:block hidden"
                />
            </div>
            <form className="relative z-30 bg-standart-white p-8 rounded-4xl shadow-form flex flex-col gap-6 text-accent max-w-[416px] w-full">
                <input 
                type='text'
                placeholder="Full name *"
                className="input"
                />
                <input 
                type='email'
                placeholder="Email *"
                className="input"
                />
                <PhoneInput
                    defaultCountry="us"
                    value={phone}
                    onChange={setPhone}
                />
                <p>It only takes 15 minutes to learn why 30,000 pros use Toolsey to generate more sales. </p>
                <button className="btn btn-primary h-14 text-[20px]">Discovery Call</button>
            </form>
            <div className="relative -ml-[300px] md:block hidden">
                <Image 
                    alt="man image"
                    src="/images/man.png"
                    width={182}
                    height={213}
                    className="absolute top-[27%] right-0 w-[182px] md:block hidden"
                />
                <FormElipse4 className="-mb-[110px] ml-[110px] md:block hidden"/>
                <FormElipse5 className="md:block hidden"/>
                <FormElipse6 className="-mt-[90px] ml-[160px] md:block hidden"/>
            </div>
        </div>
    )
}