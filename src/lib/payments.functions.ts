import { createServerFn } from "@tanstack/react-start";


export const getPaymentConfig = createServerFn({method: "GET"}).handler(async () => {
    return{
        boldIdentityKey: process.env.BOLD_IDENTITY_KEY ?? "",
        // Approximate USD -> COP conversion (Bold charges in COP).
        usdToCop: Number(process.env.USD_TO_COP ?? 4000),
    };
});