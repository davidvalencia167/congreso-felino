
const features = [
    {t: "Medicina felina aplicada", d: "Casos clinicos reales y protocolos actualizados de la mano de expertos", i: "🩺"},
    {t: "Certicifacion IVEC", d: "Diploma oficial avalado por el Instituto Veterinario de Educacion Continua", i: "🏅"},
    {t: "Networking profesional", d: "Conecta con +200 colegas y referentes de Latinoamerica", i: "🤝"},
    {t: "Bienestar felino", d: "Estrategias prácticas para mejorar la calidad de vida del paciente", i: "💛"},
];

const stats = [
    {n: "28", l: "Ponencias"},
    {n: "3", l: "Pre-Congresos"},
    {n: "2", l: "Dias"},
    {n: "1200", l: "Asistentes"},
];

export function About() {
    return(
        <section id="congreso" className="section-cream py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
                    <div>
                        <span className="chip">El Congreso</span>
                        <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                            Un encuentro hecho a la medida del {" "}
                            <span className="italic text-terracotta">paciente felino</span>.
                        </h2>
                        <p className="mt-6 text-muted-foreground max-w-lg">
                            Barquisimeto abre sus puertas para recibir a medicos veterinarios, estudiantes, investigadores
                            y apasionados del mundo felino en un encuentro sin precedentes para la medicina felina nacional.
                            Con el respaldo académico de destacados especialistas nacionales e internacionales, este congreso
                            reunira conocimientos, innovación y experiencias que impulsarán el desarrollo de la salud y el
                            bienestar de los gatos en nuestra region.
                        </p>
                        <p className="mt-4 text-muted-foreground max-w-lg">
                            En febrero del 2027, la capital musical de Venezuela será el escenario del primer gran
                            Congreso de Gatos del país, marcando un hito para la educación veterinaria y la
                            comunidad felina venezolana. Prepárate para aprender, compartir y ser parte de la historia.
                        </p>

                        <div className="mt-10 grid grid-cols-4 rounded-2xl bg-background border border-border overflow-hidden shadow-soft">
                            {
                                stats.map((s, i) => (
                                    <div key={s.l} className={`px-4 py-6 text-center ${i > 0 ? "border-l border-border" : ""}`}>
                                        <div className="font-display text-3xl md:text-4xl font-bold text-terracotta-deep">{s.n}</div>
                                        <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                            {
                                features.map((f) =>(
                                    <div key={f.t} className="group rounded-2xl bg-background border border-border p-7 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-peach text-2xl">
                                            {f.i}
                                        </div>
                                        <h3 className="mt-5 font-display text-xl font-semibold">{f.t}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </section>
    );
}