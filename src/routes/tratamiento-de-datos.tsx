import { Navbar } from "#/components/Navbar/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tratamiento-de-datos")({
  head: () => ({
    meta: [
      { title: "Tratamiento de Datos — IVEC Congreso Veterinario Felino" },
      {
        name: "description",
        content:
          "Política de tratamiento de datos personales del Congreso Veterinario Felino IVEC: qué datos recolectamos, para qué los usamos y cómo ejercer tus derechos.",
      },
      { property: "og:title", content: "Tratamiento de Datos — IVEC Congreso Veterinario Felino" },
      {
        property: "og:description",
        content:
          "Conoce cómo tratamos y protegemos tus datos personales al inscribirte al congreso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TratamientoDeDatos,
});

const sections = [
  {
    title: "1. Responsable del tratamiento",
    body: `El responsable del tratamiento de tus datos personales es el Instituto Veterinario de Educación Continua (IVEC), organizador del Congreso Veterinario Felino, con sede en Barquisimeto, estado Lara, Venezuela. Puedes contactarnos a través del correo hola@ivec.ve o del teléfono +58 251 000 0000.`,
  },
  {
    title: "2. Datos que recolectamos",
    body: `Al inscribirte al congreso recolectamos los siguientes datos: nombre y apellido, cédula de identidad, correo electrónico, número de teléfono, profesión o condición (estudiante o médico veterinario) y, cuando aplica, datos de tu universidad o colegio profesional. Los datos de pago (tarjeta, cuenta o pago móvil) son procesados directamente por la pasarela de pago Bold y no son almacenados por nosotros.`,
  },
  {
    title: "3. Finalidad del tratamiento",
    body: `Usamos tus datos únicamente para: (a) gestionar tu inscripción y acreditación al congreso; (b) confirmar tu pago y enviarte el comprobante correspondiente; (c) enviarte comunicaciones relacionadas con el evento (cambios de programa, recordatorios, material); (d) emitir tu certificado de participación; y (e) cumplir con obligaciones contables y fiscales derivadas de tu compra.`,
  },
  {
    title: "4. Base legal",
    body: `El tratamiento se realiza con tu consentimiento expreso, que otorgas al diligenciar el formulario de inscripción, de conformidad con el artículo 28 de la Constitución de la República Bolivariana de Venezuela (Habeas Data) y la normativa aplicable en materia de protección de datos personales.`,
  },
  {
    title: "5. Terceros con quienes compartimos datos",
    body: `Solo compartimos tus datos con los proveedores necesarios para operar el evento: Bold (procesamiento de pagos), Google (formulario de inscripción) y nuestro proveedor de correo electrónico (envío de confirmaciones). Nunca vendemos ni cedemos tus datos a terceros con fines comerciales.`,
  },
  {
    title: "6. Conservación de los datos",
    body: `Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Una vez cumplidas, los datos serán eliminados o anonimizados de forma segura.`,
  },
  {
    title: "7. Tus derechos",
    body: `Como titular de los datos tienes derecho a: conocer, acceder, actualizar, rectificar y suprimir tus datos personales, así como revocar el consentimiento otorgado. Para ejercer cualquiera de estos derechos escríbenos a hola@ivec.ve indicando tu nombre completo y la solicitud que deseas realizar. Responderemos en un plazo máximo de quince (15) días hábiles.`,
  },
  {
    title: "8. Seguridad",
    body: `Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, pérdida, alteración o divulgación. El acceso a la información está restringido al personal que la necesita para la organización del evento.`,
  },
  {
    title: "9. Cambios a esta política",
    body: `Podemos actualizar esta política cuando sea necesario. Cualquier cambio será publicado en esta misma página con su fecha de actualización. Te recomendamos revisarla periódicamente.`,
  },
];

function TratamientoDeDatos() {
    return(
        <div className="min-h-screen bg-background">
            <Navbar/>
            <main className="pt-28 pb-20">
                <div className="mx-auto max-w-3xl px-5 md:px-8">
                    <span className="chip">Legal</span>
                    <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
                        Política de <span className="text-terracotta">Tratamiento de Datos</span>
                    </h1>
                    <p className="mt-4 text-muted-foreground">
                        Última actualización: noviembre de 2026. En IVEC nos tomamos en serio la protección de tu información personal. Aquí te explicamos, de forma clara, qué datos recolectamos, para qué los usamos y cómo puedes ejercer tus derechos.
                    </p>

                    <div className="mt-10 space-y-6">
                        {
                            sections.map((s) => (
                                <section key={s.title} className="rounded-2xl border border-border bg-card p-6 md:p-7">
                                    <h2 className="font-display text-xl font-semibold text-foreground">
                                        {s.title}
                                    </h2>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                        {s.body}
                                    </p>
                                </section>
                            ))}
                    </div>

                    <div className="mt-10 rounded-2xl border border-terracotta/30 bg-terracotta/10 p-6 md:p-7">
                        <h2 className="font-display text-xl font-semibold">¿Tienes dudas?</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Escríbenos a <span className="text-terracotta">institutoivec2025@gmail.com</span> o llamanos al +58 422-1462613
                        </p>
                        <Link to="/" className="mt-5 inline-flex items-center rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm hover:bg-terracotta-deep transition-colors">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
