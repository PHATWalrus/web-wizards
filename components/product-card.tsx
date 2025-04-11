"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart } from "lucide-react"

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    price: string
    image: string
    category: string
  }
  businessName: string
}

export function ProductCard({ product, businessName }: ProductProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false)
      // Add to cart logic here
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden rounded-3xl border-0 shadow-md h-full flex flex-col">
        <div className="relative">
          <img
            src={product.image || "https://source.unsplash.com/random/300x200/?product"}
            alt={product.name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>
          <Badge className="absolute top-2 left-2 rounded-full">{product.category}</Badge>
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="mb-2">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{businessName}</p>
          </div>
          <p className="text-sm line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <span className="font-bold">{product.price}</span>
          <Button size="sm" className="rounded-full" onClick={handleAddToCart} disabled={isAddingToCart}>
            {isAddingToCart ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </div>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
