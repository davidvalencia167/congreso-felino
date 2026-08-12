

export interface ConfirmationEmailInput {
    to: string;
    fullName: string;
    plan: string;
    amountUsd: number;
    reference: string;
    provider: "bold";
}

export async function sendPaymentConfirmationEmail(input:ConfirmationEmailInput) {
    console.log("[email:confirmation]", {
        to: input.to,
        subject: `Confirmación de pago - IVEC 2026 (${input.reference})`,
        body: `Hola ${input.fullName}, tu pago de USD $${input.amountUsd.toFixed(
            2,
        )} para el pla ${input.plan} fue confirmado via ${input.provider}. Referencia: ${input.reference}.`,
    });
    return {ok: true as const};
}