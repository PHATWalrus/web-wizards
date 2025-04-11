"use client"

import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p>
                This Privacy Policy describes how Dukaan collects, uses, and discloses your personal information when
                you visit or make a purchase from the Site.
              </p>

              <h2>1. Personal Information We Collect</h2>
              <p>
                When you visit the Site, we collect certain information about your device, your interaction with the
                Site, and information necessary to process your purchases. We may also collect additional information if
                you contact us for customer support. In this Privacy Policy, we refer to any information that can
                uniquely identify an individual (including the information below) as "Personal Information".
              </p>

              <h3>Information We Collect Automatically</h3>
              <ul>
                <li>Log and Usage Data: browser information, time spent on Site, pages visited</li>
                <li>Device Information: type of device, operating system, and browser type</li>
                <li>Location Data: IP address and approximate location</li>
              </ul>

              <h3>Information You Provide to Us</h3>
              <ul>
                <li>
                  Order Information: name, billing address, shipping address, payment information, email address, phone
                  number
                </li>
                <li>Account Information: name, email address, password, purchase history, preferences</li>
                <li>Customer Support Information: any information you provide to your support team</li>
              </ul>

              <h2>2. How We Use Your Personal Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our Services, including to:</p>

              <ul>
                <li>Process your orders and payments</li>
                <li>Provide customer support</li>
                <li>Send you administrative information, such as updates to our terms, conditions, and policies</li>
                <li>Send you marketing and promotional communications (if you have opted in)</li>
                <li>Personalize your experience on our platform</li>
                <li>Detect, prevent, and address technical issues and fraudulent activities</li>
                <li>Respond to your inquiries and fulfill your requests</li>
              </ul>

              <h2>3. Sharing Your Personal Information</h2>
              <p>
                We share your Personal Information with service providers to help us provide our services and fulfill
                our contracts with you. We may share your Personal Information with:
              </p>

              <ul>
                <li>Payment processors</li>
                <li>Delivery and logistics providers</li>
                <li>Marketing and analytics partners</li>
                <li>Customer service providers</li>
              </ul>

              <p>
                We may also share your Personal Information to comply with applicable laws and regulations, to respond
                to a subpoena, search warrant or other lawful request for information we receive, or to otherwise
                protect our rights.
              </p>

              <h2>4. Your Rights</h2>
              <p>
                If you are a resident of the EU, UK, or California, you have certain data protection rights, including:
              </p>

              <ul>
                <li>The right to access, update or delete your personal information</li>
                <li>The right of rectification</li>
                <li>The right to object to processing</li>
                <li>The right of restriction</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>

              <h2>5. Cookies</h2>
              <p>
                A cookie is a small amount of information that's downloaded to your computer or device when you visit
                our Site. We use cookies to:
              </p>

              <ul>
                <li>Remember your preferences and settings</li>
                <li>Understand how you interact with our Site</li>
                <li>Analyze the performance of our Site and services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>

              <h2>6. Changes</h2>
              <p>
                We may update this privacy policy from time to time in order to reflect, for example, changes to our
                practices or for other operational, legal or regulatory reasons.
              </p>

              <h2>7. Contact</h2>
              <p>
                For more information about our privacy practices, if you have questions, or if you would like to make a
                complaint, please contact us by e-mail at privacy@dukaan.com or by mail using the details provided
                below:
              </p>

              <p>Dukaan, 123 Market Street, Bangalore, Karnataka 560001, India</p>

              <p className="mt-8 text-muted-foreground">Last updated: May 12, 2023</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
