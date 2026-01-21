"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { cart } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    // Only set up auth listener if Firebase is configured
    if (!isFirebaseConfigured()) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 w-full bg-opacity-40 backdrop-blur-sm shadow-lg z-50 border-b-4 border-orange-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
              {/* <span className="text-white font-bold text-xl">भ</span> */}
              <img src="/logo.png" alt="भ" className="rounded-full"/>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">Bhojan</h1>
              <p className="text-sm text-orange-600">मिथिला का स्वाद</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const sectionId = item.href.replace("#", "")
                  if (pathname !== "/") {
                    router.push(`/#${sectionId}`)
                    return
                  }
                  const element = document.getElementById(sectionId)
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-orange-800 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}

            <Link href="/cart" className="relative group p-2">
              <ShoppingCart className="w-6 h-6 text-orange-800 group-hover:text-orange-600 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Profile or Login/Signup Button */}
            {user ? (
              <Link href="/profile">
                <div className="ml-4 w-10 h-10 rounded-full border-2 border-orange-600 overflow-hidden hover:border-orange-400 transition-colors">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=EA580C&color=fff`}
                    alt={user.displayName || "Profile"}
                    className="w-full h-full object-cover"
                    title={user.displayName || user.email || "Profile"}
                  />
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="ml-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
                  Login / Signup
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-orange-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-orange-200">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const sectionId = item.href.replace("#", "")
                    setIsMenuOpen(false)
                    if (pathname !== "/") {
                      router.push(`/#${sectionId}`)
                      return
                    }
                    const element = document.getElementById(sectionId)
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-orange-800 hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-left w-full"
                >
                  {item.name}
                </button>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-orange-800 hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>My Cart</span>
              </Link>

              {/* User Profile or Login/Signup Button for Mobile */}
              {user ? (
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center p-2 mt-2 bg-orange-50 rounded-lg">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=EA580C&color=fff`}
                    alt={user.displayName || "Profile"}
                    className="w-10 h-10 rounded-full border-2 border-orange-600 object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <span className="text-orange-900 font-bold leading-none">{user.displayName || "Guest"}</span>
                    <span className="text-orange-600 text-xs mt-1">View Profile</span>
                  </div>
                </Link>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 w-full">
                    Login / Signup
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
