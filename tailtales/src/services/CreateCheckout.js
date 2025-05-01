import Stripe from "stripe";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../services/firebase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { cartItems, userId } = req.body;

  try {
    const HST_RATE = 0.13;

    // ✅ Create Stripe checkout session with HST included in prices
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name || "Unnamed Product",
            description: item.description?.trim() || "Product from TailTales",
          },
          unit_amount: Math.round(Number(item.price) * (1 + HST_RATE) * 100), // tax included
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    // ✅ Save order to Firestore inside users/{userId}/orders
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await addDoc(collection(db, "users", userId, "orders"), {
      cartItems,
      amount: Number(totalAmount.toFixed(2)),
      createdAt: new Date().toISOString(),
      status: "Pending",
      stripeSessionId: session.id,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Checkout failed." });
  }
}
