import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to home link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bhojan
        </Link>

        <Card className="backdrop-blur-sm bg-white/80 border-amber-200/50 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-amber-900">
              Coming Soon
            </CardTitle>
            <CardDescription className="text-amber-700">
              Sign up functionality will be available soon. For now, please use the login page.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <Link 
              href="/login"
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-2.5 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
