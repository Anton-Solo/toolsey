import { ContactForm } from "@/components/contact/ContactForm";
import { Info } from "@/components/Info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact—Lead Management for Home Service Pros | Toolsey",
    description: "Toolsey contact for home-service pros: lead aggregation, instant alerts, mapping, smart routing, texting, digital forms, photos, analytics, and more.",
};

export default function Contact() {

    return (
        <main className="bg-primary-light">
            <section className="pt-[72px] pb-[120px]">
                <div className="container">
                    <div className="flex md:flex-row flex-col-reverse max-md:items-center gap-6 justify-between">
                        <div className="max-w-[530px]">
                            <div className="mb-12 hidden md:block">
                                <h1 className="h2 font-bold mb-4">Contact us</h1>
                                <p className=" p-body-20">We’d love to hear from you. Please fill out this form.</p>
                            </div>
                            <Info isContact />
                        </div>
                        <div className="w-full max-w-[640px] grow-1">
                            <div className="mb-12 md:hidden w-full">
                                <h1 className="text-center h2 font-bold mb-4">Contact us</h1>
                                <p className="max-w-[224px] mx-auto text-center p-body-20">We’d love to hear from you. Please fill out this form.</p>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}