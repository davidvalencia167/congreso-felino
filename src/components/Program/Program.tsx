import { useState } from "react";
import { program, type Slot } from "./program.data";

function SalaColumn({title, slots}: {title: string; slots: Slot[]}) {
    return(
        <div>
            <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-8 items-center rounded-full bg-terracotta px-4 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                    {title}
                </span>
                <span className="h-px flex-1 bg-border"/>
            </div>
            <div className="space-y-3">
                {slots.map((item, idx) => (
                    <div key={`${title}-${idx}-${item.title}`} className="flex items-start gap-4 rounded-2xl bg-background border border-border px-4 py-3 hover:shadow-warm transition-all">
                        <div className="shrink-0 w-24 text-terracotta-deep font-display font-bold text-sm leading-tight">
                            {item.t}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm leading-snug">{item.title}</div>
                            {item.sub && <div className="mt-0.5 text-xs text-muted-foreground">{item.sub}</div>}
                        </div>
                        {
                            item.tag && (
                                <span className="hidden sm:inline-flex shrink-0 rounded-full bg-peach px-2.5 py-1 text-[10px] font-semibold text-terracotta-deep">
                                    {item.tag}
                                </span>
                            )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function Program() {
    const [day, setDay] = useState<"day1" | "day2">("day1");
    const current = program[day];
    return(
        <section id="programa" className="section-peach py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="text-center">
                    <span className="chip">Programa</span>
                    <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                        Dos días de <span className="italic text-terracotta">ciencia felina</span>
                    </h2>

                    <div className="mt-10 inline-flex p-1.5 rounded-full bg-background border border-border shadow-soft">
                        {([
                            ["day1", "25 Feb · Día 1"],
                            ["day2", "26 Feb · Día 2"],
                        ]as const).map(([k, l]) => (
                            <button key={k} onClick={() => setDay(k)} className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${day === k ? "bg-terracotta text-primary-foreground shadow-warm" : "text-foreground/70 hover:text-foreground"} `}>
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-2">
                    <SalaColumn title="Sala 1" slots={current.sala1}/>
                    <SalaColumn title="Sala 2" slots={current.sala2}/>
                </div>
            </div>
        </section>
    );
}