import mallImage from "../../assets/mall_image.jpg"
import avenueImage from "../../assets/avenue_image.jpg"
import obeliskImage from "../../assets/obelisk_image.jpg"
import parkImage from "../../assets/park_image.jpg"
import cathedralImage from "../../assets/cathedral_image.jpg"
import airportImage from "../../assets/airport_image.jpg"

export interface NearbyPlace {
    name: string;
    category: string;
    distance: string;
    description: string;
    image: string;
}

export const nearbyPlaces: NearbyPlace[] = [
    {
        name: "Centro Comercial Las Trinitarias",
        category: "Compras",
        distance: "A 1 min · contiguo al hotel",
        description: "El centro comercial más grande de la ciudad: tiendas, cines, farmacia y zona de comidas.",
        image: mallImage,
    },

    {
        name: "Av. Los Leones",
        category: "Gastronomia",
        distance: "A 2 min caminando",
        description: "Principal corredor gastronómico de Barquisimeto, con restaurantes, cafés y panaderías.",
        image: avenueImage,
    },

    {
        name: "Obelisco de Barquisimeto",
        category: "Sitio icónico",
        distance: "A 10 min en auto",
        description: "El monumento más representativo de la ciudad y su mirador panorámico.",
        image: obeliskImage,
    },

    {
        name: "Parque del Este José María Ochoa Pile",
        category: "Naturaleza",
        distance: "A 12 min en auto",
        description: "Amplias zonas verdes, lagunas y senderos ideales para caminar temprano.",
        image: parkImage,
    },

    {
        name: "Catedral de Barquisimeto",
        category: "Cultura",
        distance: "A 15 min en auto",
        description: "Arquitectura moderna emblemática en el centro histórico de la ciudad.",
        image: cathedralImage,
    },

    {
        name: "Aeropuerto Internacional Jacinto Lara (BRM)",
        category: "Transporte",
        distance: "A 20 min en auto",
        description: "Principal punto de llegada para asistentes nacionales e internacionales.",
        image: airportImage,
    },
];