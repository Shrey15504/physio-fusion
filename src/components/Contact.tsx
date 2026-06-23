import { Clock, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Visit us</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Find our clinic</h2>
          <p className="mt-4 text-muted-foreground">Walk in or book ahead — we'd love to help you move better.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <a href="https://maps.app.goo.gl/Vme6j51o1vQf1YzP9?g_st=awb" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary text-charcoal">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">Address</div>
                <div className="mt-1 text-sm text-muted-foreground">C-16, Janta Clinic, Kalpak Estate, Near Antophill Monorail Station, Mumbai – 400037</div>
              </div>
            </a>
            <div className="group relative overflow-hidden flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary text-charcoal">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">Phone</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  <a href="tel:+917738675653" className="block hover:text-foreground">+91 77386 75653</a>
                  <a href="tel:+917021566419" className="block hover:text-foreground">+91 70214 66519</a>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary text-charcoal">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">Clinic Timings</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  <div>Mon – Sat · 11:00 AM – 8:00 PM</div>
                  <div>Sunday · Appointments only</div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft lg:col-span-2">
            <iframe
              title="Physio-Fusion clinic location"
              src="https://www.google.com/maps?q=Kalpak+Estate+Antophill+Monorail+Station+Mumbai+400037&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: 480, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
