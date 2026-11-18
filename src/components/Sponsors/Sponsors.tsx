
import { ExternalLink } from "lucide-react";
import König from "../../assets/König.jpg";
import Rapivet from "../../assets/RapiVet.png";
import Purina from "../../assets/purina.png";
import GoldenVets from "../../assets/goldenvets.jpg";
import Agriquimvet from "../../assets/Agriquimvet.jpg";
import HDC from "../../assets/HDC.jpg";
import JaimeCastrillo from "../../assets/JC.jpg";
import Glovetz from "../../assets/Glovetz.jpeg";
import Innovett from "../../assets/innovett.jpeg";

type Sponsor = {
    name: string;
    url?: string;
    logo?: string;
};

const SPONSORS: Sponsor[] = [
    { name: "Laboratorios König", url: "https://koniglab.com", logo: König },
    { name: "Rapivet Pharma", url: "https://rapivet.com", logo: Rapivet },
    { name: "Purina Pro Plan", url: "https://www.purina.com/pro-plan", logo: Purina },
    { name: "Golden Vets", logo: GoldenVets },
    { name: "Agriquimvet", url: "https://www.agriquimvet.com", logo: Agriquimvet },
    { name: "HDC", logo: HDC },
    { name: "JC", logo: JaimeCastrillo },
    { name: "Glovetz", logo: Glovetz },
    { name: "Innovett animal care", url: "https://innovett.com/", logo: Innovett }, 
]

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  if (sponsor.logo) {
    return (
      <img
        src={sponsor.logo}
        alt={`Logo de ${sponsor.name}`}
        loading="lazy"
        className="max-h-20 max-w-52 object-contain"
      />
    );
  }
  return (
    <span className="font-display text-lg font-bold tracking-wide text-[#3E2015]">
      {sponsor.name}
    </span>
  );
}

export function Sponsors() {
    return(
        <section id="patrocinadores" className="bg-[#f7f5f1] py-20 md:py-24 text-[#1a1a1a]">
            <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
                <span className="inline-flex items-center rounded-full bg-[#e8704e]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b4522f]">
                    Patrocinadores
                </span>
                <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance text-[#1a1a1a]">
                    Marcas que hacen posible el <span className="italic text-[#c05a34]">Congreso Veterinario Felino</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[#5a5550]">
                    Estas empresas y aliados acompañan el congreso. Haz clic en cada una para conocer más sobre ellas.
                </p>

                <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
                    {
                        SPONSORS.map((sponsor) => {
                            const card = (
                                <>
                                <div className="flex h-20 items-center justify-center">
                                    <SponsorLogo sponsor={sponsor}/>
                                </div>
                                <span className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a49c92]">
                                    {sponsor.name}
                                    {sponsor.url && <ExternalLink className="h-3 w-3" aria-hidden="true" />}
                                </span>
                                </>
                            );

                            const className = "group flex flex-col justify-center rounded-2xl border border-[#e6e0d6] bg-white/80 p-5 transition-all hover:-translate-y-1 hover:border-[#D4A236]/60 hover:shadow-lg";

                            return sponsor.url ? (
                                <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer" className={className} aria-label={`Visitar el sitio oficial de ${sponsor.name}`}>{card}</a>
                            ) : (
                                <div key={sponsor.name} className={className}>
                                    {card}
                                </div>
                            );
                        })}
                </div>

                <a href="#inscripcion" className="mt-10 inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c05a34]">
                    Quiero patrocinar
                </a>
            </div>
        </section>        
    );
}