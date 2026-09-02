

import heroBgCat from "../../assets/hero-bg-cat-new.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import paludiImg from "../../assets/paludi.png";
import paludiVideo from "../../assets/alejandro-paludi.mp4";
import michaelImg from "../../assets/michael-villa.png";
import michaelVideo from "../../assets/michael-villa.mp4";
import lugoImg from "../../assets/lugo.png";
import lugoVideo from "../../assets/rodrigo-lugo.mp4";
import alejandraImg from "../../assets/mejia.png";
import alejandraVideo from "../../assets/alejandra-vallejo.mp4";
import bruzzoneImg from "../../assets/bruzzone.png";
import bruzzoneVideo from "../../assets/ernesto-bruzzone.mp4";
import { useEffect, useState } from "react";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

type Slide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string };

const slides: Slide[] = [
  { type: "image", src: paludiImg, alt: "Dr Alejandro Paludi" },
  { type: "video", src: paludiVideo, poster:  paludiVideo},
  { type: "image", src: michaelImg, alt: "Dr Michael Villa" },
  { type: "video", src: michaelVideo, poster:  michaelVideo},
  { type: "image", src: lugoImg, alt: "Dr Rodrigo Lugo" },
  { type: "video", src: lugoVideo, poster:  lugoVideo},
  {type: "image", src: bruzzoneImg, alt: "Dr Ernesto Rodolfo Bruzzone"},
  {type: "video", src: bruzzoneVideo, poster: bruzzoneVideo},
  { type: "image", src: alejandraImg, alt: "Dr Alejandra Vallejo" },
  { type: "video", src: alejandraVideo, poster:  alejandraVideo},
];


export function Hero() {

    const { days, hours, minutes, seconds } = useCountdown(
        new Date("2027-02-25T08:00:00-04:00"),
    );

    return(
        <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28" style={{backgroundColor: "#000000"}}>
            <div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: `url(${heroBgCat})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6}}/>
            <div className="absolute inset-0 -z-0 pointer-events-none" style={{background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.95) 100%)"}}/>
            <div className="absolute inset-0 -z-0 pointer-events-none" style={{background: "radial-gradient(ellipse at 50% 0%, rgba(212,162,54,0.22), transparent 60%)"}}/>
            <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
                <span className="chip-gold !text-sm md:!text-base !px-6 !py-2.5 !tracking-[0.18em]" style={{border: "1px solid rgba(212,162,54,0.55)", boxShadow: "0 8px 30px -10px rgba(212,162,54,0.45)",}}>
                    25-26 Febrero · 2027
                </span>
                <h1 className="mt-6 font-display font-bold leading-[0.95] text-balance">
                    <span className="block text-5xl md:text-7xl lg:text-8xl" style={{color: "#E8704E"}}>
                        Congreso
                    </span>
                    <span className="text-gold-gradient mt-3 block italic text-3xl md:text-5xl lg:text-6xl">
                        Veterinario
                    </span>
                    <span className="text-gold-gradient block text-6xl md:text-8xl lg:text-9xl">
                        Felino
                    </span>
                    
                </h1>

                <p className="mt-8 max-w-2xl mx-auto text-lg" style={{color: "rgba(255, 255, 255, 0.78)"}}>
                    Dos dias dedicados por completo a la medicina felina.
                    Charlas, talleres y networking con los referentes más reconocidos de la región.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                    <a href="#inscripcion" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{backgroundColor: "#E8704E", boxShadow: "0 12px 40px -10px rgba(232, 112, 78, 0.55)"}}>
                        Reserva tu cupo
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </a>

                    <a href="#programa" className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-colors" style={{border: "1px solid rgba(212, 162, 54, 0.4)", color:"#e8c163"}}>
                        Ver programa
                    </a>
                </div>

                <div className="relative mx-auto mt-14 max-w-4xl px-8 md:px-12">
                    <div className="absolute -inset-6 -z-0 rounded-[2.5rem] blur-3xl opacity-50 pointer-events-none" style={{background: "radial-gradient(circle at 50% 50%, rgba(212,162,54,0.45), transparent 70%)"}}/>
                    <Carousel opts={{loop: true}} className="relative">
                    <CarouselContent>
                        {slides.map((slide, idx) => (
                            <CarouselItem key={idx}>
                            <div
                                className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-black"
                                style={{
                                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)",
                                border: "1px solid rgba(212,162,54,0.25)",
                                }}
                            >
                                {slide.type === "image" ? (
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className="absolute inset-0 h-full w-full object-contain"
                                />
                                ) : (
                                <video
                                    className="absolute inset-0 h-full w-full object-contain"
                                    poster={slide.poster}
                                    controls
                                    playsInline
                                    preload="metadata"
                                >
                                    <source src={slide.src} type="video/mp4" />
                                </video>
                                )}
                                <div
                                className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                                style={{
                                    backgroundColor: "rgba(0,0,0,0.55)",
                                    color: "#e8c163",
                                    border: "1px solid rgba(212,162,54,0.35)",
                                }}
                                >
                                {slide.type === "image" ? "Foto" : "Video"} · {idx + 1}/{slides.length}
                                </div>
                            </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 md:-left-6 bg-black/60 border-[rgba(212,162,54,0.4)] text-[#e8c163] hover:bg-black/80 hover:text-[#e8c163]" />
                    <CarouselNext className="right-0 md:-right-6 bg-black/60 border-[rgba(212,162,54,0.4)] text-[#e8c163] hover:bg-black/80 hover:text-[#e8c163]" />
                    </Carousel>
                </div>

                <div className="mt-12">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{color: "rgba(232,193,99,0.8)"}}>
                        Faltan
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-3 max-w-lg mx-auto">
                            {[
                                {v: days, l: "Días"},
                                {v: hours, l: "Horas"},
                                {v: minutes, l: "Min"},
                                {v: seconds, l: "Seg"}
                            ].map((u) => (
                                <div key={u.l} className="rounded-2xl px-3 py-4 text-center" style={{backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,162,54,0.25)", backdropFilter: "blur(8px)"}}>
                                    <div className="text-gold-gradient font-display text-3xl md:text-4xl font-bold tabular-nums">
                                        {String(u.v).padStart(2, "0")}
                                    </div>
                                    <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: "rgba(255,255,255,0.55)"}}>
                                        {u.l}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}