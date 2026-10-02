export type UserRole = "admin" | "teacher" | "student";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  universityId?: string;
  universityName?: string;
  career?: string;
  studyStreak: number;
  lastActiveDate: string;
  badges: string[];
  totalStudyMinutes: number;
  createdAt: string;
}

export interface University {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  location: string;
  faculties: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "pdf" | "summary" | "exam_sample" | "slides";
  url: string;
  size: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string;
  videoProvider: "stream" | "mux" | "youtube" | "storage";
  description: string;
  order: number;
  resources: ResourceItem[];
  isFreePreview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Flashcard {
  id: string;
  subjectId: string;
  moduleTitle: string;
  question: string;
  answer: string;
  difficulty: "facil" | "bueno" | "dificil";
  nextReviewDate?: string;
  reviewsCount: number;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamSimulation {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  questions: ExamQuestion[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  universityId: string;
  universityName: string;
  faculty: string;
  career: string;
  description: string;
  priceARS: number;
  monthlySubscriptionARS: number;
  status: "published" | "review_pending" | "draft";
  isBlueprint?: boolean;
  blueprintMasterId?: string;
  propagatedCampuses?: string[];
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  modules: Module[];
  flashcardsCount: number;
  examSimulationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentSubmission {
  id: string;
  subjectId: string;
  subjectName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  assignmentTitle: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  grade?: number; // 1 to 10
  feedback?: string;
  status: "pending" | "graded";
  gradedAt?: string;
  gradedBy?: string;
}

export interface AttendanceEntry {
  studentId: string;
  studentName: string;
  studentEmail: string;
  present: boolean;
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string;
  totalPresent: number;
  totalStudents: number;
  entries: AttendanceEntry[];
}

export interface Enrollment {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  subjectId: string;
  subjectName: string;
  universityName: string;
  enrolledAt: string;
  expiresAt: string;
  progressPercent: number;
  status: "active" | "completed" | "expired";
}

export interface PaymentRecord {
  id: string;
  paymentId: string;
  userId: string;
  userEmail: string;
  userName: string;
  subjectId: string;
  subjectName: string;
  amountARS: number;
  paymentMethod: "mercadopago_card" | "mercadopago_cvu" | "mercadopago_subscription";
  status: "approved" | "pending" | "rejected";
  mpCollectorId?: string;
  createdAt: string;
}

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  minutes: number;
  level: 0 | 1 | 2 | 3 | 4; // for heatmap
  activitiesCount: number;
}
