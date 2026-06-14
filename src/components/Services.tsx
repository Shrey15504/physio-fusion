import { Bone, Brain, Flower2, HeartHandshake, Activity } from "lucide-react";

const categories = [
  {
    icon: Bone,
    title: "Orthopedic Physiotherapy",
    items: [
      "Low Back Pain Management",
      "Cervical & Lumbar Spondylosis",
      "Slip Disc & Sciatica Rehabilitation",
      "Knee Pain & Arthritis Management",
      "Frozen Shoulder Treatment",
      "Sports Injury Rehabilitation",
      "Fracture Rehabilitation",
      "Post-Surgical Rehabilitation",
      "Joint Pain Management",
    ],
  },
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    items: [
      "Paralysis / Stroke Rehabilitation",
      "Parkinson's Disease Rehabilitation",
      "Balance & Gait Training",
      "Neuropathy Rehabilitation",
      "Functional Mobility Training",
    ],
  },
  {
    icon: Flower2,
    title: "Women's Health Physiotherapy",
    items: [
      "Pregnancy Physiotherapy",
      "Post-Pregnancy Rehabilitation",
      "Pelvic Floor Rehabilitation",
      "Postural Correction",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Geriatric Care",
    items: [
      "Elderly Mobility Training",
      "Fall Prevention Programs",
      "Strength & Balance Training",
      "Age-Related Joint Care",
    ],
  },
  {
    icon: Activity,
    title: "General Physiotherapy Care",
    items: [
      "Posture Correction",
      "Muscle Strengthening",
      "Pain Relief Therapies",
      "Lifestyle & Ergonomic Guidance",
      "Flexibility & Mobility Training",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">What we offer</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Expert care tailored to your needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            From injury recovery to long-term wellness, our therapists combine clinical expertise with advanced rehabilitation techniques.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-charcoal transition-colors">
                  <c.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
                <ul className="mt-4 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
