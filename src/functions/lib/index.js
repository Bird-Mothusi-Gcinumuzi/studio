"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserUpdate = exports.triggerCheckoutAndWhatsapp = exports.onAuthCreate = exports.nextjsServer = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const next = require('next');
const app = next({ dev: false, conf: { distDir: '../.next/standalone' } });
const handle = app.getRequestHandler();
exports.nextjsServer = functions.https.onRequest(async (req, res) => {
    await app.prepare();
    return handle(req, res);
});
exports.onAuthCreate = functions.auth.user().onCreate((user) => {
    const { uid, email, displayName } = user;
    const userRef = admin.firestore().collection('users').doc(uid);
    return userRef.set({
        email,
        name: displayName || 'No Name',
        status: 'pending',
    });
});
exports.triggerCheckoutAndWhatsapp = functions.https.onCall(async (data, context) => {
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
    const cartSnapshot = cartContents.map((item) => {
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
    cartContents.forEach((item) => {
        message += `${item.name} x ${item.quantity} @ $${item.price}\n`;
    });
    message += `\nTotal: $${totalValue}`;
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(message)}`;
    return { whatsappUrl };
});
exports.onUserUpdate = functions.firestore
    .document('users/{userId}')
    .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    if (newValue.status === 'active' && previousValue.status !== 'active') {
        const { userId } = context.params;
        try {
            await admin.auth().setCustomUserClaims(userId, { member: true });
            console.log(`Custom claim set for user ${userId}`);
        }
        catch (error) {
            console.error(`Error setting custom claim for user ${userId}:`, error);
        }
    }
});
//# sourceMappingURL=index.js.map