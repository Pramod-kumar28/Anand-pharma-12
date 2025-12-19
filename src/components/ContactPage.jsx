import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import Footer from './Header/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      details: [
        'Anand Pharma Headquarters',
        '123 Healthcare Avenue',
        'Medical District',
        'Mumbai, Maharashtra 400001'
      ],
      color: 'text-blue-600'
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      details: [
        'Customer Care: 1800-123-4567',
        'Medical Helpline: 1800-890-1234',
        'Emergency Support: 1800-EMERGENCY',
        'Mon-Sun: 8:00 AM - 11:00 PM'
      ],
      color: 'text-green-600'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      details: [
        'General: info@anandpharma.com',
        'Support: support@anandpharma.com',
        'Medical: medical@anandpharma.com',
        'Partnership: partners@anandpharma.com'
      ],
      color: 'text-purple-600'
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      details: [
        'Customer Support: 24/7',
        'Medical Consultation: 8 AM - 11 PM',
        'Order Processing: 6 AM - 12 AM',
        'Delivery Service: 7 AM - 11 PM'
      ],
      color: 'text-amber-600'
    }
  ];

  const faqs = [
    {
      question: 'How can I track my medicine delivery?',
      answer: 'You can track your order in real-time through our app or website. Once your order is confirmed, you will receive a tracking link via SMS and email.'
    },
    {
      question: 'Do you provide emergency medicine delivery?',
      answer: 'Yes, we provide emergency medicine delivery within 15 minutes for critical medications. Please call our emergency helpline for immediate assistance.'
    },
    {
      question: 'How do I upload a prescription?',
      answer: 'You can upload prescriptions through our website or mobile app. Simply go to the upload section, select your prescription file, and our pharmacists will verify it within minutes.'
    },
    {
      question: 'Are your pharmacists available for consultation?',
      answer: 'Yes, our licensed pharmacists are available 24/7 for free consultation via chat, call, or video call through our app and website.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
        <Header/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-900 text-white h-[50vh] py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Contact Anand Pharma
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Your health is our priority. Reach out to us for any healthcare needs, 
              medicine queries, or support services.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Contact Info Grid */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`text-3xl mb-4 ${item.color}`}>
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Contact Form */}
          <section>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <i className="fas fa-headset text-blue-600 text-2xl"></i>
                <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                >
                  <i className="fas fa-check-circle text-green-600 text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-600">
                    Thank you for contacting Anand Pharma. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="medicine-query">Medicine Query</option>
                        <option value="delivery-issue">Delivery Issue</option>
                        <option value="prescription-help">Prescription Help</option>
                        <option value="partner-inquiry">Partner Inquiry</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Please describe your query in detail..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </section>

          {/* FAQs Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <i className="fas fa-question-circle text-blue-600 text-2xl"></i>
                <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <i className="fas fa-chevron-right text-blue-500"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>

        {/* Full Width Map Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <i className="fas fa-map-marker-alt text-red-600 text-2xl"></i>
                <h2 className="text-2xl font-bold text-gray-800">Visit Our Hyderabad Office</h2>
              </div>
              
              <div className="w-full h-80 rounded-lg overflow-hidden">
                {/* Google Map Embed for Hyderabad HITEC City */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.962521361842!2d78.38909631535596!3d17.41499880621085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96f2a8b4a9f9%3A0x8a8275e0b3b5f5f5!2sHITEC%20City%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1648637890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anand Pharma Hyderabad Office"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactPage;