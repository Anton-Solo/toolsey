import { FAQItem } from "@/components/support/FAQItem";
import { FAQ_QUESTIONS } from "@/constans/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ Toolsey",
    description: "Toolsey FAQ for home-service pros: lead aggregation, instant alerts, mapping, smart routing, texting, digital forms, photos, analytics, and more.",
};

export default function Contact() {
    return (
        <main className="bg-primary-light">
            <section className="pt-[72px] pb-[120px]">
                <div className="container">
                    <h1 className="h2 text-center text-foreground mb-6">Frequently Asked Questions</h1>
                    <p className="p-body-20 max-w-[528px] mx-auto text-center mb-10">Read all about Toolsey with some of our most asked questions below.</p>
                    <div className="max-w-[864px] mx-auto">
                        {FAQ_QUESTIONS.map(({ id, question, answer }) => (
                            <div key={id} className={`mb-6 ${id === FAQ_QUESTIONS.length ? '' : 'last:mb-0'}`}>
                                <FAQItem question={question} answer={answer} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}