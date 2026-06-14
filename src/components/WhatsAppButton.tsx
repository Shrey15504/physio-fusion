import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917738675653?text=Hi%20Physio-Fusion%2C%20I'd%20like%20to%20book%20a%20physiotherapy%20consultation"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-5 py-4 text-white shadow-elevated transition-all hover:scale-105 hover:shadow-glow animate-float"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      <span className="hidden sm:inline font-semibold">Chat with us</span>
    </a>
  );
}
