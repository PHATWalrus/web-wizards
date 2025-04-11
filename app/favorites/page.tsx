"use client"

import { useState } from "react"
import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPin, Clock, Heart, Trash2, Store } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock favorites data
const initialFavorites = [
  {
    id: "1",
    title: "Sunrise Cafe",
    description: "Cozy cafe with specialty coffee, pastries, and breakfast options.",
    price: "₹200 for two",
    category: "Cafe",
    rating: 4.8,
    location: "Indiranagar",
    image: "https://source.unsplash.com/random/300x200/?cafe",
    openHours: "8 AM - 10 PM",
  },
  {
    id: "2",
    title: "Page Turner Books",
    description: "Independent bookstore with a curated collection of fiction and non-fiction titles.",
    price: "₹500 avg. purchase",
    category: "Bookstore",
    rating: 4.9,
    location: "Koramangala",
    image: "https://source.unsplash.com/random/300x200/?bookstore",
    openHours: "10 AM - 8 PM",
  },
  {
    id: "3",
    title: "Artisan Bakery",
    description: "Fresh bread, pastries, and cakes made with traditional recipes.",
    price: "₹350 for two",
    category: "Bakery",
    rating: 4.7,
    location: "Jayanagar",
    image: "https://source.unsplash.com/random/300x200/?bakery",
    openHours: "7 AM - 9 PM",
  },
  {
    id: "4",
    title: "Green Earth Organics",
    description: "Organic fruits, vegetables, and grocery items from local farmers.",
    price: "₹800 avg. purchase",
    category: "Grocery",
    rating: 4.6,
    location: "HSR Layout",
    image: "https://source.unsplash.com/random/300x200/?grocery",
    openHours: "9 AM - 9 PM",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedToolbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold">Your Favorites</h1>
              <p className="text-muted-foreground mt-1">
                {favorites.length} {favorites.length === 1 ? "business" : "businesses"} saved
              </p>
            </motion.div>

            <Link href="/browse">
              <Button className="mt-4 md:mt-0 rounded-full">
                <Store className="mr-2 h-4 w-4" />
                Browse More Businesses
              </Button>
            </Link>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden transition-all hover:shadow-lg rounded-3xl border-0 shadow-md h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden rounded-t-3xl relative">
                      <img
                        src={favorite.image || "/placeholder.svg"}
                        alt={favorite.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white hover:text-red-500"
                        onClick={() => removeFavorite(favorite.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <Badge className="rounded-full">{favorite.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{favorite.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{favorite.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                      <div className="flex items-center gap-2">
                        <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm">{favorite.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{favorite.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{favorite.openHours}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-lg font-bold">{favorite.price}</span>
                      <Link href={`/business/${favorite.id}`}>
                        <Button className="rounded-full">Visit</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring and save your favorite local businesses here.
              </p>
              <Link href="/browse">
                <Button className="rounded-full">
                  <Store className="mr-2 h-4 w-4" />
                  Browse Businesses
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
