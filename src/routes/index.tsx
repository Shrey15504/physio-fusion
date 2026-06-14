import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Specialities } from "@/components/Specialities";
import { About } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { BookingCTA } from "@/components/BookingCTA";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PatientGallery } from "@/components/PatientGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Physio-Fusion Physiotherapy Clinic, Mumbai | Move Better. Live Pain Free." },
      { name: "description", content: "Expert physiotherapy in Mumbai for pain relief, rehabilitation, sports injury, neuro & women's health. Dry needling, cupping, hijama, kinesiotaping & pilates rehab at Physio-Fusion, Antophill." },
      { property: "og:title", content: "Physio-Fusion Physiotherapy Clinic, Mumbai" },
      { property: "og:description", content: "Move Better. Live Pain Free. Personalised, evidence-based physiotherapy for every age group." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        name: "Physio-Fusion Physiotherapy Clinic",
        medicalSpecialty: "Physiotherapy",
        telephone: ["+91-77386-75653", "+91-70214-66519"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "C-16, Janta Clinic, Kalpak Estate, Near Antophill Monorail Station",
          addressLocality: "Mumbai",
          postalCode: "400037",
          addressCountry: "IN",
        },
        openingHours: ["Mo-Sa 11:00-20:00"],
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Specialities />
        <PatientGallery />
        <WhyChooseUs />
        <Testimonials />
        <BookingCTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
