
import Barquisimeto from "../../assets/barquisimeto.jpg";

const items = [
    {t: "Hotel Trinitarias", d: "Av. Los Leones · Salón principal con capacidad para 1200 asistentes."},
    {t: "Cómo llegar", d: "Aeropuerto Internacional Jacinto Lara (BRM) a 20 min del hotel."},
]

export function Venue() {
    return(
        <section id="sede" className="section-sand py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8 grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="relative">
                    <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-terracotta/15 blur-2xl"/>
                    <img src={Barquisimeto} alt="Barquisimeto, Venezuela" loading="lazy" className="rounded-[2rem] shadow-warm w-full h-auto object-contain bg-black/5" />
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