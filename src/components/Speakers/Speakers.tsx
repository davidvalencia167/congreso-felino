import { useState } from "react";
import type { Speaker } from "./speakers.data";


export function Speakers() {
    const [active, setActive] = useState<Speaker | null>(null);
    return(
        <section id="ponentes" className="bg-background py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <span className="chip">Ponentes</span>
                        <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance max-w-xl">
                            Referentes de la {" "}
                            <span className="italic text-terracotta">medicina felina</span>.
                        </h2>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}