import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function POST(request: Request) {
  try {
    // In a real production environment, you should verify the Firebase ID token here
    // using firebase-admin to ensure the user is authenticated and is who they claim to be.
    // Example:
    // const authHeader = req.headers.get('Authorization');
    // const idToken = authHeader?.split('Bearer ')[1];
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // const userId = decodedToken.uid;

    const body = await request.json()
    const { items, totalPrice, userId, userEmail } = body

    if (!items || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const orderRef = await addDoc(collection(db, "orders"), {
      items,
      totalPrice,
      userId,
      userEmail,
      status: "pending",
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({
      message: "Order placed successfully",
      orderId: orderRef.id,
    })
  } catch (error: any) {
    console.error("Order submission error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
