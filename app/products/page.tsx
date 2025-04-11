"use client"

import { useState } from "react"
import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { CategorySelector } from "@/components/cuisine-selector"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Filter, Search } from "lucide-react"

// Mock products data
const products = [
  {
    id: "1",
    name: "Specialty House Blend",
    description: "Our signature coffee blend with notes of chocolate and caramel.",
    price: "₹180",
    image: "https://picsum.photos/id/766/300/300",
    category: "Coffee",
    businessName: "Sunrise Cafe",
  },
  {
    id: "2",
    name: "Artisan Croissant",
    description: "Flaky, buttery croissant made fresh daily.",
    price: "₹120",
    image: "https://picsum.photos/id/431/300/300",
    category: "Pastry",
    businessName: "Sunrise Cafe",
  },
  {
    id: "3",
    name: "Classic Novel Collection",
    description: "Set of 5 classic novels in hardcover edition.",
    price: "₹1,200",
    image: "https://picsum.photos/id/24/300/300",
    category: "Books",
    businessName: "Page Turner Books",
  },
  {
    id: "4",
    name: "Handcrafted Ceramic Mug",
    description: "Locally made ceramic mug, perfect for your morning coffee.",
    price: "₹350",
    image: "https://picsum.photos/id/30/300/300",
    category: "Crafts",
    businessName: "Craft Corner",
  },
  {
    id: "5",
    name: "Organic Vegetable Box",
    description: "Weekly box of seasonal organic vegetables from local farmers.",
    price: "₹500",
    image: "https://picsum.photos/id/292/300/300",
    category: "Grocery",
    businessName: "Green Earth Organics",
  },
  {
    id: "6",
    name: "Sourdough Bread",
    description: "Freshly baked sourdough bread using traditional methods.",
    price: "₹150",
    image: "https://picsum.photos/id/225/300/300",
    category: "Bakery",
    businessName: "Artisan Bakery",
  },
  {
    id: "7",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: "₹2,500",
    image: "https://picsum.photos/id/0/300/300",
    category: "Technology",
    businessName: "Tech Wizards",
  },
  {
    id: "8",
    name: "Handmade Soap Set",
    description: "Set of 3 handmade soaps with natural ingredients.",
    price: "₹450",
    image: "https://picsum.photos/id/118/300/300",
    category: "Crafts",
    businessName: "Craft Corner",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)

  // Filter products based on search query and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.businessName.toLowerCase().includes(searchQuery.toLowerCase())

    const price = Number.parseInt(product.price.replace(/[^\d]/g, ""))
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

    return matchesSearch && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number.parseInt(a.price.replace(/[^\d]/g, "")) - Number.parseInt(b.price.replace(/[^\d]/g, ""))
    } else if (sortBy === "price-high") {
      return Number.parseInt(b.price.replace(/[^\d]/g, "")) - Number.parseInt(a.price.replace(/[^\d]/g, ""))
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    // Default: popularity (no change to order)
    return 0
  })

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedToolbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8"
          >
            Discover Local Products
          </motion.h1>

          <div className="mb-8">
            <CategorySelector />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-full md:w-64 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}
            >
              <div className="glass-card rounded-3xl p-6 space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                        <SelectItem value="pastry">Pastry</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="crafts">Crafts</SelectItem>
                        <SelectItem value="grocery">Grocery</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business</label>
                    <Select>
                      <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="All Businesses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Businesses</SelectItem>
                        <SelectItem value="sunrise-cafe">Sunrise Cafe</SelectItem>
                        <SelectItem value="page-turner-books">Page Turner Books</SelectItem>
                        <SelectItem value="craft-corner">Craft Corner</SelectItem>
                        <SelectItem value="green-earth-organics">Green Earth Organics</SelectItem>
                        <SelectItem value="artisan-bakery">Artisan Bakery</SelectItem>
                        <SelectItem value="tech-wizards">Tech Wizards</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range (₹)</label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={3000} step={100} className="py-4" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="rounded-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full rounded-full">Apply Filters</Button>
              </div>
            </motion.aside>

            {/* Products Grid */}
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="rounded-full glass-input pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full sm:w-auto rounded-full md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} businessName={product.businessName} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-full"
                      onClick={() => {
                        setSearchQuery("")
                        setPriceRange([0, 3000])
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
