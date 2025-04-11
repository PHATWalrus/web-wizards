"use client"

import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-lg max-w-none">
              <p>
                Welcome to Dukaan. By accessing our website at Dukaan.com, you agree to these terms of service. Please
                read them carefully.
              </p>

              <h2>1. Using our Services</h2>
              <p>
                You must follow any policies made available to you within the Services. You may use our Services only as
                permitted by law. We may suspend or stop providing our Services to you if you do not comply with our
                terms or policies or if we are investigating suspected misconduct.
              </p>

              <h2>2. Privacy and Copyright Protection</h2>
              <p>
                Dukaan's privacy policies explain how we treat your personal data and protect your privacy when you use
                our Services. By using our Services, you agree that Dukaan can use such data in accordance with our
                privacy policies.
              </p>

              <h2>3. Your Content in our Services</h2>
              <p>
                Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership
                of any intellectual property rights that you hold in that content. When you upload, submit, store, send
                or receive content to or through our Services, you give Dukaan a worldwide license to use, host, store,
                reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display and
                distribute such content.
              </p>

              <h2>4. Modifying and Terminating our Services</h2>
              <p>
                We are constantly changing and improving our Services. We may add or remove functionalities or features,
                and we may suspend or stop a Service altogether. You can stop using our Services at any time, although
                we'll be sorry to see you go. Dukaan may also stop providing Services to you, or add or create new
                limits to our Services at any time.
              </p>

              <h2>5. Our Warranties and Disclaimers</h2>
              <p>
                We provide our Services using a commercially reasonable level of skill and care and we hope that you
                will enjoy using them. But there are certain things that we don't promise about our Services. OTHER THAN
                AS EXPRESSLY SET OUT IN THESE TERMS OR ADDITIONAL TERMS, NEITHER DUKAAN NOR ITS SUPPLIERS OR
                DISTRIBUTORS MAKE ANY SPECIFIC PROMISES ABOUT THE SERVICES.
              </p>

              <h2>6. Liability for our Services</h2>
              <p>
                WHEN PERMITTED BY LAW, DUKAAN, AND DUKAAN'S SUPPLIERS AND DISTRIBUTORS, WILL NOT BE RESPONSIBLE FOR LOST
                PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES OR INDIRECT, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
                DAMAGES.
              </p>

              <h2>7. Business uses of our Services</h2>
              <p>
                If you are using our Services on behalf of a business, that business accepts these terms. It will hold
                harmless and indemnify Dukaan and its affiliates, officers, agents, and employees from any claim, suit
                or action arising from or related to the use of the Services or violation of these terms, including any
                liability or expense arising from claims, losses, damages, suits, judgments, litigation costs and
                attorneys' fees.
              </p>

              <h2>8. About these Terms</h2>
              <p>
                We may modify these terms or any additional terms that apply to a Service to, for example, reflect
                changes to the law or changes to our Services. You should look at the terms regularly. We'll post notice
                of modifications to these terms on this page. Changes will not apply retroactively and will become
                effective no sooner than fourteen days after they are posted. However, changes addressing new functions
                for a Service or changes made for legal reasons will be effective immediately.
              </p>

              <p className="mt-8 text-muted-foreground">Last updated: May 12, 2023</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
