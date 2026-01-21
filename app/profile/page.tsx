"use client"

import { useState, useEffect } from "react"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { onAuthStateChanged, User, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User as UserIcon, LogOut, ArrowLeft, Mail, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // If Firebase is not configured, redirect to home
    if (!isFirebaseConfigured()) {
      router.push("/");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        router.push("/login")
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    if (!isFirebaseConfigured()) {
      router.push("/");
      return;
    }

    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <Card className="md:col-span-1 border-orange-200">
            <CardContent className="pt-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12" />
                )}
              </div>
              <h2 className="text-xl font-bold text-orange-900 mb-1">{user.displayName || "Mithila Guest"}</h2>
              <p className="text-sm text-orange-600 mb-6">{user.email}</p>
              <Button
                variant="outline"
                className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Account Details */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-900">Account Details</CardTitle>
                <CardDescription>Your personal information and account status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-orange-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">Full Name</p>
                    <p className="text-orange-900 font-semibold">{user.displayName || "Not set"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-orange-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">Email Address</p>
                    <p className="text-orange-900 font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-orange-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">Member Since</p>
                    <p className="text-orange-900 font-semibold">
                      {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-orange-900">Order History</CardTitle>
                <CardDescription>View and track your previous orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">No orders found yet. Start your culinary journey today!</p>
                  <Link href="/#menu">
                    <Button className="mt-4 bg-orange-600 hover:bg-orange-700">Explore Menu</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
