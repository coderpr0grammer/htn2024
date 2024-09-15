import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Notfa.co Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none p-6 sm:p-8">
          <p className="text-gray-600 mb-6">Welcome to Notfa.co. These Terms of Service ("Terms") govern your use of our website and services. Please read them carefully.</p>

          {[
            { title: "1. Acceptance of Terms", content: "By accessing or using Notfa.co, you agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services." },
            { title: "2. Not Financial Advice", content: "The content and data provided by Notfa.co are strictly for informational purposes and do not constitute financial advice. Any decisions based on the data provided on this platform are at your own risk. Always conduct your own research or consult a licensed professional before making any financial decisions." },
            { title: "3. Use of Service", content: "You agree to use Notfa.co solely for lawful purposes and in accordance with these Terms. You are prohibited from violating any laws, third-party rights, or our policies. We reserve the right to terminate your access for violations." },
            { title: "4. User Accounts", content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Notify us immediately if you suspect any unauthorized use of your account." },
            { title: "5. Payment and Subscription", content: "If Notfa.co offers paid services or subscriptions, by subscribing, you agree to pay all associated fees. All fees are billed in USD, and are non-refundable except as required by law. We reserve the right to change our fees with reasonable notice." },
            { title: "6. Termination", content: "We reserve the right to suspend or terminate your access to Notfa.co at any time, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease." },
            { title: "7. Changes to Terms", content: "We may modify or replace these Terms at any time. We will notify you of any significant changes. Continued use of the service after changes are made constitutes acceptance of the new Terms." },
            { title: "8. Intellectual Property", content: "The service, its content, and functionality are owned by Notfa.co and are protected by international copyright, trademark, and other intellectual property laws." },
            { title: "9. Limitation of Liability", content: "To the fullest extent permitted by law, Notfa.co shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, or data resulting from your use of the service." },
            { title: "10. Disclaimer of Warranties", content: "The service is provided \"AS IS\" and \"AS AVAILABLE\" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement." },
            { title: "11. Governing Law", content: "These Terms will be governed by the laws of [Jurisdiction], without regard to its conflict of law provisions. Failure to enforce any provision of these Terms does not constitute a waiver of those rights." },
            { title: "12. Dispute Resolution", content: "Any disputes arising out of or relating to these Terms or the service will be resolved through binding arbitration in accordance with the rules of [Arbitration Association]. The arbitration will be conducted in [Jurisdiction] and in English." },
            { title: "13. Indemnification", content: "You agree to indemnify and hold harmless Notfa.co, its affiliates, officers, directors, employees, and agents from any claims, damages, or liabilities arising from your use of the service or breach of these Terms." },
            { title: "14. Severability", content: "If any part of these Terms is found invalid or unenforceable, the remaining provisions will continue in full force and effect." },
            { title: "15. No Refunds", content: "All purchases made through Notfa.co are final and non-refundable, unless required by law. By making a purchase, you agree that you are not entitled to a refund for any reason, except where mandated by applicable law." },
            { title: "16. Communication Consent", content: "By using Notfa.co, you consent to receive necessary communications from us via email or other forms of messaging. You may opt out of non-essential communications by contacting us at support@notfa.co." },
          ].map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h3>
              <p className="text-gray-600">{section.content}</p>
            </div>
          ))}

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
            <p className="text-gray-600">If you have any questions regarding these Terms, contact us at <a href="mailto:support@notfa.co" className="text-blue-600 hover:underline">support@notfa.co</a>.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
