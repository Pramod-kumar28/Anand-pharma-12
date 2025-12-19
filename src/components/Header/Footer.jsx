import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-[#0D5E75] text-white py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-5">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            {/* CEO Image - Hidden on mobile, shown on desktop */}
                            <div className="hidden md:flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden flex-shrink-0">
                                    <img 
                                        src="/assets/CEO.png" 
                                        alt="CEO" 
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <img 
                                        src="/assets/logo.png" 
                                        alt="Anand Pharmacy Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            
                            {/* Mobile View - Only show logo */}
                            <div className="flex md:hidden items-center gap-1">
                                <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden flex-shrink-0">
                                    <img 
                                        src="/assets/CEO.png" 
                                        alt="CEO" 
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <img 
                                        src="/assets/logo.png" 
                                        alt="Anand Pharmacy Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            
                            {/* Brand Name */}
                            <div className="flex flex-col min-w-0">
                                <span className="text-base font-bold text-white-800 whitespace-nowrap md:text-lg truncate">
                                    <span className="text-blue-300">Anand</span> Pharma
                                </span>
                                {/* Tagline - Hidden on mobile */}
                                <span className="md:block text-xs text-gray-200 whitespace-nowrap">
                                    Trusted Healthcare
                                </span>
                            </div>
                        </div>
                        
                        <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                                At Anand Pharma, we're committed to making healthcare truly accessible delivering genuine medicines 
                                to your doorstep in just 15 to 30 minutes. We believe timely access to medication is a right, not a privilege, 
                                and we deliver trust, transparency, and care to every home, every time through our advanced healthcare 
                                ecosystem.
                        </p>
                        
                        {/* Social Media Links */}
                        <div className="flex gap-4 mb-6">
                            {[
                                { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", name: "Twitter" },
                                { icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", name: "Facebook" },
                                { icon: "M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 16.667c-3.682 0-6.667-2.985-6.667-6.667S8.318 5.333 12 5.333 18.667 8.318 18.667 12 15.682 18.667 12 18.667zm4.333-9.167a.833.833 0 11-1.666 0 .833.833 0 011.666 0zm-7.5 0a.833.833 0 11-1.667 0 .833.833 0 011.667 0zm3.75 3.333c-1.333 1.067-2.167 1.067-2.167 1.067l.834 1.25s1.5-1.067 2.5-2.084l.833 1.25s2.5-2.5 2.5-3.75c0-1.25-1.25-1.25-1.25-1.25h-5s-1.25 0-1.25 1.25v.833s.833 0 .833.834c0 .833-.833.833-.833.833h-.834s-.833 0-.833.833c0 .834.833.834.833.834h3.334s.833 0 .833-.834v-.833z", name: "Instagram" },
                                { icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z", name: "YouTube" }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href="#" 
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                                    aria-label={social.name}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon}/>
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {[
                        {
                            title: "Shop",
                            links: [
                                { name: "Medicines", url: "/home/all" },
                                { name: "Baby Care", url: "/home/baby-care" },
                                { name: "Cardiac Care", url: "/home/cardiac-care" },
                                { name: "Stomach Care", url: "/home/stomach-care" }
                            ]
                        },
                        {
                            title: "Support",
                            links: [
                                { name: "Customer Care", url: "/customer-care" },
                                { name: "Order Tracking", url: "/order-tracking" },
                                { name: "Returns & Refunds", url: "/returns-refunds" },
                                { name: "Prescription Help", url: "/prescription-help" },
                                { name: "Shipping Info", url: "/shipping-info" }
                            ]
                        },
                        {
                            title: "Information",
                            links: [
                                { name: "About Us", url: "/about" },
                                { name: "Contact Us", url: "/contact" },
                                { name: "Terms & Conditions", url: "/terms" },
                                { name: "Privacy Policy", url: "/privacy" }
                            ]
                        }
                    ].map((section, idx) => (
                        <div key={idx}>
                            <h4 className="font-bold text-lg mb-4 text-blue-300">{section.title}</h4>
                            <ul className="space-y-3 text-white/80">
                                {section.links.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.url}
                                            className="hover:text-blue-300 transition text-sm md:text-base"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/20 pt-2 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <p className="text-white/70 text-sm mb-2">
                            © 2025 Anand Pharmacy — All Rights Reserved.
                        </p>
                        <p className="text-white/60 text-xs">
                            Licensed Pharmacy • DL No: AP123456 • GSTIN: 29AABCU9603R1ZX
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            {
                                name: "Privacy Policy",
                                path: "/privacy"
                            },
                            {
                                name: "Terms & Conditions",
                                path: "/terms"
                            },
                            {
                                name: "Contact Us",
                                path: "/contact"
                            }
                            
                        ].map((item) => (
                            <Link 
                                key={item} 
                                to={item.path}
                                className="text-white/70 hover:text-blue-300 transition text-sm whitespace-nowrap"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer