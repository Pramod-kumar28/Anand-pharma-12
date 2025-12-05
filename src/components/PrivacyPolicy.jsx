// src/components/PrivacyPolicy/PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              🔒 HIPAA Compliant
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ml-2">
              🛡️ GDPR Compliant
            </span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">At a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-blue-600 text-lg mb-2">📋</div>
              <h3 className="font-semibold text-gray-900">What We Collect</h3>
              <p className="text-gray-600 text-sm mt-1">
                Contact info, medical data, purchase history, and device information
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-green-600 text-lg mb-2">🔐</div>
              <h3 className="font-semibold text-gray-900">How We Protect</h3>
              <p className="text-gray-600 text-sm mt-1">
                SSL encryption, secure servers, and strict access controls
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-purple-600 text-lg mb-2">👁️</div>
              <h3 className="font-semibold text-gray-900">Your Rights</h3>
              <p className="text-gray-600 text-sm mt-1">
                Access, correct, delete your data or opt-out anytime
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'data-collection', label: 'Data We Collect' },
              { id: 'medical-data', label: 'Medical Data' },
              { id: 'data-use', label: 'How We Use Data' },
              { id: 'data-sharing', label: 'Data Sharing' },
              { id: 'data-protection', label: 'Data Protection' },
              { id: 'your-rights', label: 'Your Rights' },
              { id: 'cookies', label: 'Cookies' },
              { id: 'children', label: "Children's Privacy" },
              { id: 'changes', label: 'Policy Changes' },
              { id: 'contact', label: 'Contact Us' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium px-3 py-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Introduction */}
          <section id="overview" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                MedCare Pharmacy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or services.
              </p>
              <p>
                As a healthcare provider, we take your privacy seriously, especially when it comes to sensitive medical information. We comply with applicable data protection laws including the Information Technology Act, 2000 and relevant medical confidentiality regulations.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-500">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> By using our services, you consent to the collection and use of your information as described in this policy. If you do not agree, please do not use our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="data-collection" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">2.1 Personal Information</h3>
              <p className="text-gray-700">We collect information that identifies you personally:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>Full name and contact details</li>
                    <li>Email address and phone number</li>
                    <li>Delivery and billing addresses</li>
                    <li>Date of birth and gender</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Account Information</h4>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>Username and password</li>
                    <li>Profile preferences</li>
                    <li>Communication preferences</li>
                    <li>Order history and preferences</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">2.2 Transaction Information</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Payment details (processed securely by our payment partners)</li>
                <li>Purchase history and prescription details</li>
                <li>Shipping and delivery information</li>
                <li>Prescription uploads and verifications</li>
              </ul>
            </div>
          </section>

          {/* Medical Information */}
          <section id="medical-data" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Medical Information</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-500">🔒</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      <strong>Special Protection:</strong> Medical information receives the highest level of protection under law. We treat all medical data as strictly confidential.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">We may collect and process:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Prescription details and medication history</li>
                <li>Doctor information and medical referrals</li>
                <li>Health conditions and symptoms (if voluntarily shared)</li>
                <li>Allergy information and medical contraindications</li>
                <li>Insurance and health plan information</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Consent for Medical Data</h4>
                <p className="text-gray-700 text-sm">
                  By providing medical information, you explicitly consent to its collection and processing for healthcare purposes only. You may withdraw consent at any time, but this may affect our ability to provide services.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="data-use" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Process orders and prescriptions</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Contractual necessity</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Provide healthcare services</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Legitimate interest & consent</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Send order updates and alerts</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Contractual necessity</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Personalize recommendations</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Legitimate interest</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Process payments and prevent fraud</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Legal obligation</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Comply with legal requirements</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Legal obligation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section id="data-sharing" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing</h2>
            <div className="space-y-4">
              <p className="text-gray-700">We do not sell your personal or medical information. We only share information when necessary:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">With Service Providers</h3>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>Payment processors</li>
                    <li>Delivery partners</li>
                    <li>IT service providers</li>
                    <li>Customer support platforms</li>
                  </ul>
                  <p className="text-gray-600 text-xs mt-3">All partners sign strict confidentiality agreements</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">For Legal Reasons</h3>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>To comply with laws</li>
                    <li>To protect rights and safety</li>
                    <li>For legal proceedings</li>
                    <li>With regulatory authorities</li>
                  </ul>
                  <p className="text-gray-600 text-xs mt-3">Only when legally required</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Medical Information Sharing</h3>
                <p className="text-gray-700 text-sm">
                  Medical information is only shared with healthcare providers involved in your care or when required by law. We never share medical data for marketing purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section id="data-protection" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-blue-600 text-2xl mb-2">🔐</div>
                  <h3 className="font-semibold text-gray-900">Encryption</h3>
                  <p className="text-gray-600 text-sm mt-1">256-bit SSL encryption for all data transfers</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-green-600 text-2xl mb-2">🛡️</div>
                  <h3 className="font-semibold text-gray-900">Access Control</h3>
                  <p className="text-gray-600 text-sm mt-1">Role-based access and authentication</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-purple-600 text-2xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-900">Regular Audits</h3>
                  <p className="text-gray-600 text-sm mt-1">Security audits and penetration testing</p>
                </div>
              </div>

              <p className="text-gray-700">
                We implement industry-standard security measures including firewalls, intrusion detection, and regular security updates. Medical data is stored in specially secured databases with additional access controls.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <div className="space-y-4">
              <p className="text-gray-700">You have the following rights regarding your personal data:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "👁️", title: "Right to Access", desc: "Request copies of your personal data" },
                  { icon: "✏️", title: "Right to Rectification", desc: "Correct inaccurate or incomplete data" },
                  { icon: "🗑️", title: "Right to Erasure", desc: "Request deletion of your personal data" },
                  { icon: "⏸️", title: "Right to Restrict", desc: "Restrict processing of your data" },
                  { icon: "📥", title: "Data Portability", desc: "Receive your data in a portable format" },
                  { icon: "🚫", title: "Right to Object", desc: "Object to processing of your data" },
                ].map((right, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-xl mr-3">{right.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{right.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{right.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">How to Exercise Your Rights</h3>
                <p className="text-gray-700 text-sm">
                  To exercise any of these rights, contact our Data Protection Officer at <span className="font-medium">privacy@medcarepharmacy.com</span>. We will respond within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section id="cookies" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We use cookies and similar technologies to improve your experience:
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Essential Cookies</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Site functionality and security</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Session</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Analytics Cookies</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Improve website performance</td>
                      <td className="px-4 py-3 text-sm text-gray-700">1-2 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Preference Cookies</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Remember your settings</td>
                      <td className="px-4 py-3 text-sm text-gray-700">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-700 text-sm">
                    You can control cookies through your browser settings. However, disabling essential cookies may affect website functionality.
                  </p>
                </div>
                <button className="mt-3 sm:mt-0 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                  Cookie Settings
                </button>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-500">👶</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> Our services are not intended for children under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Changes */}
          <section id="changes" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes by:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Posting the new policy on our website</li>
                <li>Sending an email notification</li>
                <li>Displaying a notice on our platform</li>
              </ul>
              <p>
                Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                For privacy-related questions or to exercise your rights:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <span className="mr-2">📧</span>
                      privacy@medcarepharmacy.com
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      +91 22 1234 5678 (Ext. 9)
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">🏢</span>
                      Data Protection Office, MedCare Pharmacy
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Postal Address</h3>
                  <div className="text-gray-600">
                    <p>MedCare Pharmacy</p>
                    <p>Data Protection Department</p>
                    <p>123 Healthcare Street</p>
                    <p>Medical District, Mumbai</p>
                    <p>Maharashtra 400001, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-700 text-sm">
                  We aim to respond to all privacy inquiries within 48 hours. For complex requests, we will acknowledge receipt within 24 hours and provide a full response within 30 days as required by law.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-4">Related Policies</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/terms-conditions" className="text-orange-600 hover:text-orange-700 font-medium">
                  Terms & Conditions
                </Link>
                <Link to="/cookie-policy" className="text-orange-600 hover:text-orange-700 font-medium">
                  Cookie Policy
                </Link>
                <Link to="/shipping-policy" className="text-orange-600 hover:text-orange-700 font-medium">
                  Shipping Policy
                </Link>
                <Link to="/return-policy" className="text-orange-600 hover:text-orange-700 font-medium">
                  Return Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <a
            href="#top"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            ↑ Back to Top
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;