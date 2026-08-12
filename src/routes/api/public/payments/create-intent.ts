import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";
import {z} from "zod";

const bodySchema = z.object({
    plan: z.enum(["Estudiante", "Medico Veterinario", "Muestra Comercial"]),
    fullName: z.string().min(2).max(120),
    email: z.string().email().max(160),
    amountUsd: z.number().positive().max(1000),
});

function makeReference() {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    const t = Date.now().toString(36).toUpperCase();
    return `IVEC-${t}-${rand}`;
}

// Bold integrity signature: SHA256(orderId + amount + currency + secretKey)
function boldSignature(orderId: string, amountCents: number, currency: string, secret: string) {
    return createHash("sha256")
        .update(`${orderId}${amountCents}${currency}${secret}`)
        .digest("hex")
}

export const Route = createFileRoute("/api/public/payments/create-intent") ({
    server: {
        handlers: {
            POST: async ({request}) => {
                let json: unknown;
                try {
                    json = await request.json();
                } catch {
                    return Response.json({error: "Invalid JSON"}, {status: 400});
                }
                const parsed = bodySchema.safeParse(json);
                if(!parsed.success) {
                    return Response.json({error: "Invalid input", details: parsed.error.flatten()}, {status: 400});
                }
                const {supabaseAdmin} = await import("@/integrations/supabase/client.server");
                const reference = makeReference();
                const {data, error} = await supabaseAdmin
                    .from("registrations")
                    .insert({
                        plan: parsed.data.plan,
                        full_name: parsed.data.fullName,
                        email: parsed.data.email,
                        amount_usd: parsed.data.amountUsd,
                        currency: "USD",
                        payment_method: "bold",
                        payment_status: "pending",
                        reference,
                    })
                    .select("id, reference")
                    .single();
                if (error) {
                    console.error("create-intents error", error);
                    return Response.json({error: "DB error"}, {status: 500});
                }

                const usdToCop = Number(process.env.USD_TO_COP ?? 4000);
                const amountCop = Math.round(parsed.data.amountUsd * usdToCop);
                const secret = process.env.BOLD_SECRET_KEY;
                if(!secret) {
                    return Response.json({error: "Bold not configured"}, {status: 500});
                }
                const signature = boldSignature(reference, amountCop, "COP", secret);
                return Response.json({
                    id: data.id,
                    reference: data.reference,
                    bold: {
                        amount: amountCop,
                        currency: "COP",
                        integritySignature: signature
                    },
                });
            },
        },
    },
});