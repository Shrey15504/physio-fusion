import p1 from "@/assets/patients/p1.jpeg";
import p2 from "@/assets/patients/p2.jpeg";
import p3 from "@/assets/patients/p3.jpeg";
import p4 from "@/assets/patients/p4.jpeg";
import p5 from "@/assets/patients/p5.jpeg";
import p6 from "@/assets/patients/p6.jpeg";


const images = [
  { src: p1, label: "Kinesio taping therapy" },
  { src: p2, label: "Core strengthening" },
  { src: p3, label: "Knee mobility session" },
  { src: p4, label: "Lower back taping" },
  { src: p5, label: "Dry needling & electrotherapy" },
  { src: p6, label: "Senior rehabilitation" },

];

export function PatientGallery() {
  const row1 = images.slice(0, 4);
  const row2 = images.slice(4, 8);

  return (
    <section id="gallery" className="relative overflow-hidden bg-gradient-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Real care, real results</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Moments from our clinic
          </h2>
          <p className="mt-4 text-muted-foreground">A glimpse of the personalised treatments our patients receive every day.</p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-5">
        {/* Row 1 — scrolls left */}
        <div className="group flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee-left gap-5 pr-5 group-hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((img, i) => (
              <GalleryCard key={`r1-${i}`} img={img} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="group flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee-right gap-5 pr-5 group-hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((img, i) => (
              <GalleryCard key={`r2-${i}`} img={img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ img }: { img: { src: string; label: string } }) {
  return (
    <div className="group/card relative aspect-[4/5] w-64 md:w-72 shrink-0 overflow-hidden rounded-2xl bg-card shadow-soft">
      <img
        src={img.src}
        alt={img.label}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <p className="text-xs font-medium text-white">{img.label}</p>
      </div>
    </div>
  );
}
