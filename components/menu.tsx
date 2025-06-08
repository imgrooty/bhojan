"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Star } from "lucide-react"

interface MenuItem {
  name: string
  description: string
  price: string
  isVeg: boolean
  isSpecial?: boolean
  image: string
  ingredients: string[]
  preparationTime: string
  spiceLevel: number
  calories: string
  allergens: string[]
  story?: string
}

export function Menu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const menuCategories = [
    {
      title: "मुख्य व्यंजन (Main Dishes)",
      items: [
        {
          name: "Mithila Dal Bhat",
          description: "Traditional lentil curry with steamed rice, a staple of Mithila cuisine",
          price: "₹180",
          isVeg: true,
          isSpecial: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Basmati Rice", "Mixed Lentils", "Turmeric", "Cumin", "Ginger", "Garlic", "Ghee"],
          preparationTime: "25 minutes",
          spiceLevel: 2,
          calories: "420 kcal",
          allergens: ["Gluten"],
          story:
            "This traditional combination has been the heart of Mithila meals for centuries, representing the perfect balance of protein and carbohydrates.",
        },
        {
          name: "Sattu Paratha",
          description: "Stuffed flatbread with roasted gram flour and spices",
          price: "₹120",
          isVeg: true,
          image: "/sattuparatha.jpg?height=300&width=400",
          ingredients: ["Wheat Flour", "Roasted Gram Flour", "Onions", "Green Chilies", "Coriander", "Mustard Oil"],
          preparationTime: "20 minutes",
          spiceLevel: 3,
          calories: "350 kcal",
          allergens: ["Gluten"],
          story:
            "A nutritious and filling bread that has sustained farmers and workers in the Mithila region for generations.",
        },
        {
          name: "Mithila Fish Curry",
          description: "Fresh fish cooked in traditional Mithila spices and mustard oil",
          price: "₹280",
          isVeg: false,
          isSpecial: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Fresh River Fish", "Mustard Oil", "Panch Phoron", "Turmeric", "Red Chilies", "Tomatoes"],
          preparationTime: "30 minutes",
          spiceLevel: 4,
          calories: "320 kcal",
          allergens: ["Fish"],
          story:
            "Prepared with fish from the sacred rivers of Mithila, this curry represents the region's connection to its waterways.",
        },
        {
          name: "Chokha Platter",
          description: "Mashed vegetables (potato, eggplant, tomato) with mustard oil",
          price: "₹150",
          isVeg: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: [
            "Roasted Potatoes",
            "Roasted Eggplant",
            "Roasted Tomatoes",
            "Mustard Oil",
            "Green Chilies",
            "Onions",
          ],
          preparationTime: "35 minutes",
          spiceLevel: 3,
          calories: "280 kcal",
          allergens: [],
          story:
            "A rustic dish that celebrates the simple flavors of roasted vegetables, enhanced with aromatic mustard oil.",
        },
      ],
    },
    {
      title: "मिठाई (Sweets)",
      items: [
        {
          name: "Thekua",
          description: "Traditional sweet made with wheat flour, jaggery, and ghee",
          price: "₹80",
          isVeg: true,
          isSpecial: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Wheat Flour", "Jaggery", "Ghee", "Coconut", "Fennel Seeds", "Cardamom"],
          preparationTime: "45 minutes",
          spiceLevel: 0,
          calories: "180 kcal",
          allergens: ["Gluten", "Dairy"],
          story: "A sacred sweet offered during Chhath Puja, symbolizing devotion and tradition in Mithila culture.",
        },
        {
          name: "Malpua",
          description: "Sweet pancakes soaked in sugar syrup, served hot",
          price: "₹100",
          isVeg: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["All-purpose Flour", "Milk", "Sugar", "Cardamom", "Ghee", "Pistachios"],
          preparationTime: "25 minutes",
          spiceLevel: 0,
          calories: "250 kcal",
          allergens: ["Gluten", "Dairy", "Nuts"],
          story:
            "These golden, syrup-soaked pancakes are a festival favorite, bringing sweetness to every celebration.",
        },
        {
          name: "Kheer",
          description: "Creamy rice pudding with cardamom and nuts",
          price: "₹90",
          isVeg: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Basmati Rice", "Full-fat Milk", "Sugar", "Cardamom", "Almonds", "Pistachios", "Saffron"],
          preparationTime: "40 minutes",
          spiceLevel: 0,
          calories: "220 kcal",
          allergens: ["Dairy", "Nuts"],
          story: "A creamy delight that graces every auspicious occasion, representing prosperity and joy.",
        },
      ],
    },
    {
      title: "पेय (Beverages)",
      items: [
        {
          name: "Lassi",
          description: "Traditional yogurt-based drink, sweet or salted",
          price: "₹60",
          isVeg: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Fresh Yogurt", "Sugar/Salt", "Cardamom", "Rose Water", "Mint"],
          preparationTime: "5 minutes",
          spiceLevel: 0,
          calories: "150 kcal",
          allergens: ["Dairy"],
          story: "A cooling beverage that provides relief from the heat while aiding digestion after hearty meals.",
        },
        {
          name: "Sattu Drink",
          description: "Refreshing drink made with roasted gram flour",
          price: "₹50",
          isVeg: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Roasted Gram Flour", "Water", "Salt", "Lemon", "Mint", "Black Salt"],
          preparationTime: "3 minutes",
          spiceLevel: 1,
          calories: "120 kcal",
          allergens: [],
          story: "A nutritious and energizing drink that has been the go-to refreshment for laborers and travelers.",
        },
        {
          name: "Masala Chai",
          description: "Spiced tea brewed with traditional Mithila spices",
          price: "₹30",
          isVeg: true,
          image: "/placeholder.svg?height=300&width=400",
          ingredients: ["Black Tea", "Milk", "Cardamom", "Cinnamon", "Ginger", "Cloves", "Sugar"],
          preparationTime: "8 minutes",
          spiceLevel: 2,
          calories: "80 kcal",
          allergens: ["Dairy"],
          story: "The perfect blend of spices that awakens the senses and brings people together for conversations.",
        },
      ],
    },
  ]

  const SpiceLevel = ({ level }: { level: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i < level ? "bg-red-500" : "bg-gray-200"}`} />
      ))}
      <span className="text-xs text-gray-600 ml-1">
        {level === 0 ? "Mild" : level <= 2 ? "Medium" : level <= 3 ? "Spicy" : "Very Spicy"}
      </span>
    </div>
  )

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">हमारा मेन्यू</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-orange-700 mb-6">Our Menu</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the authentic flavors of Mithila with our carefully curated selection of traditional dishes
          </p>
        </div>

        <div className="space-y-12">
          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="text-2xl font-bold text-orange-800 mb-8 text-center">{category.title}</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {item.isSpecial && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Special
                        </Badge>
                      )}
                      <Badge variant={item.isVeg ? "secondary" : "destructive"} className="absolute top-3 right-3">
                        {item.isVeg ? "🌱 Veg" : "🍖 Non-Veg"}
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-bold text-orange-800">{item.name}</CardTitle>
                        <span className="text-xl font-bold text-orange-600">{item.price}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-4">
                      <p className="text-gray-700 leading-relaxed text-sm">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <SpiceLevel level={item.spiceLevel} />
                        <span className="text-xs text-gray-500">{item.preparationTime}</span>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-opacity-80 bg-white backdrop-blur-sm max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                              {item.name}
                              {item.isSpecial && (
                                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                                  <Star className="w-3 h-3 mr-1" />
                                  Special
                                </Badge>
                              )}
                            </DialogTitle>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* Image */}
                            <div className="aspect-video overflow-hidden rounded-lg">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <span className="font-medium text-orange-800">Price</span>
                                <span className="text-xl font-bold text-orange-600">{item.price}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <span className="font-medium text-orange-800">Type</span>
                                <Badge variant={item.isVeg ? "secondary" : "destructive"}>
                                  {item.isVeg ? "🌱 Vegetarian" : "🍖 Non-Vegetarian"}
                                </Badge>
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <h4 className="font-semibold text-orange-800 mb-2">Description</h4>
                              <p className="text-gray-700 leading-relaxed">{item.description}</p>
                            </div>

                            {/* Story */}
                            {item.story && (
                              <div>
                                <h4 className="font-semibold text-orange-800 mb-2">Cultural Story</h4>
                                <p className="text-gray-700 leading-relaxed italic">{item.story}</p>
                              </div>
                            )}

                            {/* Ingredients */}
                            <div>
                              <h4 className="font-semibold text-orange-800 mb-2">Ingredients</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.ingredients.map((ingredient, idx) => (
                                  <Badge key={idx} variant="outline" className="border-orange-300 text-orange-700">
                                    {ingredient}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-orange-800 mb-2">Preparation Time</h4>
                                <p className="text-gray-700">{item.preparationTime}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-orange-800 mb-2">Calories</h4>
                                <p className="text-gray-700">{item.calories}</p>
                              </div>
                            </div>

                            {/* Spice Level */}
                            <div>
                              <h4 className="font-semibold text-orange-800 mb-2">Spice Level</h4>
                              <SpiceLevel level={item.spiceLevel} />
                            </div>

                            {/* Allergens */}
                            {item.allergens.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-orange-800 mb-2">Allergens</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.allergens.map((allergen, idx) => (
                                    <Badge key={idx} variant="destructive" className="text-xs">
                                      ⚠️ {allergen}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Button */}
                            <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 text-lg font-semibold">
                              Add to Order - {item.price}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-4">
            All dishes are prepared fresh to order using traditional recipes and authentic spices
          </p>
          <p className="text-sm text-gray-500">
            Prices are subject to change. Please inform us of any allergies or dietary restrictions.
          </p>
        </div>
      </div>
    </section>
  )
}
