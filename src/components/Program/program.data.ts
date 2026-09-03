export type Slot = { t: string; title: string; sub?: string; tag?: string};
export type DayProgram = {sala1: Slot[]; sala2: Slot[]};

export const program: {day1: DayProgram; day2: DayProgram} = {
    day1: {
        sala1: [
            {t: "07:00 - 09:00", title: "Registro", tag: "Apertura"},
            {t: "09:00 - 09:45", title: "Análisis de orina rápido como maniobra semiológica", sub: "Dr. Paludi"},
            {t: "10:00 - 10:45", title: "PCR LAMP en la clínica felina", sub: "Dr. Lugo"},
            {t: "11:00 - 11:30", title: "Receso", tag: "Pausa"},
            {t: "11:30 - 12:15", title: "Manejo de las emergencias en los gatos pediátricos", sub: "Dr. Michael Villa"},
            {t: "12:15 - 14:00", title: "Almuerzo", tag: "Pausa"},
            {t: "14:00 - 14:45", title: "Gastritis Crónica Felina", sub: "Dr. Bruzzone"},
            {t: "15:00 - 15:45", title: "Características farmacológicas de los gatos", sub: "Dr. Michael Villa"},
            {t: "16:00 - 16:30", title: "Receso", tag: "Pausa"},
            {t: "16:30 - 17:15", title: "Diarrea crónica en gatos", sub: "Dr. Michael Villa"},
            {t: "17:30 - 18:15", title: "Interpretación de la disnea por efusión pleural", sub: "Dr. Paludi"},
        ],
        sala2: [
            {t: "07:00 - 09:00", title: "Registro", tag: "Apertura"},
            {t: "09:00 - 09:45", title: "Abordaje diagnóstico del paciente hepático", sub: "Dr. Lugo"},
            {t: "10:00 - 10:45", title: "El Arte de Cobrar por la Especialidad Felina", sub: "Dra. Alejandra Mejia"},
            {t: "11:00 - 11:30", title: "Receso", tag: "Pausa"},
            {t: "11:30 - 12:15", title: "Manejo racional del flutd", sub: "Dr. Paludi"},
            {t: "12:15 - 14:00", title: "Almuerzo", tag: "Pausa"},
            {t: "14:00 - 14:45", title: "Triaditis como se diagnóstica y trata", sub: "Dr. Paludi"},
            {t: "15:00 - 15:45", title: "Marketing de Atracción Felina", sub: "Dra. Alejandra Mejia"},
            {t: "16:00 - 16:30", title: "Receso", tag: "Pausa"},
            {t: "16:30 - 17:15", title: "Esofagitis y manejo de cuerpos extraños", sub: "Dr. Bruzzone"},
            {t: "17:30 - 18:15", title:"Citología diagnóstica: Liquidos corporales", sub: "Dr. Lugo"}
        ],
    },
    day2: {
        sala1: [
            {t: "09:00 - 09:45", title: "Dolor en gatos, estrategias de la medicina interna", sub: "Dr. Michael Villa"},
            {t: "10:00 - 10:45", title: "Peritonitis infecciosa lo importante es el diagnóstico", sub: "Dr. Paludi"},
            {t: "11:00 - 11:30", title: "Receso", tag: "Pausa"},
            {t: "11:30 - 12:15", title: "Estrés conocerlo es entender el camino a la clínica", sub: "Dr. Paludi"},
            {t: "12:15 - 14:00", title: "Almuerzo", tag: "Pausa"},
            {t: "14:00 - 14:45", title: "Rinitis y sinusitis", sub: "Dr. Bruzzone"},
            {t: "15:00 - 15:45", title: "Lavado traqueobronquial en gatos", sub: "Dr. Lugo"},
            {t: "16:00 - 16:30", title: "Receso", tag: "Pausa"},
            {t: "16:30 - 17:15", title: "Corticoides angeles o demonios", sub: "Dr. Paludi"},
            {t: "17:30 - 18:15", title: "Lesión renal aguda en gatos", sub: "Dr. Michael Villa"},
        ],
        sala2: [
            {t: "09:00 - 09:45", title: "Abordaje diagnóstico del VIF", sub: "Dr. Lugo"},
            {t: "10:00 - 10:45", title: "El Modelo CVI y la Ética como Estrategia de Negocio", sub: "Dra. Alejandra Mejia"},
            {t: "11:00 - 11:30", title: "Receso", tag: "Pausa"},
            {t: "11:30 - 12:15", title: "Abordaje diagnóstico de la diabetes felina", sub: "Dr. Lugo"},
            {t: "12:15 - 14:00", title: "Almuerzo", tag: "Pausa"},
            {t: "14:00 - 14:45", title: "Manejo de la anemia en gatos", sub: "Dr. Michael Villa"},
            {t: "15:00 - 15:45", title: "Disrupción en el Modelo de Negocio Felino", sub: "Dra. Alejandra Mejia"},
            {t: "16:00 - 16:30", title: "Receso", tag: "Pausa"},
            {t: "16:30 - 17:15", title: "Laringitis obstructiva", sub: "Dr. Bruzzone"},
            {t: "17:30 - 18:15", title:"Abordaje diagnóstico del pénfigo felino", sub: "Dr. Lugo"}
        ]
    }
}