import admin from 'firebase-admin';

// تحقق من أن Firebase لم يتم تهيئتها بعد
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,  // ID المشروع من Firebase
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // مفتاح الخدمة الخاص بـ Firebase (مع التعامل مع \n بشكل صحيح)
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,  // بريد عميل Firebase
    }),
  });
}

const db = admin.firestore();  // الوصول إلى Firestore
export { db };
