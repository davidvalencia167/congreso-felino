import { useEffect, useState } from "react";
import logo from "../../assets/logo-ivec.jpeg";


const links = [
    {href: "#congreso", label: "El Congreso"},
    {href: "#ponentes", label: "Ponentes"},
    {href: "#programa", label: "Programa"},
    {href: "#inscripcion", label: "Inscripción"},
    {href: "#sede", label: "Sede"},
    {href: "#faq", label: "FAQ"}
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return(
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-soft"
          : "bg-transparent"
      }`}>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
            <a href="#top" className="flex items-center gap-3">
                <img src={logo} alt="IVEC Congreso Felino" className="h-12 w-12 rounded-full ring-2 ring-terracota/30 object-cover"/>
                <div className="leading-tight">
                    <div className="font-display text-lg font-bold tracking-tight">IVEC</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Congreso Felino
                    </div>
                </div>
            </a>

            <nav className="hidden lg:flex items-center gap-7">
                {
                    links.map((l) => (
                        <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/75 hover:text-terracotta transition-colors">
                            {l.label}
                        </a>
                    ))}
            </nav>

            <div className="flex items-center gap-3">
                <a href="#inscripcion" className="hidden md:inline-flex items-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm hover:bg-terracotta-deep transition-colors">
                    Inscribete
                </a>
                <button onClick={() => setOpen(!open)} className="lg:hidden rounded-full p-2 hover:bg-muted" aria-label="Abrir menu">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>
            </div>
        </div>

        {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-peach-soft"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#inscripcion"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Inscríbete
            </a>
          </div>
        </div>
      )}
      </header>
    );
}