import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award } from "lucide-react"

export function About() {
  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is prepared with traditional recipes passed down through generations",
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "Serving authentic Mithila cuisine for over three generations",
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      description: "We use only the finest, locally sourced ingredients for authentic flavors",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">हमारी कहानी</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-orange-700 mb-6">Our Story</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h4 className="text-2xl font-bold text-orange-800 mb-6">Preserving Mithila's Culinary Heritage</h4>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Bhojan is more than just a restaurant - it's a celebration of Mithila's rich culinary tradition. Our
              journey began with a simple mission: to bring the authentic flavors of Mithila cuisine to food lovers
              everywhere.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              From the aromatic spices of our traditional curries to the delicate sweetness of our homemade desserts,
              every dish at Bhojan tells the story of our cultural heritage and the love that goes into its preparation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that food is not just nourishment for the body, but also for the soul. Come, experience the
              warmth of Mithila hospitality and taste the flavors that have been cherished for centuries.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl p-8 shadow-2xl">
              <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🍛</div>
                  <p className="text-orange-800 font-semibold text-lg">Traditional Recipes</p>
                  <p className="text-orange-600">Since 1950</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-orange-200 hover:border-orange-400 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-orange-800 mb-4">{feature.title}</h4>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
