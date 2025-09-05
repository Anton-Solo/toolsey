'use client';

import Image from "next/image";
import { DashNotesIcon } from "@/components/icons/DashNotesIcon";
import { MessageLeftIcon } from "@/components/icons/MessageLeftIcon";
import { LeadMessageIcon } from "@/components/icons/LeadMessageIcon";
import { MessageRightIcon } from "@/components/icons/MessageRightIcon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AnimatedDashboardSection = () => {
  const { ref: leftBlockRef, isVisible: leftBlockVisible } = useScrollAnimation();
  const { ref: rightBlockRef, isVisible: rightBlockVisible } = useScrollAnimation();

  return (
    <section>
      <div className="container">
        <div className="flex">
          <div 
            ref={leftBlockRef}
            className={`pt-[115px] -mr-[22px] relative z-10 ${
              leftBlockVisible ? 'animate-slide-up' : 'scroll-hidden'
            }`}
          >
            <DashNotesIcon  className="-mr-8"/>
            <MessageLeftIcon className="relative -right-[25px]"/>
          </div>
          <div className="relative max-w-[840px] w-full overflow-hidden">
            <Image 
              src="/images/dash-header-1.png"
              alt="bg section"
              width={840}
              height={400}
              className="w-full max-w-[840px] h-full "
            />
            <Image 
              src="/images/dash-girl.png"
              alt="bg section"
              width={546}
              height={383}
              className="w-full max-w-[546px] h-full absolute -bottom-[30px] left-[60%] -translate-x-1/2"
            />
          </div>
          <div 
            ref={rightBlockRef}
            className={`pt-[90px] ${
              rightBlockVisible ? 'animate-slide-up' : 'scroll-hidden'
            }`}
          >
            <LeadMessageIcon className="relative -left-[140px]"/>
            <MessageRightIcon className="relative -left-[55px]"/>
          </div>
        </div>
      </div>
    </section>
  );
};
