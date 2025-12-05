// src/components/TermsConditions/TermsConditions.jsx
import React from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'agreement', label: 'Agreement' },
              { id: 'account', label: 'Account Terms' },
              { id: 'orders', label: 'Orders & Payments' },
              { id: 'products', label: 'Products' },
              { id: 'shipping', label: 'Shipping' },
              { id: 'returns', label: 'Returns' },
              { id: 'liability', label: 'Liability' },
              { id: 'privacy', label: 'Privacy' },
              { id: 'contact', label: 'Contact' },
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
          <div className="mb-10">
            <p className="text-gray-700 mb-4">
              Welcome to MedCare Pharmacy. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
            <p className="text-gray-700">
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use MedCare Pharmacy if you do not agree to all the terms and conditions stated on this page.
            </p>
          </div>

          {/* 1. Agreement to Terms */}
          <section id="agreement" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">1</span>
              Agreement to Terms
            </h2>
            <div className="ml-11">
              <p className="text-gray-700 mb-3">
                By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you may not access our services.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>You must be at least 18 years old to use our services</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree not to use the website for any illegal purposes</li>
              </ul>
            </div>
          </section>

          {/* 2. Account Terms */}
          <section id="account" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">2</span>
              Account Terms
            </h2>
            <div className="ml-11">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Account Creation</h3>
              <p className="text-gray-700 mb-3">
                To access certain features, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Account Suspension</h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate accounts that violate these terms or are used for fraudulent activities.
              </p>
            </div>
          </section>

          {/* 3. Orders and Payments */}
          <section id="orders" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">3</span>
              Orders and Payments
            </h2>
            <div className="ml-11">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Order Acceptance</h3>
              <p className="text-gray-700 mb-3">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Product unavailability</li>
                <li>Errors in product or pricing information</li>
                <li>Suspected fraudulent activity</li>
                <li>Violation of prescription requirements</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Payment Terms</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>All prices are in Indian Rupees (₹)</li>
                <li>Payment must be completed at the time of order</li>
                <li>We accept major credit cards, debit cards, UPI, and net banking</li>
                <li>All transactions are secured with SSL encryption</li>
                <li>Taxes will be calculated based on your delivery location</li>
              </ul>
            </div>
          </section>

          {/* 4. Products */}
          <section id="products" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">4</span>
              Products Information
            </h2>
            <div className="ml-11">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Medical Products</h3>
              <p className="text-gray-700 mb-3">
                As a pharmacy, we sell both prescription and over-the-counter medications. Please note:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Prescription medications require a valid prescription from a registered medical practitioner</li>
                <li>We reserve the right to verify prescriptions with the prescribing doctor</li>
                <li>Self-medication can be harmful - always consult a doctor</li>
                <li>Product images are for reference and may differ from actual product</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Product Availability</h3>
              <p className="text-gray-700">
                While we strive to maintain accurate inventory, product availability may change. We will notify you if a product becomes unavailable after ordering.
              </p>
            </div>
          </section>

          {/* 5. Shipping and Delivery */}
          <section id="shipping" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">5</span>
              Shipping and Delivery
            </h2>
            <div className="ml-11">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Delivery Areas</h3>
              <p className="text-gray-700 mb-3">
                We currently deliver to most locations in India. Delivery times and charges vary based on:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Delivery location</li>
                <li>Order value</li>
                <li>Shipping method selected</li>
                <li>Local restrictions or regulations</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Delivery Time</h3>
              <p className="text-gray-700 mb-3">
                Standard delivery: 3-7 business days
                <br />
                Express delivery: 1-3 business days (additional charges apply)
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.3 Failed Delivery</h3>
              <p className="text-gray-700">
                If delivery fails due to incorrect address or recipient unavailability, additional charges may apply for re-delivery.
              </p>
            </div>
          </section>

          {/* 6. Returns and Refunds */}
          <section id="returns" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">6</span>
              Returns and Refunds
            </h2>
            <div className="ml-11">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-500">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Due to the sensitive nature of medical products, we have strict return policies to ensure patient safety.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">6.1 Non-Returnable Items</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Prescription medications (unless damaged or incorrect)</li>
                <li>Opened or used products</li>
                <li>Personal care items</li>
                <li>Temperature-sensitive products</li>
                <li>Products with broken seals</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">6.2 Return Conditions</h3>
              <p className="text-gray-700 mb-3">Returns are accepted only if:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Product is unopened and in original packaging</li>
                <li>Return is requested within 7 days of delivery</li>
                <li>Product is damaged or defective</li>
                <li>Wrong product was delivered</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">6.3 Refund Process</h3>
              <p className="text-gray-700">
                Approved refunds will be processed within 7-14 business days to the original payment method.
              </p>
            </div>
          </section>

          {/* 7. Limitation of Liability */}
          <section id="liability" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">7</span>
              Limitation of Liability
            </h2>
            <div className="ml-11">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-500">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Important: We are not medical practitioners. Always consult a doctor before using any medication.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-3">
                To the maximum extent permitted by law, MedCare Pharmacy shall not be liable for:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Damages resulting from misuse of products</li>
                <li>Self-medication without proper medical consultation</li>
                <li>Allergic reactions or side effects</li>
                <li>Errors in prescription information provided by customers</li>
              </ul>
            </div>
          </section>

          {/* 8. Privacy */}
          <section id="privacy" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">8</span>
              Privacy
            </h2>
            <div className="ml-11">
              <p className="text-gray-700 mb-3">
                Your privacy is important to us. Please review our <Link to="/privacy-policy" className="text-orange-600 hover:text-orange-700 font-medium">Privacy Policy</Link> which explains how we collect, use, and protect your personal and medical information.
              </p>
              <p className="text-gray-700">
                We maintain strict confidentiality of your medical information in compliance with applicable laws and regulations.
              </p>
            </div>
          </section>

          {/* 9. Contact Information */}
          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3">9</span>
              Contact Information
            </h2>
            <div className="ml-11">
              <p className="text-gray-700 mb-4">
                For any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">MedCare Pharmacy</h4>
                    <p className="text-gray-600 text-sm">
                      123 Healthcare Street<br />
                      Medical District<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Details</h4>
                    <p className="text-gray-600 text-sm">
                      📞 Customer Support: +91 22 1234 5678<br />
                      📧 Email: legal@medcarepharmacy.com<br />
                      ⏰ Hours: Mon-Sat, 9 AM - 8 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-gray-700 text-sm">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai. We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </div>
            
            {/* Acceptance Checkbox for Demo Purposes */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsAcceptance"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="termsAcceptance" className="ml-2 text-sm text-gray-700">
                  I have read, understood, and agree to be bound by these Terms and Conditions
                </label>
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

        {/* Links to Other Legal Pages */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/privacy-policy" className="text-gray-600 hover:text-orange-600 text-sm font-medium">
            Privacy Policy
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="/shipping-policy" className="text-gray-600 hover:text-orange-600 text-sm font-medium">
            Shipping Policy
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="/return-policy" className="text-gray-600 hover:text-orange-600 text-sm font-medium">
            Return Policy
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="/contact" className="text-gray-600 hover:text-orange-600 text-sm font-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;