"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16 container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">
            Join discussions, share feedback, and help improve the local marketplace experience.
          </p>
        </motion.div>

        <Tabs defaultValue="discussions">
          <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
            <TabsTrigger value="discussions" className="rounded-full">
              Discussions
            </TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-full">
              Feedback
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-full">
              Local Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="mt-6">
            <div className="grid gap-6">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{discussion.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">{discussion.description}</p>
                        </div>
                        <Badge className="flex items-center gap-1 rounded-full">
                          <MessageSquare className="h-3 w-3" />
                          {discussion.comments} comments
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border-2 border-white"
                            >
                              {String.fromCharCode(64 + i)}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          and {discussion.participants - 3} others participating
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Last activity {discussion.lastActivity}</span>
                      </div>
                      <Button className="rounded-full">Join Discussion</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <div className="grid gap-6">
              {feedbacks.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{feedback.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">{feedback.description}</p>
                        </div>
                        <Badge
                          variant={feedback.status === "Implemented" ? "default" : "secondary"}
                          className="rounded-full"
                        >
                          {feedback.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Community Support</span>
                          <span>{feedback.votes} votes</span>
                        </div>
                        <Progress value={feedback.votes / 2} className="h-2 rounded-full" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 rounded-full" variant="outline">
                        <ThumbsUp className="mr-2 h-4 w-4" /> Support This
                      </Button>
                      <Button className="flex-1 rounded-full">
                        <MessageSquare className="mr-2 h-4 w-4" /> Comment
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 md:h-auto">
                        <img
                          src="https://source.unsplash.com/random/300x200/?event"
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <Badge className="rounded-full">{event.date}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4 mb-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Award className="h-4 w-4" />
                            <span>Hosted by {event.host}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{event.attendees} attending</span>
                          <Button className="rounded-full">RSVP</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

const discussions = [
  {
    id: 1,
    title: "Best cafes for remote work?",
    description: "Looking for cafes with good wifi, power outlets, and a quiet environment for remote work.",
    comments: 24,
    participants: 15,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    title: "Local artisan markets this weekend",
    description: "Share information about weekend markets where local artisans sell their products.",
    comments: 18,
    participants: 12,
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    title: "Restaurant recommendations for vegetarians",
    description: "What are the best local restaurants with good vegetarian options?",
    comments: 32,
    participants: 20,
    lastActivity: "1 day ago",
  },
]

const feedbacks = [
  {
    id: 1,
    title: "Add business hours to search results",
    description:
      "It would be helpful to see business hours directly in the search results without having to click on each business.",
    status: "Under Review",
    votes: 86,
  },
  {
    id: 2,
    title: "Allow filtering by distance",
    description: "Add an option to filter businesses by distance from my current location.",
    status: "Implemented",
    votes: 124,
  },
  {
    id: 3,
    title: "Add a loyalty program for regular customers",
    description: "Create a system where customers can earn points for visiting local businesses and get rewards.",
    status: "Planned",
    votes: 95,
  },
]

const events = [
  {
    id: 1,
    title: "Local Business Networking Breakfast",
    description: "Connect with other local business owners over breakfast and coffee.",
    date: "May 15",
    time: "8:00 AM - 10:00 AM",
    host: "Chamber of Commerce",
    attendees: 45,
  },
  {
    id: 2,
    title: "Weekend Farmers Market",
    description: "Fresh produce, handmade crafts, and local food vendors all in one place.",
    date: "Every Saturday",
    time: "9:00 AM - 2:00 PM",
    host: "City Council",
    attendees: 200,
  },
  {
    id: 3,
    title: "Small Business Workshop: Digital Marketing",
    description: "Learn effective digital marketing strategies for your local business.",
    date: "May 22",
    time: "6:00 PM - 8:00 PM",
    host: "Digital Marketing Association",
    attendees: 32,
  },
]
