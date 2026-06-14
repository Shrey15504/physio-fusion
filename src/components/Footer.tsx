import { Facebook, Instagram, Globe } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const socials = [
  { href: "https://www.instagram.com/physio_fusion37?igsh=b3lqejRuMjRwcTc4", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com/physiofusion", label: "Facebook", Icon: Facebook },
  { href: "https://www.justdial.com/Mumbai/Physio-fusion-Physiotherapy-Clinic-Near-Antophill-Monorail-Station-Beside-Saraswat-Bank-Kalpak-Estate-Antop-Hill/022PXX22-XX22-250120200046-Z8Y6_BZDET", label: "Justdial", Icon: Globe },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Physio-Fusion" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display font-bold">Physio-Fusion Physiotherapy Clinic</span>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-primary hover:text-charcoal hover:shadow-soft"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Physio-Fusion.<br className="md:hidden" />
          <span className="hidden md:inline"> · </span>Mumbai – 400037
        </p>
      </div>
    </footer>
  );
}
