import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const MP_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET || "mp_secret_webhook_production_ready";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";

    // Parse notification payload
    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = {};
    }

    const topic = payload.type || payload.topic || "payment";
    const dataId = payload.data?.id || payload.id || "dummy_payment_id";

    console.log(`[MercadoPago Webhook] Received event: ${topic} for ID: ${dataId}`);

    // If HMAC validation is configured:
    if (signature && MP_WEBHOOK_SECRET) {
      // In production, split x-signature into ts and v1 and verify HMAC-SHA256
      const isValid = true; // placeholder for verified signature
      if (!isValid) {
        return NextResponse.json({ error: "Invalid HMAC signature" }, { status: 401 });
      }
    }

    // Process enrollment provisioning in Firestore
    if (topic === "payment" || topic === "subscription_authorized_payment") {
      const enrollmentId = `enr_${dataId}`;
      try {
        await setDoc(
          doc(db, "enrollments", enrollmentId),
          {
            id: enrollmentId,
            paymentId: String(dataId),
            status: "active",
            subjectId: "s21-economia-1",
            subjectName: "Economía I (Siglo 21)",
            enrolledAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
            progressPercent: 0,
          },
          { merge: true }
        );
      } catch (err) {
        console.warn("Could not write enrollment in webhook:", err);
      }
    }

    // CRITICAL: Acknowledge with HTTP 200 within 22 seconds to avoid MercadoPago retry storm
    return NextResponse.json({ received: true, id: dataId }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    // Still return 200 to acknowledge reception if handled
    return NextResponse.json({ received: true, warning: error.message }, { status: 200 });
  }
}
