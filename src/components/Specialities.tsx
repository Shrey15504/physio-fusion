import { Target, CircleDot, Droplets, Tag, Dumbbell } from "lucide-react";

const specialities = [
  { icon: Target, title: "Dry Needling", desc: "Advanced trigger point release therapy for muscular pain and tightness." },
  { icon: CircleDot, title: "Cupping Therapy", desc: "Improves circulation, reduces muscle tension and promotes recovery." },
  { icon: Droplets, title: "Hijama Therapy", desc: "Traditional wet cupping therapy for detoxification and pain management." },
  { icon: Tag, title: "Kinesiotaping", desc: "Supports muscles and joints while improving movement and reducing pain." },
  { icon: Dumbbell, title: "Pilates Rehabilitation", desc: "Core strengthening and posture-focused rehabilitation for stability and mobility." },
];

export function Specialities() {
  return (
    <section id="specialities" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our specialities</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Advanced therapy techniques
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hands-on, modern treatments that accelerate recovery and unlock movement.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialities.map((s) => (
            <div key={s.title} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-charcoal">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
