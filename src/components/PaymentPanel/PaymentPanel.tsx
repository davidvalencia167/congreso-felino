
import { getPaymentConfig } from "#/lib/payments.functions";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export type PlanName = "Estudiante" | "Medico Veterinario" | "Muestra Comercial";

interface Props {
    plan: PlanName;
    amountUsd: number;
    onClose: () => void;
}

type Step = "buyer" | "method" | "success";

interface BoldIntent {
    reference: string;
    amount: number;
    currency: string;
    integritySignature: string;
}

export function PaymentPanel({plan, amountUsd, onClose}: Props) {
    const [step, setStep] = useState<Step>("buyer");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [reference, setReference] = useState<string | null>(null);
    const [boldIntent, setBoldIntent] = useState<BoldIntent | null>(null);
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState<{boldIdentityKey: string; usdToCop: number;} | null>(null);
    const boldContainerRef = useRef<HTMLDivElement>(null);

    const fetchConfig = useServerFn(getPaymentConfig);

    useEffect(() => {
        fetchConfig().then(setConfig).catch(() => setConfig(null));
    }, [fetchConfig]);

    const canContinue = useMemo(
        () => fullName.trim().length >= 2 && /\S+@\S+\.\S+/.test(email),
        [fullName, email],
    );

    // Inject Bold Payment Button
    useEffect(() => {
        if (step !== "method" || !boldIntent || !config?.boldIdentityKey) return;
        const container = boldContainerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://checkout.bold.co/library/boldPaymentButton.js";
        script.setAttribute("data-bold-button", "");
        script.setAttribute("data-api-key", config.boldIdentityKey);
        script.setAttribute("data-amount", String(boldIntent.amount));
        script.setAttribute("data-currency", boldIntent.currency);
        script.setAttribute("data-order-id", boldIntent.reference);
        script.setAttribute("data-integrity-signature", boldIntent.integritySignature);
        script.setAttribute("data-description", `IVEC 2026 · Plan ${plan}`);

        script.setAttribute(
            "data-redirection-url",
            `${window.location.origin}/#inscripcion`,
        );
        script.setAttribute(
            "data-customer-data",
            JSON.stringify({email, fullName}),
        );
        container.appendChild(script);
    }, [step, boldIntent, config, plan, email, fullName]);

    async function createIntent() {
        setLoading(true);
        try {
            const res = await fetch("/api/public/payments/create-intent", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({plan, fullName, email, amountUsd}),
            });
            if (!res.ok) throw new Error("No se pudo iniciar el pago");
            const data = (await res.json()) as {
                reference: string;
                bold?: {amount: number, currency: string; integritySignature: string};
            };
            setReference(data.reference);
            if (data.bold) {
                setBoldIntent({
                    reference: data.reference,
                    amount: data.bold.amount,
                    currency: data.bold.currency,
                    integritySignature: data.bold.integritySignature,
                });
            }
            setStep("method");
        } catch(e) {
            toast.error(e instanceof Error ? e.message : "Error");
        } finally {
            setLoading(false);
        }
    }

    if (step === "success") {
        return(
            <div className="p-8 text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-terracotta/20 grid place-items-center text-terracotta text-3xl">
                    ✓
                </div>
                <h4 className="mt-4 font-display text-2xl font-bold text-foreground">
                    ¡Pago exitoso!
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                    Enviamos un correo de confirmación a <b>{email}</b> con tu referencia{" "}
                    <b>{reference}</b>
                </p>
                <button onClick={onClose} className="mt-6 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-terracotta-deep">
                    Cerrar
                </button>
            </div>
        )
    }

    return(
        <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Plan seleccionado</p>
                    <p className="font-display text-xl font-semibold text-foreground">
                        {plan} · <span className="text-terracotta">USD ${amountUsd.toFixed(2)}</span>
                    </p>
                </div>
            </div>

            {
                step === "buyer" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                                Nombre completo
                            </label>
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="María Pérez" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-terracotta"/>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                                Correo electrónico
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-terracotta"/>
                            <p className="mt-1.5 text-[11px] text-muted-foreground">
                                Enviaremos el comprobante y tu certificado a este correo.
                            </p>
                        </div>

                        <div className="pt-2">
                            <button disabled={!canContinue || loading} onClick={() => createIntent()} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-50">
                                Pagar con Bold
                            </button>
                        </div>
                    </div>
                )}

                {
                    step === "method" && (
                        <div className="text-center">
                            <p className="mb-4 text-sm text-muted-foreground">
                                Pago procesado por <b>Bold</b>. Acepta tarjetas, PSE, Nequi,
                                Bancolombia y más. El monto en USD se convierte automaticamente a
                                COP para el cobro.
                            </p>
                            {
                                boldIntent && config?.boldIdentityKey ? (
                                    <div ref={boldContainerRef} className="flex justify-center" />
                                ) : (
                                    <p className="text-sm text-destructive">
                                        Bold no está configurado todavia.
                                    </p>
                                )}

                                <div>
                                    <button onClick={() => setStep("buyer")} className="mt-4 text-xs text-muted-foreground hover:text-terracotta">
                                        ← Volver
                                    </button>
                                </div>
                        </div>
                    )}
        </div>
    );
}