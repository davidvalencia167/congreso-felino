import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/584221462613?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Congreso%20Veterinario%20Felino%20IVEC%202027.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-7 md:right-7"
    >
      <MessageCircle aria-hidden="true" size={22} strokeWidth={2.2} />
      <span className="hidden sm:inline">Escríbenos por WhatsApp</span>
    </a>
  );
}