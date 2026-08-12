import { useState } from "react";
import { PaymentPanel, type PlanName } from "../PaymentPanel/PaymentPanel";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScYkI_vQfJ-oleZcOMO6r5i1UNLrGi-H7g8z-_QmiMtDxNeYQ/viewform?embedded=true";
const GOOGLE_FORM_SHARE_URL = "https://docs.google.com/forms/d/e/1FAIpQLScYkI_vQfJ-oleZcOMO6r5i1UNLrGi-H7g8z-_QmiMtDxNeYQ/viewform";

type PlanDef = { n: PlanName; p: string; amount: number; f: string[]; featured?: boolean};

const plans: PlanDef[] = [
    {
        n: "Estudiante",
        p: "$100",
        amount: 100,
        f: ["Acceso a las 2 salas", "Certificación por la UCLA", "Muestra Comercial", "Inauguración y Clausura"],
    },

    {
        n: "Medico Veterinario",
        p: "$130",
        amount: 130,
        f: ["Acceso a las 2 salas", "Certificación por la UCLA", "Muestra Comercial", "Inauguración y Clausura"],
        featured: true,
    },

    {
        n: "Muestra Comercial",
        p: "$50",
        amount: 50,
        f: ["Acceso a las 2 salas", "Certificación por la UCLA", "Muestra Comercial", "Inauguración y Clausura"],
    },
];


export function Princing() {

    const [openFor, setOpenFor] = useState<PlanDef | null>(null);
    const [tab, setTab] = useState<"form" | "pay">("form");

    const openModal = (pl: PlanDef) => {
        setOpenFor(pl);
        setTab("form");
    };
    const closeModal = () => setOpenFor(null);

    return(
        <section id="inscripcion" className="bg-background py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
                <span className="chip">Inscripción</span>
                <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                    Asegura tu <span className="italic text-terracotta">cupo</span>.
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    Precios early bird disponibles hasta el 30 de septiembre. Cupos limitados.
                </p>


                <div className="mt-14 grid gap-6 md:grid-cols-3 text-left">
                    {
                        plans.map((pl) => (
                            <div key={pl.n} className={`relative rounded-3xl p-8 border transition-all ${pl.featured ? "bg-cocoa text-cream border-terracotta shadow-warm scale-[1.03]" : "bg-peach-soft border-border hover:shadow-soft"}`}>
                                {
                                    pl.featured && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                                            Recomendado
                                        </div>
                                    )}
                                    <h3 className="font-display text-xl font-semibold">{pl.n}</h3>
                                    <div className="mt-4 flex items-baseline gap-1">
                                        <span className="font-display text-5xl font-bold">{pl.p}</span>
                                        <span className={pl.featured ? "text-cream/70" : "text-muted-foreground"}>USD</span>
                                    </div>
                                    <ul className={`mt-6 space-y-3 text-sm ${pl.featured ? "text-cream/90" : "text-foreground/80"}`}>
                                        {
                                            pl.f.map((x) => (
                                                <li key={x} className="flex items-start gap-2">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-terracotta mt-0.5">
                                                        <path d="M5 12l5 5L20 7" />
                                                    </svg>
                                                    {x}
                                                </li>
                                            ))}
                                    </ul>
                                    <button type="button" onClick={() => openModal(pl)} className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${pl.featured ? "bg-terracotta text-primary-foreground hover:bg-terracotta-deep" : "bg-background border border-border hover:bg-peach"}`}>
                                            Inscribirme
                                    </button>
                            </div>
                        ))}
                </div>
            </div>

            {
                openFor && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={closeModal} role="dialog" aria-modal= "true">
                        <div className="relative w-full max-w-3xl h-[88vh] rounded-2xl overflow-hidden bg-card border border-border shadow-warm flex flex-col" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background gap-4">
                                <div className="flex gap-1 rounded-full bg-peach-soft p-1">
                                    <button onClick={() => setTab("form")} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${tab === "form" ? "bg-terracotta text-primary-foreground" : "text-foreground/70"}`}>
                                        1. Datos
                                    </button>
                                    <button onClick={() => setTab("pay")} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${tab === "pay" ? "bg-terracotta text-primary-foreground" : "text-foreground/70"}`}>
                                        2. Pago
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    {
                                        tab === "form" && (
                                            <a href={GOOGLE_FORM_SHARE_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-terracotta hover:underline hidden sm:inline">
                                                Abrir formulario
                                            </a>
                                    )}
                                    <button type="button" onClick={closeModal} className="rounded-full w-8 h-8 inline-flex items-center justify-center hover:bg-peach text-foreground" aria-label="Cerrar">✕</button>
                                </div>
                            </div>

                            {tab === "form" ? (
                                <div className="flex flex-col flex-1">
                                    <iframe
                                        src={GOOGLE_FORM_URL}
                                        title="Formulario de inscripción Congreso Felino IVEC 2027"
                                        className="w-full flex-1 bg-white"
                                    />
                                <div className="px-5 py-3 border-t border-border bg-background flex justify-end">
                                    <button
                                        onClick={() => setTab("pay")}
                                        className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-terracotta-deep"
                                        >
                                        Continuar al pago →
                                    </button>
                                </div>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto">
                                    <PaymentPanel plan={openFor.n} amountUsd={openFor.amount} onClose={closeModal} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </section>
    );
}