

export function Sponsors() {
    return(
        <section id="patrocinadores" className="bg-[#f7f5f1] py-20 md:py-24 text-[#1a1a1a]">
            <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
                <span className="inline-flex items-center rounded-full bg-[#e8704e]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b4522f]">
                    Patrocinadores
                </span>
                <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance text-[#1a1a1a]">
                    Marcas que hacen posible el <span className="italic text-[#c05a34]">Congreso Veterinario Felino</span>.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[#5a5550]">
                    Muy pronto anunciaremos las empresas y aliados que acompañarán el congreso.
                    ¿Quieres que tu marca esté aqui?
                </p>

                <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
                    {
                        Array.from({length: 8}).map((_, i) => (
                            <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-[#d8d2c9] bg-white/70 text-xs font-medium uppercase tracking-[0.18em] text-[#a49c92]" key={i}>
                                Próximamente
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}