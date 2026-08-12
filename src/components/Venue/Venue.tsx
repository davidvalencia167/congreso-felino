
import { useEffect, useState } from "react";
import bqto1 from "../../assets/bqto-1.jpg";
import bqto2 from "../../assets/bqto-2.jpg";
import bqto3 from "../../assets/bqto-3.jpg"

const photos = [
    {src: bqto1, alt: "Obelisco de Barquisimeto al atardecer"},
    {src: bqto2, alt: "Catedral de Barquisimeto"},
    {src: bqto3, alt: "Plaza central de Barquisimeto"}
]

const items = [
    {t: "Hotel Trinitarias", d: "Av. Los Leones · Salón principal con capacidad para 1200 asistentes."},
    {t: "Cómo llegar", d: "Aeropuerto Internacional Jacinto Lara (BRM) a 20 min del hotel."},
]

export function Venue() {
    const [i, setI] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setI((p) => (p + 1) % photos.length), 5000);
        return () => clearInterval(id);
    }, []);

    return(
        <section id="sede" className="section-sand py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8 grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="relative">
                    <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-terracotta/15 blur-2xl"/>
                    <div className="relative overflow-hidden rounded-[2rem] shadow-warm aspect-[4/3] bg-card">
                        {
                            photos.map((p, idx) => (
                                <img key={p.src} src={p.src} alt={p.alt} loading="lazy" width={1280} height={960} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === i ? "opacity-100": "opacity-0"}`} />
                        ))}
                        <button onClick={() => setI((p) => (p - 1 + photos.length) % photos.length)} aria-label="Foto anterior" className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur hover:bg-background">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M15 5l-7 7 7 7" />
                            </svg>
                        </button>
                        <button onClick={() => setI((p) => (p +1) % photos.length)} aria-label="Foto siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur hover:bg-background">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {
                                photos.map((p, idx) => (
                                    <button key={p.src} onClick={() => setI(idx)} aria-label={`Ir a la foto ${idx + 1}`} className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-terracotta": "w-2 bg-foreground/40"}`}/>
                                ))}
                        </div>
                    </div>
                </div>
                
                <div>
                <span className="chip">La Sede</span>
                <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                    Barquisimeto, <span className="italic text-terracotta">Venezuela</span>.
                </h2>
                <p className="mt-5 text-muted-foreground max-w-lg">
                    La Ciudad de los Crepúsculos será el escenario del Congreso Felino IVEC 2027. Una ciudad cálida,
                    llena de música y hospitalidad, que recibirá a profesionales expertos en Medicina Felina de toda Latinoamérica.
                </p>

                <ul className="mt-8 space-y-4">
                    {
                        items.map((it) => (
                            <li key={it.t} className="flex gap-4">
                                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-primary-foreground">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold">{it.t}</div>
                                    <div className="text-sm text-muted-foreground">{it.d}</div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            </div>
        </section>
    )
}