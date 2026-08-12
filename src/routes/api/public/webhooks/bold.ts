import { sendPaymentConfirmationEmail } from "#/lib/email/send-confirmation.server";
import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";


type BoldEvent = {
    type: string,
    data?: {
        metadata?: {reference?: string};
        payment_id: string;
        amount?:{total?: number, currency?: string};
        status?: string;
    };
};

function verifyBoldSignature(rawBody: string, signatureHeader: string | null, secret: string) {
    if(!signatureHeader) return false;
    const expected = createHash("sha256").update(rawBody + secret).digest("hex");
    try {
        const a = Buffer.from(signatureHeader.trim(), "hex");
        const b = Buffer.from(expected, "hex");
        
        if(a.length !== b.length) return false;
        return timingSafeEqual(a, b);
    } catch {
        return false;
    }
}

export const Route = createFileRoute("/api/public/webhooks/bold") ({
    server: {
        handlers: {
            POST: async ({request}) => {
                const secret = process.env.BOLD_SECRET_KEY;
                if (!secret) {
                    console.error("BOLD_SECRET_KEY not configured");
                    return new Response("Server not configured", {status: 500});
                }
                const raw = await request.text();
                const sig = request.headers.get("x-bold-signature");
                if (!verifyBoldSignature(raw, sig, secret)) {
                    return new Response("Invalid signature", {status: 401});
                }

                let payload: BoldEvent;
                try {
                    payload = JSON.parse(raw) as BoldEvent;
                } catch {
                    return new Response("Invalid JSON", {status: 400});
                }

                const reference = payload.data?.metadata?.reference;
                if(!reference) return new Response("Missing reference", {status: 400});

                const {supabaseAdmin} = await import("@/integrations/supabase/client.server");
                const {data: reg} = await supabaseAdmin
                    .from("registrations")
                    .select("*")
                    .eq("reference", reference)
                    .single();
                if(!reg) return new Response("Registration not found", {status: 404});
                if(reg.payment_status === "paid") return new Response("Alredy paid", {status: 200});

                const t = payload.type.toUpperCase();
                const newStatus = t.includes("APPROVED")
                    ? "paid"
                    : t.includes("REJECT") || t.includes("VOID") || t.includes("FAIL")
                        ? "failed"
                        : "pending";
                await supabaseAdmin
                    .from("registrations")
                    .update({
                        payment_status: newStatus,
                        provider_transaction_id: payload.data?.payment_id ?? null,
                    })
                    .eq("id", reg.id);
                if (newStatus === "paid") {
                    await sendPaymentConfirmationEmail({
                        to: reg.email,
                        fullName: reg.full_name,
                        plan: reg.plan,
                        amountUsd: Number(reg.amount_usd),
                        reference: reg.reference,
                        provider: "bold",
                    });
                }
                return new Response("ok", {status: 200});
            },
        },
    },
});