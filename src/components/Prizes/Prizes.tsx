
import viajeMargarita from "../../assets/Promoción tropical Isla de Margarita.png";
import televisorImg from "../../assets/Televisor moderno con ondas abstractas.png";
import motoImg from "../../assets/Motocicleta todoterreno con brillo rojo.png";

const attendancePrizes = [
    {
        name: "Hospedaje por 3 días / 2 noches ",
        description: "Hospedaje para 2 personas, 3 días / 2 noches en la perla del Caribe.",
        image: viajeMargarita,
        alt: "Viaje a Isla de Margarita — hospedaje para 2 personas"
    },

    {
        name: "Televisor Smart TV 43“ ",
        description: "Un televisor moderno de gran pantalla para disfrutar en casa.",
        image: televisorImg,
        alt: "Televisor moderno de pantalla grande"
    },
];


export function Prizes() {
    return(
       <section id="premios" className="py-24 md:py-28" style={{ backgroundColor: "#121212" }}>
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="chip-gold">Premios y sorteo</span>
                    <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-balance">
                        Asiste y gana con el <span className="text-gold-gradient italic">congreso</span>
                    </h2>
                    <p className="mt-5 text-muted-foreground">
                        Todos los asistentes participan. Estos son los premios que puedes llevarte durante los dos días del evento.
                    </p>
                </div>

                <div className="mt-14">
                    <article className="card-gold-hover relative mx-auto max-w-4xl overflow-hidden rounded-4xl border bg-card" style={{ borderColor: "rgba(212,162,54,0.45)" }}>
                        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,162,54,0.16), transparent 65%)" }}/>
                        <div className="relative grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
                            <div className="relative">
                                <img src={motoImg} alt="Motocicleta todoterreno roja — premio del gran sorteo" className="mx-auto w-full max-w-sm object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]" />
                            </div>

                            <div className="text-center md:text-left">
                                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ backgroundColor: "rgba(232,112,78,0.15)", color: "#E8704E", border: "1px solid rgba(232,112,78,0.45)", }}>
                                    Gran sorteo
                                </span>
                                <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold">Motocicleta todoterreno</h3>
                                <p className="mt-3 text-muted-foreground">
                                    El premio mayor del congreso. Por compras de 200 USD participas automáticamente en el sorteo de esta motocicleta.
                                </p>
                                <p className="mt-4 text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(232,193,99,0.85)" }}>
                                    Sorteo exclusivo entre asistentes
                                </p>
                            </div>
                        </div>
                    </article>
                </div>


                <div className="mt-10">
                    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Premios por asistencia
                    </p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
                        {
                            attendancePrizes.map((p) => (
                                <article key={p.name} className="card-gold-hover overflow-hidden rounded-2xl border border-border bg-card">
                                    <div className="flex items-center justify-center p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                                        <img src={p.image} alt={p.alt} className="h-48 w-full object-contain md:h-56" />
                                    </div>

                                    <div className="p-6">
                                        <span className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ backgroundColor: "rgba(212,162,54,0.12)", color: "#e8c163", border: "1px solid rgba(212,162,54,0.35)", }}>
                                            Premio por asistencia
                                        </span>
                                        <h3 className="mt-3 font-display text-2xl font-semibold">{p.name}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                                    </div>
                                </article>
                            ))}
                    </div>
                </div>

                <p className="mt-10 text-center text-xs text-muted-foreground">
                    La mecánica del sorteo y la entrega de premios se anunciarán durante el evento.
                </p>
            </div>
       </section> 
    );
}