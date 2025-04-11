"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, MapPin, Clock, Phone, Globe, IndianRupee } from "lucide-react"
import { motion } from "framer-motion"
import { StarIcon } from "@radix-ui/react-icons"

export default function ListBusinessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16 container py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          List Your Business
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="new">
            <TabsList className="grid w-full grid-cols-2 rounded-full p-1">
              <TabsTrigger value="new" className="rounded-full">
                New Listing
              </TabsTrigger>
              <TabsTrigger value="listings" className="rounded-full">
                My Listings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>List Your Business</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Business Name</label>
                      <Input placeholder="Enter your business name" className="rounded-full" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Describe your business..." className="rounded-xl min-h-[100px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select>
                          <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cafe">Cafe</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="bookstore">Bookstore</SelectItem>
                            <SelectItem value="bakery">Bakery</SelectItem>
                            <SelectItem value="grocery">Grocery</SelectItem>
                            <SelectItem value="crafts">Crafts</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Business location" className="pl-9 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Opening Hours</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., 9 AM - 6 PM" className="pl-9 rounded-full" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Contact Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Your business phone" className="pl-9 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Website (Optional)</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="https://yourbusiness.com" className="pl-9 rounded-full" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Average Price</label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., ₹200 for two" className="pl-9 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload Business Photos</label>
                      <div className="border-2 border-dashed rounded-2xl p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Drag and drop your business photos here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          (Upload at least 3 photos of your business)
                        </p>
                        <Input type="file" className="hidden" multiple />
                      </div>
                    </div>

                    <Button className="w-full rounded-full">Submit Listing</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-6"
              >
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3">
                      <img
                        src="https://source.unsplash.com/random/300x200/?cafe"
                        alt="Sunrise Cafe"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">Sunrise Cafe</h3>
                        <Badge className="rounded-full">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Cozy cafe with specialty coffee, pastries, and breakfast options.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>Indiranagar</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>8 AM - 10 PM</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span>4.8 (42 reviews)</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">₹200 for two</span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" className="rounded-full">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" className="rounded-full">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
