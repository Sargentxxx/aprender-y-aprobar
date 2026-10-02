import {
  University,
  Subject,
  Flashcard,
  ExamSimulation,
  StudentSubmission,
  AttendanceRecord,
  PaymentRecord,
  DailyStudyLog,
} from "./types";

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: "s21",
    name: "Universidad Siglo 21",
    acronym: "S21",
    logo: "/images/universities/siglo21.svg",
    location: "Córdoba / Online Federal",
    faculties: ["Ciencias Económicas y Administración", "Derecho y Ciencias Sociales", "Tecnología"],
  },
  {
    id: "unse",
    name: "Universidad Nacional de Santiago del Estero",
    acronym: "UNSE",
    logo: "/images/universities/unse.svg",
    location: "Santiago del Estero",
    faculties: ["Facultad de Humanidades y Ciencias Sociales", "Facultad de Ciencias Exactas"],
  },
  {
    id: "ucse",
    name: "Universidad Católica de Santiago del Estero",
    acronym: "UCSE",
    logo: "/images/universities/ucse.svg",
    location: "Santiago del Estero / Jujuy / Rafaela",
    faculties: ["Ciencias Económicas", "Ciencias Políticas y Jurídicas"],
  },
  {
    id: "ubp",
    name: "Universidad Blas Pascal",
    acronym: "UBP",
    logo: "/images/universities/ubp.svg",
    location: "Córdoba / Distancia",
    faculties: ["Gestión y Negocios", "Jurídicas"],
  },
  {
    id: "unsta",
    name: "Universidad del Norte Santo Tomás de Aquino",
    acronym: "UNSTA",
    logo: "/images/universities/unsta.svg",
    location: "Tucumán",
    faculties: ["Economía y Administración", "Ciencias Jurídicas"],
  },
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "s21-economia-1",
    name: "Economía I",
    code: "ECO-101",
    universityId: "s21",
    universityName: "Universidad Siglo 21",
    faculty: "Ciencias Económicas y Administración",
    career: "Contador Público / Lic. en Administración",
    description:
      "Programa completo oficial para rendir y aprobar Economía I en la Universidad Siglo 21. Incluye clases teóricas en video, resolución paso a paso de prácticos, modelos de examen parcial y final, flashcards de repaso espaciado y simulador interactivo.",
    priceARS: 38500,
    monthlySubscriptionARS: 19500,
    status: "published",
    isBlueprint: true,
    propagatedCampuses: ["Universidad Siglo 21", "UNSE", "UBP", "UCSE"],
    teacherId: "teacher-ezequiel",
    teacherName: "Lic. Alberto Ezequiel García",
    teacherEmail: "alberto.ezequiel.garcia@gmail.com",
    flashcardsCount: 24,
    examSimulationsCount: 3,
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-10-01T18:30:00Z",
    modules: [
      {
        id: "mod-1",
        title: "Módulo 1: Fundamentos de la Economía y Escasez",
        description: "El problema económico, escasez relativa, costo de oportunidad y la Frontera de Posibilidades de Producción (FPP).",
        order: 1,
        lessons: [
          {
            id: "les-1-1",
            title: "1.1 Conceptos Fundamentales: Necesidades y Recursos Escasos",
            durationMinutes: 34,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Análisis del concepto de escasez, bienes económicos vs bienes libres, y agentes económicos.",
            order: 1,
            isFreePreview: true,
            resources: [
              {
                id: "res-1",
                title: "Resumen Módulo 1 - Economía I (S21).pdf",
                type: "summary",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                size: "2.4 MB",
              },
            ],
          },
          {
            id: "les-1-2",
            title: "1.2 La Frontera de Posibilidades de Producción (FPP) y Costo de Oportunidad",
            durationMinutes: 42,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Gráfico de la FPP, puntos eficientes, ineficientes e inalcanzables. Costos crecientes.",
            order: 2,
            resources: [
              {
                id: "res-2",
                title: "Guía de Ejercicios Prácticos FPP Resueltos.pdf",
                type: "pdf",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                size: "1.8 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mod-2",
        title: "Módulo 2: Fuerzas del Mercado: Demanda, Oferta y Equilibrio",
        description: "Curvas de demanda y oferta, desplazamientos vs movimientos sobre la curva, equilibrio de mercado y elasticidades.",
        order: 2,
        lessons: [
          {
            id: "les-2-1",
            title: "2.1 Ley de Oferta y Demanda y Determinación del Precio",
            durationMinutes: 48,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Factores determinantes, bienes sustitutos, complementarios y efecto ingreso/sustitución.",
            order: 1,
            resources: [
              {
                id: "res-3",
                title: "Apunte Oficial: Equilibrio y Estática Comparativa.pdf",
                type: "summary",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                size: "3.1 MB",
              },
            ],
          },
          {
            id: "les-2-2",
            title: "2.2 Elasticidad Precio, Ingreso y Cruzada (Cálculo y Casos de Examen)",
            durationMinutes: 52,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Fórmula del punto medio, demanda elástica, inelástica y unitaria. Preguntas trampas en parciales.",
            order: 2,
            resources: [
              {
                id: "res-4",
                title: "Colección Preguntas Trampa Parciales S21.pdf",
                type: "exam_sample",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                size: "4.5 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mod-3",
        title: "Módulo 3: Teoría de la Producción, Costos y Estructuras de Mercado",
        description: "Función de producción a corto y largo plazo, rendimientos decrecientes, costos marginales y monopolios.",
        order: 3,
        lessons: [
          {
            id: "les-3-1",
            title: "3.1 Costos Fijos, Variables, Medios y Marginales",
            durationMinutes: 39,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Curvas de costos típicas, punto de equilibrio operativo y punto de cierre.",
            order: 1,
            resources: [],
          },
          {
            id: "les-3-2",
            title: "3.2 Competencia Perfecta vs Monopolio y Oligopolio",
            durationMinutes: 45,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Maximización de beneficios Img = Cmg, pérdida irrecuperable de eficiencia y barreras de entrada.",
            order: 2,
            resources: [],
          },
        ],
      },
      {
        id: "mod-4",
        title: "Módulo 4: Introducción a la Macroeconomía y Cuentas Nacionales",
        description: "Producto Bruto Interno (PBI), PBI per cápita, inflación, desempleo y rol del Banco Central.",
        order: 4,
        lessons: [
          {
            id: "les-4-1",
            title: "4.1 Medición de la Actividad Económica: El PBI y sus métodos",
            durationMinutes: 41,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Método del gasto, del valor agregado y del ingreso. PBI nominal vs PBI real con deflactor.",
            order: 1,
            resources: [],
          },
        ],
      },
    ],
  },
  {
    id: "s21-matematica-financiera",
    name: "Matemática Financiera",
    code: "MAT-204",
    universityId: "s21",
    universityName: "Universidad Siglo 21",
    faculty: "Ciencias Económicas y Administración",
    career: "Contador Público / Lic. en Administración",
    description: "Tasas de interés efectivas, nominales y reales, sistemas de amortización (Francés, Alemán y Americano), cálculo de VAN y TIR.",
    priceARS: 38500,
    monthlySubscriptionARS: 19500,
    status: "published",
    isBlueprint: false,
    teacherId: "teacher-ezequiel",
    teacherName: "Lic. Alberto Ezequiel García",
    teacherEmail: "alberto.ezequiel.garcia@gmail.com",
    flashcardsCount: 18,
    examSimulationsCount: 2,
    createdAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-09-28T14:00:00Z",
    modules: [
      {
        id: "mf-mod-1",
        title: "Módulo 1: Régimen Simple y Compuesto de Capitalización",
        description: "Equivalencia de tasas y actualización financiera.",
        order: 1,
        lessons: [
          {
            id: "mf-les-1",
            title: "1.1 Interés Compuesto y Tasa Efectiva Anual (TEA)",
            durationMinutes: 38,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoProvider: "stream",
            description: "Fórmula de capitalización compuesta y despeje de incógnitas.",
            order: 1,
            resources: [],
          },
        ],
      },
    ],
  },
  {
    id: "s21-contabilidad-basica",
    name: "Contabilidad Básica",
    code: "CON-102",
    universityId: "s21",
    universityName: "Universidad Siglo 21",
    faculty: "Ciencias Económicas y Administración",
    career: "Contador Público",
    description: "Ecuación patrimonial fundamental, partida doble, libros obligatorios, conciliaciones bancarias y asientos de cierre.",
    priceARS: 35000,
    monthlySubscriptionARS: 18000,
    status: "published",
    isBlueprint: false,
    teacherId: "teacher-ezequiel",
    teacherName: "Lic. Alberto Ezequiel García",
    teacherEmail: "alberto.ezequiel.garcia@gmail.com",
    flashcardsCount: 16,
    examSimulationsCount: 2,
    createdAt: "2026-03-10T12:00:00Z",
    updatedAt: "2026-09-25T14:00:00Z",
    modules: [],
  },
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    subjectId: "s21-economia-1",
    moduleTitle: "Módulo 1: FPP y Escasez",
    question: "¿Qué representa cualquier punto situado POR DEBAJO de la curva de la Frontera de Posibilidades de Producción (FPP)?",
    answer: "Representa una asignación INEFICIENTE de recursos, donde existen factores productivos ociosos o desempleados.",
    difficulty: "facil",
    reviewsCount: 3,
  },
  {
    id: "fc-2",
    subjectId: "s21-economia-1",
    moduleTitle: "Módulo 1: FPP y Escasez",
    question: "¿Cómo se define el 'Costo de Oportunidad' en términos microeconómicos?",
    answer: "Es la cantidad de otros bienes o servicios a los que se debe renunciar para obtener una unidad adicional del bien deseado.",
    difficulty: "bueno",
    reviewsCount: 2,
  },
  {
    id: "fc-3",
    subjectId: "s21-economia-1",
    moduleTitle: "Módulo 2: Fuerzas del Mercado",
    question: "Si la elasticidad precio de la demanda de un bien es de -2.5, ¿cómo se clasifica y qué ocurre con los ingresos del productor si sube el precio?",
    answer: "Se clasifica como DEMANDA ELÁSTICA (|Ep| > 1). Si el precio sube, la cantidad demandada cae en mayor proporción, reduciendo el ingreso total del productor.",
    difficulty: "dificil",
    reviewsCount: 4,
  },
  {
    id: "fc-4",
    subjectId: "s21-economia-1",
    moduleTitle: "Módulo 2: Fuerzas del Mercado",
    question: "Si ante un aumento del ingreso de las familias, la demanda del bien X disminuye, ¿qué tipo de bien es X?",
    answer: "Es un BIEN INFERIOR (Elasticidad ingreso de la demanda negativa: Ey < 0).",
    difficulty: "bueno",
    reviewsCount: 1,
  },
  {
    id: "fc-5",
    subjectId: "s21-economia-1",
    moduleTitle: "Módulo 3: Costos y Producción",
    question: "¿En qué punto exacto una empresa en competencia perfecta maximiza sus beneficios en el corto plazo?",
    answer: "En el punto donde el Costo Marginal es igual al Ingreso Marginal y al Precio de mercado (P = Cmg = Img), siempre que P sea mayor o igual al Costo Variable Medio.",
    difficulty: "dificil",
    reviewsCount: 5,
  },
  {
    id: "fc-6",
    subjectId: "s21-economia-1",
    moduleTitle: "Módulo 4: Macroeconomía",
    question: "¿Cuál es la ecuación fundamental del PBI por el método del gasto en una economía abierta?",
    answer: "PBI = C + I + G + (X - M), donde C = Consumo, I = Inversión, G = Gasto Público, X = Exportaciones y M = Importaciones.",
    difficulty: "facil",
    reviewsCount: 2,
  },
];

export const MOCK_EXAM_SIMULATION: ExamSimulation = {
  id: "sim-eco-parcial-1",
  subjectId: "s21-economia-1",
  title: "Simulador Primer Parcial Oficial - Economía I (Siglo 21)",
  description: "Examen simulado estructurado bajo el formato evaluativo de Universidad Siglo 21. Cuenta con 5 preguntas tipo múltiple opción con justificación y penalización por tiempo.",
  timeLimitMinutes: 20,
  passingScorePercent: 70,
  questions: [
    {
      id: "q-1",
      question: "Si el precio de la yerba mate aumenta un 20% y la cantidad demandada cae un 30%, la elasticidad precio de la demanda en valor absoluto es:",
      options: ["0.66 (Inelástica)", "1.50 (Elástica)", "1.00 (Unitaria)", "0.50 (Inelástica)"],
      correctIndex: 1,
      explanation: "Ep = |% cambio en Q / % cambio en P| = |-30% / 20%| = 1.50. Al ser mayor a 1, la demanda es elástica.",
    },
    {
      id: "q-2",
      question: "Un desplazamiento de la curva de oferta hacia la derecha se genera debido a:",
      options: [
        "Un incremento en los costos salariales de los trabajadores",
        "Una mejora tecnológica en el proceso productivo",
        "Un aumento en el precio del bien",
        "Un cambio en las preferencias de los consumidores",
      ],
      correctIndex: 1,
      explanation: "Una mejora tecnológica reduce los costos de producción y permite a las empresas ofrecer más cantidad a cada precio, desplazando la curva de oferta a la derecha.",
    },
    {
      id: "q-3",
      question: "En el modelo de la Frontera de Posibilidades de Producción, la pendiente negativa de la curva refleja directamente:",
      options: [
        "La ley de rendimientos crecientes",
        "El principio de la escasez y el costo de oportunidad",
        "La existencia de inflación",
        "El desempleo estructural",
      ],
      correctIndex: 1,
      explanation: "La pendiente negativa indica que para producir más de un bien se debe renunciar obligatoriamente a unidades del otro bien, es decir, el costo de oportunidad originado por la escasez.",
    },
    {
      id: "q-4",
      question: "Si el gobierno fija un precio máximo por debajo del precio de equilibrio de mercado, se provocará de forma inevitable:",
      options: [
        "Un exceso de oferta (excedente)",
        "Un exceso de demanda (escasez) y mercados negros",
        "Un aumento del bienestar general",
        "Un desplazamiento de la demanda hacia la izquierda",
      ],
      correctIndex: 1,
      explanation: "Al fijar un precio máximo artificialmente bajo, la cantidad que los consumidores desean comprar supera lo que los productores están dispuestos a ofrecer, generando escasez y colas o mercado paralelo.",
    },
    {
      id: "q-5",
      question: "El PBI Nominal se diferencia del PBI Real principalmente en que:",
      options: [
        "El PBI nominal incluye las exportaciones y el real no",
        "El PBI nominal se valora a precios corrientes del año, mientras el PBI real utiliza precios de un año base (constantes)",
        "El PBI real solo mide el gasto público",
        "El PBI nominal mide el bienestar humano y el real la riqueza monetaria",
      ],
      correctIndex: 1,
      explanation: "El PBI real descuenta el efecto distorsivo de la inflación utilizando precios constantes de un año base, permitiendo medir el crecimiento real de la producción física.",
    },
  ],
};

export const MOCK_STUDENT_SUBMISSIONS: StudentSubmission[] = [
  {
    id: "sub-101",
    subjectId: "s21-economia-1",
    subjectName: "Economía I - Siglo 21",
    studentId: "stu-gonzalo",
    studentName: "Gonzalo Morales",
    studentEmail: "gonzalo.morales@estudiantes.21.edu.ar",
    assignmentTitle: "Trabajo Práctico Nº 2: Estructuras de Mercado y Elasticidad",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "TP2_Economia1_Morales_Gonzalo.pdf",
    fileSize: "1.4 MB",
    submittedAt: "2026-09-30T16:20:00Z",
    status: "pending",
  },
  {
    id: "sub-102",
    subjectId: "s21-economia-1",
    subjectName: "Economía I - Siglo 21",
    studentId: "stu-valeria",
    studentName: "Valeria Gómez",
    studentEmail: "valeria.gomez@gmail.com",
    assignmentTitle: "Trabajo Práctico Nº 2: Estructuras de Mercado y Elasticidad",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Gomez_Valeria_TP2_Resuelto.pdf",
    fileSize: "2.1 MB",
    submittedAt: "2026-09-29T11:45:00Z",
    grade: 9,
    feedback: "Excelente desarrollo del cálculo de elasticidad y gráficos de la pérdida irrecuperable de monopolio. Revisar la conclusión teórica del punto 4.",
    status: "graded",
    gradedAt: "2026-09-30T10:15:00Z",
    gradedBy: "Lic. Alberto Ezequiel García",
  },
  {
    id: "sub-103",
    subjectId: "s21-economia-1",
    subjectName: "Economía I - Siglo 21",
    studentId: "stu-facundo",
    studentName: "Facundo Rossi",
    studentEmail: "facundo.rossi@outlook.com",
    assignmentTitle: "Trabajo Práctico Nº 1: Frontera de Posibilidades de Producción",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "TP1_Rossi_FPP.pdf",
    fileSize: "980 KB",
    submittedAt: "2026-09-28T18:10:00Z",
    grade: 8,
    feedback: "Muy buen análisis de los costos de oportunidad marginales. El gráfico carecía de rótulos en los ejes pero el contenido es sólido.",
    status: "graded",
    gradedAt: "2026-09-29T09:30:00Z",
    gradedBy: "Lic. Alberto Ezequiel García",
  },
];

export const MOCK_ATTENDANCE: AttendanceRecord = {
  id: "att-eco-2026-10-01",
  subjectId: "s21-economia-1",
  subjectName: "Economía I (Comisión A)",
  date: "2026-10-01",
  totalPresent: 5,
  totalStudents: 6,
  entries: [
    { studentId: "stu-gonzalo", studentName: "Gonzalo Morales", studentEmail: "gonzalo.morales@estudiantes.21.edu.ar", present: true },
    { studentId: "stu-valeria", studentName: "Valeria Gómez", studentEmail: "valeria.gomez@gmail.com", present: true },
    { studentId: "stu-facundo", studentName: "Facundo Rossi", studentEmail: "facundo.rossi@outlook.com", present: true },
    { studentId: "stu-lucas", studentName: "Lucas Fernández", studentEmail: "lucas.fernandez@alumnos.edu.ar", present: false },
    { studentId: "stu-camila", studentName: "Camila Sánchez", studentEmail: "camila.sanchez@gmail.com", present: true },
    { studentId: "stu-sofia", studentName: "Sofía Benítez", studentEmail: "sofia.benitez@gmail.com", present: true },
  ],
};

export const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-101",
    paymentId: "MP-7984319024",
    userId: "stu-gonzalo",
    userName: "Gonzalo Morales",
    userEmail: "gonzalo.morales@estudiantes.21.edu.ar",
    subjectId: "s21-economia-1",
    subjectName: "Economía I (Siglo 21)",
    amountARS: 38500,
    paymentMethod: "mercadopago_card",
    status: "approved",
    mpCollectorId: "COL-99384",
    createdAt: "2026-09-25T14:30:00Z",
  },
  {
    id: "pay-102",
    paymentId: "MP-7984319058",
    userId: "stu-valeria",
    userName: "Valeria Gómez",
    userEmail: "valeria.gomez@gmail.com",
    subjectId: "s21-economia-1",
    subjectName: "Economía I (Siglo 21)",
    amountARS: 19500,
    paymentMethod: "mercadopago_subscription",
    status: "approved",
    mpCollectorId: "COL-99384",
    createdAt: "2026-09-20T10:12:00Z",
  },
  {
    id: "pay-103",
    paymentId: "MP-7984319099",
    userId: "stu-facundo",
    userName: "Facundo Rossi",
    userEmail: "facundo.rossi@outlook.com",
    subjectId: "s21-matematica-financiera",
    subjectName: "Matemática Financiera (Siglo 21)",
    amountARS: 38500,
    paymentMethod: "mercadopago_cvu",
    status: "approved",
    mpCollectorId: "COL-99384",
    createdAt: "2026-09-29T18:40:00Z",
  },
];

// 90 days study logs for GitHub-style heatmap
export function generateStudyLogs(): DailyStudyLog[] {
  const logs: DailyStudyLog[] = [];
  const today = new Date();

  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // pseudo-random study activity with high weekend and exam period weight
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseRandom = Math.sin(i * 0.4) + Math.cos(i * 0.1);

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let minutes = 0;
    let activitiesCount = 0;

    if (baseRandom > 0.8) {
      level = 4;
      minutes = 120 + Math.floor(Math.random() * 60);
      activitiesCount = 6;
    } else if (baseRandom > 0.3) {
      level = 3;
      minutes = 75 + Math.floor(Math.random() * 30);
      activitiesCount = 4;
    } else if (baseRandom > -0.2 || isWeekend) {
      level = 2;
      minutes = 45 + Math.floor(Math.random() * 20);
      activitiesCount = 2;
    } else if (baseRandom > -0.6) {
      level = 1;
      minutes = 20 + Math.floor(Math.random() * 15);
      activitiesCount = 1;
    }

    logs.push({
      date: dateStr,
      minutes,
      level,
      activitiesCount,
    });
  }

  return logs;
}
