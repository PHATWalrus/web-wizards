"use client"

import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ReadmePage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedToolbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8">Dukaan Documentation</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <p className="mb-4">
                  Welcome to Dukaan! This documentation will help you set up and use the application effectively.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Google Maps Integration</h2>
                <Card className="rounded-xl border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                      <AlertCircle className="h-5 w-5" />
                      Important: Google Maps API Key Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-yellow-700 dark:text-yellow-200">
                    <p>
                      To use the Google Maps feature in business profiles, you need to provide a valid Google Maps API
                      key. The application will prompt you to enter this key when you visit a business profile page.
                    </p>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-bold mt-6 mb-3">How to Get a Google Maps API Key</h3>
                <ol className="list-decimal pl-6 space-y-4 mb-6">
                  <li>
                    <strong>Create a Google Cloud Project:</strong> Visit the{" "}
                    <a
                      href="https://console.cloud.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Cloud Console
                    </a>{" "}
                    and create a new project.
                  </li>
                  <li>
                    <strong>Enable the Maps JavaScript API:</strong> In your project, navigate to "APIs & Services" →
                    "Library" and enable the "Maps JavaScript API".
                  </li>
                  <li>
                    <strong>Create API Key:</strong> Go to "APIs & Services" → "Credentials" and click "Create
                    Credentials" → "API Key".
                  </li>
                  <li>
                    <strong>Restrict Your Key (Recommended):</strong> For security, restrict your API key to only the
                    Maps JavaScript API and set HTTP referrer restrictions to your domain.
                  </li>
                  <li>
                    <strong>Copy Your API Key:</strong> Copy the generated API key and paste it when prompted in the
                    Dukaan application.
                  </li>
                </ol>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 relative">
                  <pre className="text-sm overflow-x-auto">
                    <code>
                      {`// Example of how to use the Google Maps API in JavaScript
const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
});`}
                    </code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() =>
                      copyToClipboard(`// Example of how to use the Google Maps API in JavaScript
const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
});`)
                    }
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <Card className="rounded-xl mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Where to Enter Your API Key</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      When you visit any business profile page, you'll see a prompt to enter your Google Maps API key if
                      it hasn't been set yet. The key will be saved in your browser's local storage for future use.
                    </p>
                    <p>
                      You can update your API key at any time by visiting a business profile page and entering a new key
                      in the provided form.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Navigation</h2>
                <p className="mb-4">The application provides several ways to navigate between pages:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>
                    <strong>Top Navigation Bar:</strong> Use the icons in the top navigation bar to access Home, Browse,
                    Favorites, Cart, and Notifications.
                  </li>
                  <li>
                    <strong>Search:</strong> Use the search bar to find businesses by name or description.
                  </li>
                  <li>
                    <strong>Category Filters:</strong> Click on category buttons to filter businesses by type.
                  </li>
                  <li>
                    <strong>Business Cards:</strong> Click on "View Details" to see more information about a business.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                <p className="mb-4">For demonstration purposes, you can use the following credentials to sign in:</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <p>
                    <strong>Email:</strong> user@example.com
                  </p>
                  <p>
                    <strong>Password:</strong> password
                  </p>
                </div>
                <p>
                  Note: This is a demo application, so no actual authentication is performed. Your data is not stored or
                  transmitted to any server.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Support</h2>
                <p>
                  If you have any questions or need assistance, please contact our support team at{" "}
                  <a href="mailto:support@dukaan.example.com" className="text-primary hover:underline">
                    support@dukaan.example.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
