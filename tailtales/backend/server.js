// backend/server.js
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { db } from './firebaseAdmin.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Load environment variables from .env file

// ✅ Initialize Firebase Admin SDK (server side)
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(), // or use admin.credential.cert(serviceAccount) for production
    });
  }
  
  // ✅ Initialize Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
  
  // ✅ Setup Express server
  const app = express();
  app.use(cors());
  app.use(express.json());

// Create Stripe Checkout Session and save to Firestore
app.post('/create-checkout', async (req, res) => {
    const { cartItems, userId } = req.body;
  
    try {
      console.log("🛒 Received cartItems:", cartItems);
  
      // Convert cart items into Stripe line_items
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || 'Unnamed Product',
            description: item.description?.trim() || 'Product from TailTales',
          },
          unit_amount: Math.round(Number(item.price) * (1 + 0.13) * 100),   // tax included
        },
        quantity: item.quantity || 1,
      }));
  
      // ✅ Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cart',
      });
  
      // ✅ Prepare and validate Firestore order data
      const validItems = cartItems
        .map((item) => ({
          name: String(item.name || 'Unnamed Product'),
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        }))
        .filter((item) => item.name && !isNaN(item.price) && item.quantity > 0);
  
      const orderData = {
        userId: String(userId || 'anonymous'),
        items: validItems,
        totalAmount: validItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: new Date().toISOString(),
        status: 'Pending',
        stripeSessionId: session.id || '',
      };
  
      console.log("🧾 Saving to Firestore (final payload):", orderData);
  
      // ✅ Save order inside: users/{userId}/orders
      const userOrdersRef = db.collection('users').doc(userId).collection('orders');
      await userOrdersRef.add(orderData);
  
      // ✅ Send Stripe session URL to frontend
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error(' Stripe checkout error:', error);
      res.status(500).json({ error: 'Checkout failed.' });
    }
  });
  
// Start server
const PORT = process.env.PORT || 4243;
app.listen(PORT, () => console.log(`Stripe backend running on http://localhost:${PORT}`));