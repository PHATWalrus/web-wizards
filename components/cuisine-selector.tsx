"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Coffee, Utensils, Pizza, Cake, ShoppingBag, Book, Shirt, Gift, Palette, Laptop } from "lucide-react"

type Category = {
  id: string
  name: string
  icon: React.ReactNode
}

interface CategorySelectorProps {
  onCategorySelect?: (category: string) => void
  selectedCategory?: string
}

export function CategorySelector({ onCategorySelect, selectedCategory = "all" }: CategorySelectorProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    // If a selectedCategory is provided and it's not 'all', select it
    if (selectedCategory && selectedCategory !== "all") {
      setSelectedCategories([selectedCategory])
    } else {
      setSelectedCategories([])
    }
  }, [selectedCategory])

  const categories: Category[] = [
    { id: "cafe", name: "Cafes", icon: <Coffee className="h-4 w-4" /> },
    { id: "restaurant", name: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { id: "bakery", name: "Bakeries", icon: <Cake className="h-4 w-4" /> },
    { id: "grocery", name: "Grocery", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "bookstore", name: "Bookstores", icon: <Book className="h-4 w-4" /> },
    { id: "clothing", name: "Clothing", icon: <Shirt className="h-4 w-4" /> },
    { id: "gifts", name: "Gift Shops", icon: <Gift className="h-4 w-4" /> },
    { id: "art", name: "Art Galleries", icon: <Palette className="h-4 w-4" /> },
    { id: "technology", name: "Tech Shops", icon: <Laptop className="h-4 w-4" /> },
    { id: "pizza", name: "Pizza", icon: <Pizza className="h-4 w-4" /> },
  ]

  const toggleCategory = (categoryId: string) => {
    if (onCategorySelect) {
      // If we have an external handler, use it
      onCategorySelect(categoryId)
    } else {
      // Otherwise, handle internally
      setSelectedCategories((prev) =>
        prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [categoryId],
      )
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-medium mb-4">Browse by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={
                selectedCategories.includes(category.id) || selectedCategory === category.id ? "default" : "outline"
              }
              className={`rounded-full flex items-center gap-2 ${
                selectedCategories.includes(category.id) || selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white/80 dark:bg-black/80 backdrop-blur-md hover:bg-white/90 dark:hover:bg-black/90 border border-white/20 dark:border-black/20"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
