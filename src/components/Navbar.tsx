import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";


const links = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#specialities", label: "Specialities" },
  { href: "#why", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Physio-Fusion logo" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
          <span className="font-display text-lg font-bold tracking-tight leading-tight">
            Physio<span className="text-primary">-Fusion</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">

          <a
          href="#book"
          className="hidden rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-charcoal/90 hover:shadow-soft md:inline-flex"
          >
          Book Consultation
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a onClick={() => setOpen(false)} href={l.href} className="block py-3 text-sm font-medium">
                  {l.label}
                </a>
              </li>
            ))}
            <a href="#book" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-charcoal px-5 py-3 text-center text-sm font-semibold text-white">
              Book Consultation
            </a>
          </ul>
        </div>
      )}
    </header>
  );
}
