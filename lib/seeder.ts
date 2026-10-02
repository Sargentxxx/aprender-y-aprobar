import { collection, doc, writeBatch, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import {
  MOCK_UNIVERSITIES,
  MOCK_SUBJECTS,
  MOCK_FLASHCARDS,
  MOCK_EXAM_SIMULATION,
  MOCK_STUDENT_SUBMISSIONS,
  MOCK_ATTENDANCE,
  MOCK_PAYMENTS,
} from "./mock-data";

export async function seedFirestoreDatabase(onProgress?: (msg: string) => void) {
  const log = (msg: string) => {
    console.log(msg);
    if (onProgress) onProgress(msg);
  };

  log("Iniciando sembrado estratégico de la base de datos Firestore...");

  // 1. Universidades
  log("Sembrando universidades argentinas (Siglo 21, UNSE, UCSE, UBP, UNSTA)...");
  for (const uni of MOCK_UNIVERSITIES) {
    await setDoc(doc(db, "universities", uni.id), uni);
  }

  // 2. Materias oficiales
  log("Sembrando materias curriculares con programa desglosado (Economía I, Mat. Financiera, Contabilidad)...");
  for (const subj of MOCK_SUBJECTS) {
    await setDoc(doc(db, "subjects", subj.id), subj);
  }

  // 3. Flashcards de Recuperación Activa
  log("Sembrando tarjetas de memoria (Active Recall & Repetición Espaciada)...");
  for (const card of MOCK_FLASHCARDS) {
    await setDoc(doc(db, "flashcards", card.id), card);
  }

  // 4. Simulador de Examen
  log("Sembrando simulador de examen parcial Siglo 21...");
  await setDoc(doc(db, "exam_simulations", MOCK_EXAM_SIMULATION.id), MOCK_EXAM_SIMULATION);

  // 5. Entregas de Alumnos (SpeedGrader)
  log("Sembrando entregas de alumnos para corrección en SpeedGrader...");
  for (const sub of MOCK_STUDENT_SUBMISSIONS) {
    await setDoc(doc(db, "submissions", sub.id), sub);
  }

  // 6. Asistencia
  log("Sembrando libro de asistencia digital...");
  await setDoc(doc(db, "attendance", MOCK_ATTENDANCE.id), MOCK_ATTENDANCE);

  // 7. Pagos y Suscripciones MercadoPago
  log("Sembrando registro de pagos y transacciones en ARS...");
  for (const pay of MOCK_PAYMENTS) {
    await setDoc(doc(db, "payments", pay.id), pay);
  }

  // 8. Superadministrador y Estudiantes Ficticios
  log("Garantizando Superadministrador alberto.ezequiel.garcia@gmail.com...");
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
      badges: ["Director General", "Fundador", "Maestría en Economía", "Super Admin"],
      totalStudyMinutes: 2840,
      createdAt: "2026-01-01T00:00:00Z",
    },
    { merge: true }
  );

  // Alumnos ficticios para SIS y Heatmap
  const mockStudents = [
    {
      uid: "stu-gonzalo",
      email: "gonzalo.morales@estudiantes.21.edu.ar",
      displayName: "Gonzalo Morales",
      role: "student",
      universityName: "Universidad Siglo 21",
      career: "Contador Público",
      studyStreak: 12,
      lastActiveDate: new Date().toISOString().split("T")[0],
      badges: ["Racha 10 Días", "Economía I Aprobada", "Constancia de Oro"],
      totalStudyMinutes: 980,
      createdAt: "2026-03-01T10:00:00Z",
    },
    {
      uid: "stu-valeria",
      email: "valeria.gomez@gmail.com",
      displayName: "Valeria Gómez",
      role: "student",
      universityName: "Universidad Siglo 21",
      career: "Licenciatura en Administración",
      studyStreak: 18,
      lastActiveDate: new Date().toISOString().split("T")[0],
      badges: ["Racha 15 Días", "Top SpeedGrader", "Insignia de Honor"],
      totalStudyMinutes: 1420,
      createdAt: "2026-02-15T10:00:00Z",
    },
    {
      uid: "stu-facundo",
      email: "facundo.rossi@outlook.com",
      displayName: "Facundo Rossi",
      role: "student",
      universityName: "UNSE",
      career: "Contador Público",
      studyStreak: 5,
      lastActiveDate: new Date().toISOString().split("T")[0],
      badges: ["Bienvenida", "Primer Parcial Superado"],
      totalStudyMinutes: 520,
      createdAt: "2026-04-10T10:00:00Z",
    },
  ];

  for (const s of mockStudents) {
    await setDoc(doc(db, "users", s.uid), s, { merge: true });
  }

  log("✅ Sembrado completado exitosamente con integridad referencial.");
  return true;
}
