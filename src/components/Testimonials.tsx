import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  { name: "Om Singh", role: "11 months ago", rating: 4, text: "Me and my wife are very thankful to Namrata mam for her best Physiotherapy treatment given to us." },
  { name: "Riya Bandekar", role: "2 reviews · 2 photos · a year ago", rating: 5, text: "Dr Namrata helped me alot with my neck and wrist pain. I'm now recovered from my Carpal Tunnel issue too. I highly recommend this physiotherapy centre to all." },
  { name: "Swetalana satpute", role: "8 reviews · 6 months ago", rating: 5, text: "I have suffered with severe knee pain and in agony. But after approaching Dr. Namrata I got so much relief and she also guided me to dig the root cause of it which is obviously my weight. Now I have started working on it seriously. And doing physio exercises regularly. Thank you Namrata you are such a sweet and humble soul genuinely. All the very best for your bright career and blissful life." },
  { name: "DEV. CLASSES By. yogesh prajapat", role: "3 reviews · a year ago", rating: 5, text: "A very polite, understanding and patient doctor one can come across. Her approach towards treatment is holistic, she'll guide you about lifestyle changes, exercises that is comfortable for your condition and most importantly you will get what you came for — pain relaxation, strength in muscle. Definitely recommend her to everyone." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Trusted by people in motion</h2>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
          className="mt-16"
        >
          <CarouselContent>
            {reviews.map((r) => (
              <CarouselItem key={r.name} className="md:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("h-4 w-4", i < r.rating ? "fill-current" : "text-muted-foreground")} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">
                    "{r.text}"
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-5">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.role}</div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
