import { UserCheck, FlaskConical, Users, Sparkles, Leaf, Heart } from "lucide-react";

const reasons = [
  { icon: UserCheck, title: "Personalised Treatment Plans", desc: "Every recovery plan is designed around your body, goals and lifestyle." },
  { icon: FlaskConical, title: "Evidence-Based Physiotherapy", desc: "Treatments grounded in the latest clinical research and outcomes." },
  { icon: Users, title: "One-on-One Patient Care", desc: "Dedicated therapist time — no rushed or shared sessions." },
  { icon: Sparkles, title: "Advanced Rehabilitation", desc: "Modern equipment and techniques for faster, lasting results." },
  { icon: Leaf, title: "Holistic Recovery Approach", desc: "Movement, lifestyle and wellness, treated together as one." },
  { icon: Heart, title: "Patient-Centered Care", desc: "Compassionate, transparent care that puts you first." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why choose us</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Care you can trust
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-charcoal">
                  <r.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
