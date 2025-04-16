import admin from "firebase-admin";
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  // ✅ Running on Render, load from secret file path
  serviceAccount = JSON.parse(
    await readFile('/etc/secrets/firebase-admin-key.json', 'utf8')
  );
} else {
  // ✅ Running locally, load from local file
  const serviceAccountPath = path.join(__dirname, 'firebase-admin-key.json');
  serviceAccount = JSON.parse(
    await readFile(serviceAccountPath, 'utf8')
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export const db = admin.firestore();