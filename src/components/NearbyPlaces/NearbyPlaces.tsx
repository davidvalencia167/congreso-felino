import { nearbyPlaces } from "./nearby.data";


export function NearbyPlaces () {
    return(
        <section id="lugares-cercanos" className="section-sand py-24 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="max-w-2xl">
                    <span className="chip-gold">Lugares cercanos</span>
                    <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                        Todo cerca del <span className="italic text-terracotta">Hotel Trinitarias</span>
                    </h2>
                    <p className="mt-5 text-muted-foreground">
                        Para que te ubiques fácilmente durante el congreso, estos son los puntos de interes, servicios y sitios recomendados alrededor de la sede.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        nearbyPlaces.map((p) => (
                            <article key={p.name} className="card-gold-hover rounded-2xl border border-border bg-card p-6">
                                <img
                                    src={p.image}
                                    alt={`Vista de ${p.name}`}
                                    className="h-48 w-full rounded-xl object-cover"
                                />
                                <div className="mt-5 flex items-center justify-between gap-3">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">{p.category}</span>
                                    <span className="text-[11px] text-muted-foreground">{p.distance}</span>
                                </div>
                                <h3 className="mt-3 font-display text-xl font-semibold">{p.name}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
}