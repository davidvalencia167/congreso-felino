import { useState } from "react";
import { speakersData, type Speaker } from "./speakers.data";


export function Speakers() {
    const [active, setActive] = useState<Speaker | null>(null);
    return(
        <section id="ponentes" className="bg-background py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <span className="chip">Ponentes</span>
                        <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance max-w-xl">
                            Referentes de la {" "}
                            <span className="italic text-terracotta">medicina felina</span>.
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground">
                        Aprende de quienes hoy estan construyendo la
                        medicina felina en Latinoamérica.
                        Cuatro voces, una sola pasión: el bienestar del felino.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        speakersData.map((s) => (
                            <article key={s.n} className="group overflow-hidden rounded-3xl bg-peach-soft border border-border hover:shadow-warm transition-all duration-300 flex flex-col">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={s.i}
                                        alt={s.n}
                                        loading="lazy"
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
                                    />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-display text-lg font-semibold">{s.n}</h3>
                                    <p className="mt-1 text-sm text-terracotta-deep font-medium">{s.r}</p>
                                    <button type="button" onClick={() => setActive(s)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-terracotta-deep transition-colors">
                                        Ver información
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M13 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        ))}
                </div>
            </div>

            {
                active && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)}>
                        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-warm" onClick={(e) => e.stopPropagation()}>
                            <button type="button" onClick={() => setActive(null)} aria-label="Cerrar" className="absolute right-4 top-4 z-10 rounded-full bg-background/70 background-blur p-2 text-foreground hover:bg-terracotta hover:text-primary-foreground transtion-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                            <div className="grid md:grid-cols-[280px_1fr]">
                                <div className="aspect-[4/5] md:aspect-auto overflow-hidden md:rounded-l-3xl">
                                    <img src={active.i} alt={active.n} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-6 md:p-8">
                                    <span className="chip">{active.country}</span>
                                    <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold">{active.n}</h3>
                                    <p className="mt-1 text-terracotta-deep font-medium">{active.r}</p>
                                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{active.bio}</p>
                                    <div className="mt-6">
                                        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Temas</div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {
                                                active.topics.map((t) => (
                                                    <span key={t} className="rounded-full bg-peach px-3 py-1.5 text-xs font-medium">
                                                        {t}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </section>
    );
}