import { FeatureAnimations } from "@/components/features/FeatureAnimations";


export default function Features() {
  return (
    <main className="bg-primary-light">
      <section className="pt-[120px] pb-[60px]">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <h1 className="h2 font-bold mb-4">Toolsey Features</h1>
            <p className="p-body-20 max-w-[638px] mx-auto text-center mb-8 text-accent">
              Built for home service pros. Powered by automation. Designed to close more jobs.
            </p>
          </div>
        </div>
      </section>

      <FeatureAnimations />

      <section className="lg:py-28 py-14">
        <div className="container text-center">
          <h2 className="h2 mb-4">Ready to grow your business?</h2>
          <p className="p-body-20 mb-6">Start using Toolsey today and turn every lead into a customer.</p>
          <div className="flex lg:flex-nowrap flex-wrap items-center justify-center gap-6 mb-4 text-[20px]">
            <button className="btn btn-primary max-sm:w-full">Learn more</button>
            <button className="btn btn-primary max-sm:w-full">See plans and pricing</button>
          </div>
          <p className="label">Simple setup. Instant results. No credit card required.</p>
        </div>
      </section>
    </main>
  );
}
