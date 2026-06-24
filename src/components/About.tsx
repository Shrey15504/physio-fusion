import { Check } from "lucide-react";
import spine from "@/assets/illustration-spine.png";

const points = [
  "Personalised treatment plans for every patient",
  "1:1 sessions — dedicated therapist attention",
  "Move better — restore strength & mobility",
  "Care for all age groups — kids to seniors",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-hero py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-primary shadow-elevated">
            <img
            src={spine}
            alt="Physiotherapist"
            width={768}
            height={768}
            loading="lazy"
            className="h-full w-full object-cover rounded-3xl"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-card p-5 shadow-elevated md:block">
            <div className="text-3xl font-bold text-primary">All Ages</div>
            <div className="text-xs text-muted-foreground">Welcomed & cared for</div>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Movement matters</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Helping you live actively again
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            At Physio-Fusion Physiotherapy Clinic, our goal is to help every patient become pain-free, regain movement and maintain a healthy, active lifestyle. We provide personalised physiotherapy treatments for people of all age groups with evidence-based rehabilitation and advanced therapy techniques.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-charcoal">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
