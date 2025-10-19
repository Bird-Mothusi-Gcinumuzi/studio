import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const next = require('next');
const app = next({ dev: false, conf: { distDir: '../.next/standalone' } });
const handle = app.getRequestHandler();

export const nextjsServer = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  return handle(req, res);
});

export const onAuthCreate = functions.auth.user().onCreate((user) => {
  const { uid, email, displayName } = user;
  const userRef = admin.firestore().collection('users').doc(uid);

  return userRef.set({
    email,
    name: displayName || 'No Name',
    status: 'pending',
  });
});

export const triggerCheckoutAndWhatsapp = functions.https.onCall(async (data, context) => {
  const { uid, cartContents } = data;
  const db = admin.firestore();

  if (!context.auth || context.auth.uid !== uid) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const userRef = db.collection('users').doc(uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();

  if (!userData || userData.status !== 'active') {
    throw new functions.https.HttpsError('failed-precondition', 'User is not active.');
  }

  let totalValue = 0;
  const cartSnapshot = cartContents.map((item: any) => {
    totalValue += item.price * item.quantity;
    return {
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
    };
  });

  const checkoutLog = {
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    userId: uid,
    cartSnapshot,
    totalValue,
  };

  await db.collection('checkouts').add(checkoutLog);

  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
  let message = `New order from ${userData.name} (UID: ${uid}):\n\n`;
  cartContents.forEach((item: any) => {
    message += `${item.name} x ${item.quantity} @ $${item.price}\n`;
  });
  message += `\nTotal: $${totalValue}`;

  const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(message)}`;

  return { whatsappUrl };
});

export const onUserUpdate = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (newValue.status === 'active' && previousValue.status !== 'active') {
      const { userId } = context.params;
      try {
        await admin.auth().setCustomUserClaims(userId, { member: true });
        console.log(`Custom claim set for user ${userId}`);
      } catch (error) {
        console.error(`Error setting custom claim for user ${userId}:`, error);
      }
    }
  });