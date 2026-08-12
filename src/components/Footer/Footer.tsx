
import logo from "../../assets/logo-ivec.jpeg";

export function Footer() {
    return(
        <footer className="section-cream border-t border-border py-14">
            <div className="mx-auto max-w-7xl px-5 md:px-8 grid gap-10 md:grid-cols-4">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="IVEC" className="h-12 w-12 rounded-full" />
                        <div>
                            <div className="font-display font-bold">IVEC</div>
                            <div className="text-xs text-muted-foreground">Congreso Felino</div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Instituto Veterinario de Educacion Continua · Barquisimeto, Venezuela.
                    </p>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Navegación</div>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#congreso" className="hover:text-terracotta">El Congreso</a></li>
                        <li><a href="#ponentes" className="hover:text-terracotta">Ponentes</a></li>
                        <li><a href="#programa" className="hover:text-terracotta">Programa</a></li>
                        <li><a href="#inscripcion" className="hover:text-terracotta">Inscripción</a></li>
                    </ul>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Contacto</div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li>+58 422-1462613</li>
                        <li>institutoivec2025@gmail.com</li>
                        <li>@congresodegatosvenezuela</li>
                    </ul>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Newsletter</div>
                    <p className="mt-4 text-sm text-muted-foreground">Recibe novedades del congreso.</p>
                    <form className="mt-3 flex gap-2">
                        <input type="email" placeholder="tu@email.com" className="flex-1 rounded-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta" />
                        <button className="rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-terracota-deep">
                            OK
                        </button>
                    </form>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-5 md:px-8 mt-10 pt-6 border-t border-border flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                <span>© 2026 IVEC · Congreso Felino. Todos los derechos reservados.</span>
            </div>
        </footer>
    );
}