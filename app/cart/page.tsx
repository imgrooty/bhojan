"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    if (!isFirebaseConfigured()) {
      alert("Authentication is currently unavailable. Please contact the administrator.");
      return;
    }

    const user = auth.currentUser
    if (!user) {
      router.push("/login?redirect=/cart")
      return
    }

    setIsCheckingOut(true)
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalPrice,
          userId: user.uid,
          userEmail: user.email,
        }),
      })

      if (response.ok) {
        setOrderPlaced(true)
        clearCart()
      } else {
        alert("Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 border-orange-200">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-orange-900 mb-4">Order Placed!</h2>
          <p className="text-gray-700 mb-8">
            Thank you for your order. We are preparing your delicious Mithila meal.
          </p>
          <Link href="/">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">Back to Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>
          <h1 className="text-3xl font-bold text-orange-900">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <Card className="text-center p-12 border-orange-200">
            <ShoppingBag className="w-16 h-16 text-orange-200 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-orange-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any Mithila delicacies yet.</p>
            <Link href="/#menu">
              <Button className="bg-orange-600 hover:bg-orange-700">Explore Menu</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden border-orange-100">
                  <div className="flex items-center p-4 gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-orange-900">{item.name}</h3>
                      <p className="text-orange-600 font-semibold">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-orange-100 text-orange-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-orange-100 text-orange-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="border-t border-orange-100 pt-4 flex justify-between text-xl font-bold text-orange-900">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-bold shadow-lg mt-4"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
