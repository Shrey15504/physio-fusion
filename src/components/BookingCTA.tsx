import { useEffect, useState } from "react";import { Calendar, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  createBookingEvent,
  getBookedSlots,
} from "@/lib/booking.functions";

const services = [
  "Orthopedic Rehab",
  "Sports Injury",
  "Neuro Physiotherapy",
  "Posture Correction",
  "Pain Management",
  "Women's Health",
  "Dry Needling",
  "Cupping / Hijama",
  "Pilates Rehab",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s]+$/, "Only digits, +, - allowed"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please choose a date"),
  time: z
    .string()
    .min(1, "Please choose a preferred time")
    .regex(/^\d{2}:\d{2}$/, "Invalid time"),
  message: z.string().trim().max(500).optional(),
});

const timeSlots = (() => {
  const slots: string[] = [];
  for (let h = 11; h <= 19; h++) {
    for (const m of [0, 30]) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  slots.push("20:00");
  return slots;
})();

const formatSlot = (t: string) => {
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${mStr} ${suffix}`;
};

export function BookingCTA() {
const [submitting, setSubmitting] = useState(false);
const [selectedDate, setSelectedDate] = useState("");
const [selectedTime, setSelectedTime] = useState("");
const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const fetchBookedSlots = useServerFn(getBookedSlots);
  useEffect(() => {
  if (!selectedDate) return;

  const loadSlots = async () => {
  try {
    const slots = await fetchBookedSlots({
      data: { date: selectedDate },
    });

    console.log("Booked Slots:", slots);
    setBookedSlots(slots as string[]);
    setSelectedTime("");
  } catch (error) {
    console.error(error);
  }
};

  loadSlots();
}, [selectedDate]);
  const bookEvent = useServerFn(createBookingEvent);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { name, phone, service, date, time, message } = parsed.data;
    try {
      await bookEvent({ data: { name, phone, service, date, time, message: message ?? "" } });
      toast.success("Appointment added to clinic calendar. Confirming on WhatsApp…");
    } catch (err: any) {
  console.error(err);

  if (err?.message?.includes("already booked")) {
    toast.error(
      "Selected time slot is already booked. Please choose another slot."
    );
  } else {
    toast.error(
      "Unable to book appointment right now. Please try again."
    );
  }

  setSubmitting(false);
  return;
    }
    const text = `Hello Physio-Fusion, I'd like to book an appointment.%0A%0AName: ${encodeURIComponent(
      name,
    )}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(
      service,
    )}%0APreferred date: ${encodeURIComponent(date)}%0APreferred time: ${encodeURIComponent(
      formatSlot(time),
    )}${
      message ? `%0ANote: ${encodeURIComponent(message)}` : ""
    }`;
    window.open(`https://wa.me/917738675653?text=${text}`, "_blank", "noopener,noreferrer");
    form.reset();
    setSubmitting(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="book" className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-dark p-8 text-white shadow-elevated md:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary opacity-30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary opacity-20 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Book a Consultation
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Start your recovery <span className="text-primary">today.</span>
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Share a few details and our team will confirm your slot on WhatsApp within minutes.
              </p>
              <div className="mt-6 space-y-2 text-sm text-white/70">
                <p>Contact :- +91 77386 75653 · +91 70215 66419</p>
                <p>Timings :- Mon – Sat: 11:00 AM – 8:00 PM</p>
                <p>Note :- Sunday: Appointments only</p>
                <p>Address :- Kalpak Estate, Antophill, Mumbai 400037</p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
            >
              <div className="grid gap-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">Full name</label>
                  <input id="name" name="name" required maxLength={80} placeholder="Your name" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">Phone</label>
                  <input id="phone" name="phone" required maxLength={20} placeholder="+91 98765 43210" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">Service</label>
                    <select id="service" name="service" required defaultValue="" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none">
                      <option value="" disabled className="text-charcoal">Select…</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="text-charcoal">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">Preferred date</label>
                    <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    min={today}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">Preferred time</label>
                  <select
                  id="time"
                  name="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
                  >
                  <option value="" disabled className="text-charcoal">
                  Select a time slot…
                  </option>

                  {timeSlots.map((t) => (
                  <option
                  key={t}
                  value={t}
                  disabled={bookedSlots.includes(t)}
                  className="text-charcoal"
                  >
                  {formatSlot(t)}
                  {bookedSlots.includes(t) ? " (Booked)" : ""}
                  </option>
                  ))}
                  </select>
                  <p className="mt-1.5 text-xs text-white/50">Clinic hours: Mon–Sat 11:00 AM – 8:00 PM · Sunday by appointment</p>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">Message <span className="text-white/40">(optional)</span></label>
                  <textarea id="message" name="message" maxLength={500} rows={3} placeholder="Describe your concern briefly" className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none" />
                </div>
                <button type="submit" disabled={submitting} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-charcoal transition-all hover:scale-[1.02] disabled:opacity-60">
                  {submitting ? "Sending…" : "Request appointment"}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-center text-xs text-white/50">We'll confirm on WhatsApp · No spam, ever.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
