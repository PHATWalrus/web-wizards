"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon, History, Settings, Heart, MapPin, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16 container py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-6 mb-8"
          >
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="https://source.unsplash.com/random/100x100/?portrait" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Rahul Sharma</h1>
              <p className="text-muted-foreground">Joined December 2023</p>
              <div className="flex items-center gap-2 mt-2">
                <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>4.9 Rating</span>
                <span className="text-muted-foreground">• 50 Reviews</span>
              </div>
            </div>
            <Button className="rounded-full">Edit Profile</Button>
          </motion.div>

          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
              <TabsTrigger value="activity" className="rounded-full">
                Activity
              </TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-full">
                Favorites
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-full">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Activity Items */}
                      <div className="flex justify-between items-center py-4 border-b">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <img
                              src="https://source.unsplash.com/random/48x48/?bookstore"
                              alt="Page Turner Books"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Visited "Page Turner Books"</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                        </div>
                        <Badge className="rounded-full">Bookstore</Badge>
                      </div>

                      <div className="flex justify-between items-center py-4 border-b">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <img
                              src="https://source.unsplash.com/random/48x48/?cafe"
                              alt="Sunrise Cafe"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Reviewed "Sunrise Cafe"</p>
                            <div className="flex items-center gap-2 mt-1">
                              <StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <p className="text-sm text-muted-foreground">Rated 5 stars • 5 days ago</p>
                            </div>
                          </div>
                        </div>
                        <Badge className="rounded-full">Cafe</Badge>
                      </div>

                      <div className="flex justify-between items-center py-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <img
                              src="https://source.unsplash.com/random/48x48/?bakery"
                              alt="Artisan Bakery"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Added "Artisan Bakery" to favorites</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                              <p className="text-sm text-muted-foreground">1 week ago</p>
                            </div>
                          </div>
                        </div>
                        <Badge className="rounded-full">Bakery</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="rounded-3xl overflow-hidden border-0 shadow-md">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 h-32 sm:h-auto">
                          <img
                            src="https://source.unsplash.com/random/150x150/?cafe"
                            alt="Business"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold">
                              {["Sunrise Cafe", "Page Turner Books", "Artisan Bakery", "Green Earth Organics"][i - 1]}
                            </h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500">
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-yellow-500">
                            <StarIcon className="h-4 w-4 fill-current" />
                            <span className="text-sm">{[4.8, 4.9, 4.7, 4.6][i - 1]}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{["Indiranagar", "Koramangala", "Jayanagar", "HSR Layout"][i - 1]}</span>
                          </div>
                          <Button size="sm" className="mt-3 rounded-full">
                            Visit
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Display Name</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-4 py-2 rounded-full glass-input"
                          defaultValue="Rahul Sharma"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          className="w-full mt-1 px-4 py-2 rounded-full glass-input"
                          defaultValue="rahul@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full mt-1 px-4 py-2 rounded-full glass-input"
                          defaultValue="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notification Preferences</label>
                        <div className="mt-2 space-y-3">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="rounded text-primary" />
                            <span>New reviews on businesses you've visited</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="rounded text-primary" />
                            <span>Special offers from favorite businesses</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="rounded text-primary" />
                            <span>Community events in your area</span>
                          </label>
                        </div>
                      </div>
                      <Button className="rounded-full">Save Changes</Button>
                    </div>
                  </CardContent>
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
