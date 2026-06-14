import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do I need a doctor's referral to book a session?", a: "No referral required. You can book directly and our therapist will assess your needs during the first consultation." },
  { q: "What conditions do you treat?", a: "We treat orthopedic, neurological, women's health, geriatric and sports conditions — including back pain, sciatica, frozen shoulder, stroke, post-surgical recovery and more." },
  { q: "How long is a typical session?", a: "Most sessions run between 45 and 60 minutes, including assessment, hands-on therapy and guided exercise." },
  { q: "What are your clinic timings?", a: "Monday to Saturday from 11:00 AM to 8:00 PM. Sunday is by appointment only." },
  { q: "Do you offer home visit physiotherapy?", a: "Yes, home visits can be arranged for elderly and post-surgical patients. Please call us to schedule." },
  { q: "How many sessions will I need?", a: "It depends on your condition and goals. Most patients see noticeable progress within 4–8 sessions." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Questions, answered.</h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
