import hero from "@/assets/hero-physio.jpg";
import logo from "@/assets/logo.jpeg";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Move Better. Live Pain Free.
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="whitespace-nowrap">Physio<span className="text-primary">-Fusion</span></span> <br />
            Physiotherapy Clinic
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Expert physiotherapy care for pain relief, rehabilitation, recovery, mobility and long-term wellness — personalised for every age and every body.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-4 text-sm font-semibold text-white shadow-elevated transition-all hover:scale-[1.02] hover:shadow-glow"
              >
              Book your consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-8">
            {[
              { k: "All Ages", v: "Personalised care" },
              { k: "1:1", v: "Therapist sessions" },
              { k: "Evidence", v: "Based therapy" },
            ].map((s) => (
              <div key={s.v}>
                <div className={cn("font-display text-2xl font-bold", s.k === "All Ages" && "text-foreground")}>{s.k}</div>
                <div className={cn("text-xs", s.k === "All Ages" ? "text-foreground" : "text-muted-foreground")}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl bg-card shadow-elevated">
            <img src={hero} alt="Physiotherapist guiding rehabilitation exercise" width={1536} height={1280} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-4 shadow-elevated sm:flex items-center gap-3 animate-float">
            <img src={logo} alt="Physio-Fusion" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="text-sm font-semibold text-primary">Personalised Plans</div>
              <div className="text-xs text-foreground font-medium">One-on-one care</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
