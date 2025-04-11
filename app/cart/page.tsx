"use client"

import { useState } from "react"
import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Specialty House Blend",
    price: 180,
    quantity: 2,
    image: "https://source.unsplash.com/random/100x100/?coffee",
    businessName: "Sunrise Cafe",
  },
  {
    id: "3",
    name: "Classic Novel Collection",
    price: 1200,
    quantity: 1,
    image: "https://source.unsplash.com/random/100x100/?books",
    businessName: "Page Turner Books",
  },
  {
    id: "6",
    name: "Sourdough Bread",
    price: 150,
    quantity: 3,
    image: "https://source.unsplash.com/random/100x100/?bread",
    businessName: "Artisan Bakery",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "local10") {
      setIsPromoApplied(true)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = isPromoApplied ? subtotal * 0.1 : 0
  const deliveryFee = 50
  const total = subtotal - discount + deliveryFee

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
            Your Cart
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Shopping Cart ({cartItems.length} items)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 pb-6 border-b last:border-0 last:pb-0"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.businessName}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 p-0"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{item.price * item.quantity}</p>
                            <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="rounded-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                    <Button className="rounded-full">Update Cart</Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {isPromoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm font-medium mb-2">Promo Code</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          className="rounded-full"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={applyPromoCode}
                          disabled={isPromoApplied}
                        >
                          Apply
                        </Button>
                      </div>
                      {isPromoApplied && (
                        <p className="text-sm text-green-600 mt-2">Promo code applied successfully!</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/products">
                <Button className="rounded-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
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
