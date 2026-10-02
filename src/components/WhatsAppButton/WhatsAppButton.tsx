const whatsappUrl =
  "https://wa.me/584221462613?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Congreso%20Veterinario%20Felino%20IVEC%202027.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-7 md:right-7"
    >
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M16 3.2a12.8 12.8 0 0 0-11 19.3L3.2 29l6.7-1.8A12.8 12.8 0 1 0 16 3.2Zm0 23.3a10.5 10.5 0 0 1-5.3-1.4l-.4-.2-4 .1 1.1-3.8-.3-.4A10.5 10.5 0 1 1 16 26.5Z" />
        <path d="M22.2 18.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 2.9 1.3 3.1.2.2 2.2 3.4 5.4 4.8 2 .9 2.7 1 3.7.8.6-.1 1.9-.8 2.1-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4Z" />
      </svg>
      <span className="sr-only">Escríbenos por WhatsApp</span>
    </a>
  );
}