import { db } from "@/lib/firebaseAdmin"; // تأكد من أنك استوردت Firebase بشكل صحيح

// دالة لتوليد API Key عشوائي
function randomKey() {
  return "api_" + Math.random().toString(36).substring(2, 15); // توليد قيمة عشوائية للـ API Key
}

export async function POST() {
  try {
    // توليد API Key عشوائي
    const apiKey = randomKey();

    // إضافة الـ API Key إلى Firestore (إلى مجموعة "users")
    await db.collection("users").add({
      apiKey, // إضافة الـ API Key
      createdAt: Date.now(), // تسجيل الوقت الذي تم فيه إنشاء الـ API Key
      requests: 0, // عدد الـ requests سيكون 0 بشكل افتراضي
    });

    // إرجاع الـ API Key للمستخدم
    return Response.json({ apiKey });
  } catch (err) {
    // إذا حصل خطأ، إرجاع رسالة الخطأ
    return Response.json({ error: err.message }, { status: 500 });
  }
}
