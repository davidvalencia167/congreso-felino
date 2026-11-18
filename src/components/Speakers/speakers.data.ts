import paludiImg from "../../assets/paludi.png";
import michaelImg from "../../assets/michael-villa.png";
import lugoImg from "../../assets/lugo.png";
import alejandraImg from "../../assets/mejia.png";
import bruzzoneImg from "../../assets/bruzzone.png";
import juanCarlosImg from "../../assets/Juan Carlos Montoya.png";

export type Speaker = {
    n: string;
    r: string;
    i: string;
    objectPosition?: string;
    country: string
    bio: string;
    topics: string[];
};

export const speakersData: Speaker[] = [
    {
        n: "Dr Alejandro Paludi",
        r: "Medico Veterinario",
        i: paludiImg,
        country: "Argentina",
        bio: "Médico Veterinario egresado de la Universidad Nacional de Buenos Aires, Con más de 20 años de experiencia exclusiva en clinica felina. Referente latinoamericano en medicina interna felina, ha dictado conferencias en más de 15 países y es autor de múltiples publicaciones cientificas sobre enfermedad renal crónica y endocrinopatias felinas.",
        topics: ["Enfermedad renal crónica", "Hipertiroidismo felino", "Diabetes felina"],
    },

    {
        n: "Dr Michaell Villa",
        r: "Medico Veterinario Zootecnista",
        i: michaelImg,
        country: "Mexico",
        bio: "Médico Veterinario Zootecnista egresado de la Universidad de Guadalajara (México), reconocido en Latinoamérica por su trayectoria en medicina y cirugia de pequeñas especies (perros y gatos), asi como por su labor como conferencista internacional y docente en educacion continua para médicos veterinarios.",
        topics: ["Medicina Interna", "Etología", "Oncología"],
    },

    {
        n: "Dr Rodrigo Lugo",
        r: "Medico Veterinario Zootecnista",
        i: lugoImg,
        country: "Colombia",
        bio: "Médico veterinario y zootecnista universidad del Tolima, especialista en laboratorio clínico veterinario UDCA, magister en clínica médico y quirúrgica de pequeños animales Universidad del Tolima, PhD (c) ciencias aplicadas universidad Santiago de Cali. Docente e investigador del área de inmunología, laboratorio clínico, dermatología animal.",
        topics: ["Inmunología", "Laboratorio Clínico", "Dermatología animal"],
    },

    {
        n: "Dra Alejandra Mejía",
        r: "Medica Veterinaria",
        i: alejandraImg,
        objectPosition: "center 0%",
        country: "Colombia",
        bio: "Médica Veterinaria con Maestría en Gestión de Ciencia, Tecnología e Innovación y especialización en Gerencia de Marketing. Con más de 16 años de experiencia en el desarrollo estratégico del sector veterinario, ha acompañado la transformación de clínicas, hospitales y empresas del ecosistema, articulando academia, industria y sector público para construir modelos de negocio sostenibles y de alto impacto.",
        topics: ["Gestion y Desarrollo de Negocios Veterinarios"],
    },

    {
        n: "Dr. Juan Carlos Montoya Gómez",
        r: "Medico Veterinario",
        i: juanCarlosImg,
        country: "Venezuela",
        bio: "médico veterinario egresado de la Universidad Centro Occidental “Lisandro Alvarado” (UCLA), en Cabudare, estado Lara, Venezuela, donde cursó estudios en el Decanato de Ciencias Veterinarias entre 2000 y 2007 y obtuvo su título en noviembre de 2007. En 2014 completó en la misma universidad la especialización en Medicina Veterinaria Preventiva, y posteriormente realizó un diplomado en Imagenología Veterinaria.",
        topics: ["diagnóstico por imagen mediante ultrasonido", "ecografía clínica de pequeñas especies"],
    },

    {
        n: "Dr Ernesto Rodolfo Bruzzone",
        r: "Medico Veterinario",
        i: bruzzoneImg,
        country: "Argentina",
        bio: "Médico Veterinario egresado de la Universidad Nacional de La Plata (UNLP) en 1984, con más de cuatro décadas de trayectoria profesional. Su formación y experiencia se han desarrollado principalmente en gastroenterología veterinaria, endoscopía, ecografía, diagnóstico radiológico y cirugía laparoscópica.",
        topics: ["Gastroenterología en caninos y felinos", "Endoscopía digestiva: indicaciones, diagnóstico y técnicas."]
    },

]