"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    title: "Creative Story Generator",
    description: "Generate engaging short stories with complex characters and plot twists.",
    price: "₹499",
    category: "Creative Writing",
    rating: 4.8,
    image: "https://picsum.photos/id/24/600/400",
    viewCount: 128,
  },
  {
    id: 2,
    title: "SEO Content Optimizer",
    description: "Create SEO-optimized content that ranks well on search engines.",
    price: "₹799",
    category: "Marketing",
    rating: 4.9,
    image: "https://picsum.photos/id/48/600/400",
    viewCount: 256,
  },
  {
    id: 3,
    title: "Code Refactoring Assistant",
    description: "Improve your code quality with smart refactoring suggestions.",
    price: "₹1,299",
    category: "Programming",
    rating: 4.7,
    image: "https://picsum.photos/id/0/600/400",
    viewCount: 192,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    <Eye className="h-3 w-3" />
                    <span>{product.viewCount} views</span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription className="mt-2">{product.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-bold">{product.price}</span>
                  <Link href={`/products/${product.id}`}>
                    <Button className="rounded-full">Buy Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
