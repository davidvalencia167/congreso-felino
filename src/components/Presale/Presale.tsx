import { PaymentPanel, type PlanName } from "../PaymentPanel/PaymentPanel";
import catBg from "../../assets/hero-bg-cat-new.jpg";
import { useState } from "react";

const DEADLINE = "30 de septiembre";
const WHATSAPP = "+58 424-000-0000";

type PresalePlan = {
    n: PlanName;
    label: string;
    price: string;
    before: string;
    amount: number;
};

const plans: PresalePlan[] = [
    {n: "Estudiante", label: "Estudiantes", price: "60", before: "80", amount: 60},
    {n: "Medico Veterinario", label: "Medico Veterinario", price: "100", before: "130", amount: 100},
];

export function Presale() {
    const [openFor, setOpenFor] = useState<PresalePlan | null>(null);

    return(
        <section id="preventa" className="relative overflow-hidden py-24 md:py-32">
            <img src={catBg} alt="Gato observando de cerca" className="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy"/>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background"/>
            <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
                <span className="chip-gold">Cupos limitados</span>
                <h2 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95]">
                    <span className="text-terracotta">Congreso Veterinario Felino</span>
                    <br />
                    <span className="text-gold-gradient">PREVENTA</span>
                </h2>
                <p className="mt-5 text-muted-foreground">
                    Aprovecha las tarifas de preventa hasta el {" "}
                    <strong className="text-xl text-foreground">{DEADLINE}</strong>
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                    {
                        plans.map((pl) => (
                            <div key={pl.n} className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-8 card-gold-hover">
                                <p className="font-display text-lg font-semibold uppercase tracking-wide text-terracotta">
                                    {pl.label}
                                </p>
                                <div className="mt-5 flex items-end justify-center gap-2">
                                    <span className="font-display text-6xl md:text-7xl font-bold text-gold-gradient">
                                        {pl.price}
                                    </span>
                                    <span className="mb-2 text-sm font-semibold text-muted-foreground">USD</span>
                                </div>
                                <p className="mt-2 text-xl text-muted-foreground">
                                    antes <span className="line-through">{pl.before}</span>
                                </p>
                                <button type="button" onClick={() => setOpenFor(pl)} className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta-deep">
                                    Pagar preventa
                                </button>
                            </div>
                        ))}
                </div>
                <p className="mt-10 text-sm text-muted-foreground">
                    Para pagos en bolívares o dudas, escríbenos al {" "}
                    <strong className="text-foreground">{WHATSAPP}</strong>
                </p>
            </div>

            {
                openFor && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setOpenFor(null)}>
                        <div className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-warm" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b border-border px-5 py-3">
                                <p className="text-sm font-semibold">Preventa · {openFor.n}</p>
                                <button type="button" onClick={() => setOpenFor(null)} aria-label="Cerrar" className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-peach">
                                    ✕
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <PaymentPanel plan={openFor.n} amountUsd={openFor.amount} onClose={() => setOpenFor(null)}/>
                            </div>
                        </div>
                    </div>
                )}
        </section>
    );
}