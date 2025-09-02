import { AdvantageCard } from "@/components/home/AdvantageCard";
import { BrandsSlider } from "@/components/home/BrandsSlider";
import { ConsolidatingAnim } from "@/components/home/ConsolidatingAnim";
import { FormBlock } from "@/components/home/FormBlock";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { Dashboard } from "@/components/home/DashboardAnim";
import { ADVANTAGES, HOW_WORKS } from "@/constans";
import Image from "next/image";
import { IntegrationAnim } from "@/components/home/IntegrationAnim";
import { InfoCard } from "@/components/InfoCard";

export default function Home() {
  return (
    <main className="bg-primary-light">
      <section className="pt-20 pb-10">
        <div className="container">
          <div className="flex lg:flex-nowrap flex-wrap items-center lg:justify-between justify-center gap-4">
            <div className="max-w-[410px]">
              <h1 className="h1 mb-4">Sales team software for only $15/mo</h1>
              <p className="p-body-20">Powerful sales tools to win more deals.</p>
            </div>
            <FormBlock />
          </div>
        </div>
      </section> 

      <section className="py-28">
        <div className="container">
          <h4 className="text-foreground text-2xl mb-12 text-center">
            Trusted by <span className="font-medium">30,000+</span> Contactors and Home Service Pros
          </h4>
          <BrandsSlider />
        </div>
      </section>

      <section className="pb-28">
        <div className="container">
          <h2 className="h2 mb-4 text-center">Empower your team to sell more!</h2>
          <p className="p-body-20 mb-20 text-center max-w-[640px] mx-auto">
            Toolsey is an affordable, 
            yet powerful platform to drive more sales with tools 
            that are easyto-use yet incredibly effective.
          </p>
          <div className="flex lg:justify-start justify-center flex-wrap gap-x-8 gap-y-12">
            {ADVANTAGES.map(( advantage ) => (
              <AdvantageCard key={advantage.id} {...advantage}/>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Image 
            src="/images/dash-header.png"
            alt="bg section"
            width={1216}
            height={539}
            className="w-full h-full mx-auto"
          />
        </div>
      </section>

       <section className="bg-primary pt-24 mb-28">
        <div className="container">
            <h2 className="h2 text-standart-white text-center mx-auto mb-4">
              Lead response times
            </h2>
            <p className="p-body-20 !text-standart-white max-w-[648] mx-auto text-center mb-16">
               Speed to lead is everything when it comes to winning more deals. Toolsey was built to give you an unfair advantage! 
            </p>
            <div className="flex lg:flex-row flex-col justify-center lg:gap-8 overflow-hidden relative">
              <div className="lg:mb-[100px] -mb-[55px] lg:block flex items-center justify-center flex-col">
                <div className="relative w-[554px] h-[296px] lg:-mb-[150px] -mb-[55px]">
                  <Image
                    src="/icons/elipse78.svg"
                    alt="elipse 78"
                    width={554}
                    height={296}
                    className="absolute top-0 left-0 w-full h-full z-10"
                  />
                  <p className="absolute top-1/2 left-[70px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                    <span className="text-[40px] tracking-normal opacity-80">78%</span> of customers pick the first company to respond
                  </p>
                </div>
                <div className="relative w-[505px] h-[393px]">
                  <Image
                    src="/icons/elipse87.svg"
                    alt="elipse 87"
                    width={505}
                    height={393}
                    className="absolute top-0 left-0 w-full h-full z-10"
                  />
                  <p className="absolute top-1/2 left-[70px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                    <span className="text-[40px] tracking-normal opacity-80">87%</span> higher contact rate with automated routing
                  </p>
                </div>
              </div>
              <div className="absolute z-20 bottom-0 left-1/2 -translate-x-1/2 w-[536px] h-[536px]">
                <Image
                  src="/images/lead.png"
                  alt="lead response times"
                  width={536}
                  height={536}
                  className="max-w-full h-full"
                />
              </div>
              <div className="lg:block flex items-center justify-center flex-col max-lg:mb-[500px]">
                <div className="relative w-[554px] h-[296px] lg:-mb-[80px] -mb-[40px]">
                  <Image
                    src="/icons/elipse391.svg"
                    alt="elipse 391"
                    width={578}
                    height={251}
                    className="absolute top-0 left-0 w-full h-full z-10"
                  />
                  <p className="absolute top-[40%] right-[70px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                    <span className="text-[40px] tracking-normal opacity-80">391%</span> higher conversion if you respond within one minute
                  </p>
                </div>
                <div className="relative w-[529px] h-[324px]">
                  <Image
                    src="/icons/elipse7.svg"
                    alt="elipse 7"
                    width={529}
                    height={324}
                    className="absolute top-0 left-0 w-full h-full z-10"
                  />
                  <p className="absolute top-1/2 right-[10px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                    <span className="text-[40px] tracking-normal opacity-80">Only 7%</span> of the companies reply within 5 minutes
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      <section className="mb-28">
        <div className="container">
          <h2 className="h2 mb-4 text-center max-w-[984px] mx-auto">Consolidating information is the key to efficiency and sanity!</h2>
          <p className="p-body-20 text-center max-w-[560px] mx-auto mb-28">Toolsey will aggregate and organize all of your lead sources and sales activity into one place.</p>
            
          <div className="flex flex-col lg:flex-row items-center">
            <ConsolidatingAnim className="lg:-mr-[220px] -mb-[325px] lg:mb-0 max-w-[665px]"/>
            <Dashboard className="max-w-[872px]"/>
          </div>
        </div>
      </section>

      <section className="mb-28">
        <div className="container">
            <InfoCard 
              isImage={true}
              title={"Yes, we know it&apos;s ridiculous starting at only $15/mo"}
              text={"We make it up in volume, Toolsey is enjoyed by over 30,000 contractors and home service pros."}
              btnText={"New customer offer"}
              extraTxt="No contracts required and flexible plans allows Toolsey to deliver the best deal to contractors and home service pros in te industry"
            />
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="h2 mb-4 text-center">See how Toolsey works in action</h2>
          <p className="p-body-20 mb-20 text-center max-w-[510px] mx-auto">
            Give yourself an unfair advantage with a system built to win more jobs. 
            Toolsey automation and assignment tools will drive speed to lead
          </p>
          <div className="flex flex-wrap lg:flex-nowrap lg:justify-between justify-center gap-8 justify-between">
            <div className="max-w-[640px]">
              <h3 className="p-body-24 font-bold mb-6">
                Toolsey Mobile App: a thing of beauty
              </h3>
              <p className="p-body-20">Smart and easy to use — your sales team will be up and running in just a few minutes and instantly fall in love.</p>
              <div className="flex items-center flex-wrap gap-4 my-6">
                {HOW_WORKS.mobile_app.map(item => (
                  <div 
                    key={item} 
                    className="flex items-center justify-center h-[42px] rounded-xl px-4 bg-secondary-foreground p-body-16 font-medium">
                      {item}
                  </div>)
                )}
                <span className="p-body-16 font-medium !text-primary">...and much more!</span>
              </div>
              <button className="btn btn-primary">Get start free</button>
            </div>
            <Image
              src="/images/mobile-app.png"
              alt="mobile app"
              width={640}
              height={360}
              className="max-h-[360px]"
            />
          </div>

          <div className="flex flex-wrap lg:flex-nowrap lg:justify-between justify-center gap-8 my-20">
            <div className="max-w-[640px]">
              <h3 className="p-body-24 font-bold mb-6">
                Your Command Center for All Sales Activity
              </h3>
              <p className="p-body-20">
                Powerful and easy to use — your admin&apos;s life just got a whole lot easier and more productive.
              </p>
              <div className="flex items-center flex-wrap gap-4 my-6">
                {HOW_WORKS.command_center.map(item => (
                  <div 
                    key={item} 
                    className="flex items-center justify-center h-[42px] rounded-xl px-4 bg-secondary-foreground p-body-16 font-medium">
                      {item}
                  </div>)
                )}
                <span className="p-body-16 font-medium !text-primary">...and much more!</span>
              </div>
              <button className="btn btn-primary">Get start free</button>
            </div>
            <Image
              src="/images/command-center.png"
              alt="command center"
              width={640}
              height={360}
              className="max-h-[360px]"
            />
          </div>
        </div>
      </section>

      <section className="pb-48">
        <div className="container">
          <h2 className="h2 text-center mb-4">
            Testimonials
          </h2>
          <p className="p-body-20 text-center max-w-[638px] mx-auto mb-12">
            Give yourself an unfair advantage with a system built to win more jobs. Toolsey automation and assignment tools will drive speed to lead
          </p>
        </div>
        <TestimonialsSlider />
      </section>

      <section>
        <div className="container">
          <div className="flex items-center lg:flex-nowrap flex-wrap lg:justify-between justify-center linear-card w-full lg:h-[480px] relative rounded-[48px] lg:pl-16 pt-16 lg:pt-0">
              <div>
                <h2 className="h2 text-standart-white mb-4 max-w-[720px] lg:text-left text-center">
                  Integrations that power your business
                </h2>
                <p className="p-body-20 !text-standart-white max-w-[600px] lg:mx-0 lg:text-left text-center mx-auto">
                  Don’t see an integration you need? Reach out to us we often times add new ones for customers or already have it in the works. 
                </p>
                <div className="lg:block flex justify-center">
                  <button className="btn btn-white my-6">Let’s talk integrations</button>
                </div>
              </div>
              <IntegrationAnim className="self-end"/>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container text-center">
          <h2 className="h2 mb-4">
            Ready to grow your business?
          </h2>
          <p className="p-body-20 mb-6">Start using Toolsey today and turn every lead into a customer.</p>
          <div className="flex items-center justify-center gap-6 mb-4 text-[20px]">
            <button className="btn btn-primary">Explore pricing</button>
            <button className="btn btn-primary">Discovery call</button>
          </div>
          <p className="label">Simple setup. Instant results. No credit card required.</p>
        </div>
      </section>
    </main>
  );
}
