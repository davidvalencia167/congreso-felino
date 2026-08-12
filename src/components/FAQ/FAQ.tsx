import { useState } from "react";


const items = [
    { q: "¿El congreso es presencial o virtual?", a: "Es 100% presencial en Barquisimeto"},
    { q: "¿La inscripción incluye almuerzo?", a: "No, Servicio de café y estación de hidratación"},
    { q: "¿El programa es válido para educación continua?", a: "Si, entregamos certificado Avalado por la universidad UCLA."},
];

export function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    return(
        <section id="faq" className="section-peach py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-5 md:px-8 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
                <div>
                    <span className="chip">FAQ</span>
                    <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                        Preguntas <span className="italic text-terracotta">frecuentes</span>.
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        ¿Otra pregunta? Escribenos a institutoivec2025@gmail.com y te respondemos en 24 horas.
                    </p>
                </div>
                <div className="space-y-3">
                    {
                        items.map((it, i) => (
                            <button key={it.q} onClick={() => setOpen(open === i ? null : i)} className="w-full text-left rounded-2xl bg-background border border-border px-6 py-5 hover:shadow-soft transition-all">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="font-semibold">{it.q}</span>
                                    <span className={`text-terracotta transition-transform ${open === i ? "rotate-45": ""}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </div>
                                {
                                    open === i && (
                                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                                    )}
                            </button>
                        ))}
                </div>
            </div>
        </section>
    );
}