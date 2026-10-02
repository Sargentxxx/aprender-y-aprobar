import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCIAfNflgbzjj6k7wGYM-dy0DhvGhoBlVE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "aprender-y-aprobar-prod.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "aprender-y-aprobar-prod",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "aprender-y-aprobar-prod.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "675494118383",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:675494118383:web:b17b826cad0dec5a316c1a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("==> Iniciando sembrado directo en Cloud Firestore (aprender-y-aprobar-prod)...");

const universities = [
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

const subjects = [
  {
    id: "s21-economia-1",
    name: "Economía I",
    code: "ECO-101",
    universityId: "s21",
    universityName: "Universidad Siglo 21",
    faculty: "Ciencias Económicas y Administración",
    career: "Contador Público / Lic. en Administración",
    description: "Programa completo oficial para rendir y aprobar Economía I en la Universidad Siglo 21.",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    description: "Tasas de interés efectivas, nominales y reales, sistemas de amortización (Francés, Alemán y Americano).",
    priceARS: 38500,
    monthlySubscriptionARS: 19500,
    status: "published",
    isBlueprint: false,
    teacherId: "teacher-ezequiel",
    teacherName: "Lic. Alberto Ezequiel García",
    teacherEmail: "alberto.ezequiel.garcia@gmail.com",
    flashcardsCount: 18,
    examSimulationsCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: [],
  },
];

async function seed() {
  try {
    for (const u of universities) {
      await setDoc(doc(db, "universities", u.id), u);
      console.log(`✓ Universidad sembrada: ${u.name}`);
    }
    for (const s of subjects) {
      await setDoc(doc(db, "subjects", s.id), s);
      console.log(`✓ Materia sembrada: ${s.name}`);
    }

    // Asegurar Super Admin
    await setDoc(
      doc(db, "users", "admin-ezequiel"),
      {
        uid: "admin-ezequiel",
        email: "alberto.ezequiel.garcia@gmail.com",
        displayName: "Lic. Alberto Ezequiel García (Director)",
        role: "admin",
        universityName: "Universidad Siglo 21",
        career: "Dirección Académica & Administración",
        studyStreak: 45,
        lastActiveDate: new Date().toISOString().split("T")[0],
        badges: ["Director General", "Fundador", "Super Admin"],
        totalStudyMinutes: 2840,
        createdAt: "2026-01-01T00:00:00Z",
      },
      { merge: true }
    );
    console.log("✓ Super Administrador alberto.ezequiel.garcia@gmail.com verificado.");

    console.log("==> Sembrado completado con éxito.");
    process.exit(0);
  } catch (err) {
    console.error("Error sembrando base de datos:", err);
    process.exit(1);
  }
}

seed();
