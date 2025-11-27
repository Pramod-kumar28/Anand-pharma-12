import React from 'react'
const Footer = () => {
    return (
        <footer className="bg-[#0D5E75] text-white py-12 px-4">
            <div className="w-full mx-auto">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-blue-400">Anand</span> Pharmacy
                        </h3>
                        <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                            Fast and trusted medicine delivery at your doorstep. Order medicines, 
                            wellness products, and healthcare essentials in minutes.
                        </p>
                        <div className="flex max-w-xs">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-white/10 text-white px-4 py-3 rounded-l-lg focus:outline-none border border-transparent focus:border-blue-400 placeholder-white/60"
                            />
                            <button className="bg-blue-500 px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-600 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    {[
                        {
                            title: "Shop",
                            links: ["Medicines", "Wellness", "Personal Care", "Baby Care", "Supplements", "Medical Devices"]
                        },
                        {
                            title: "Support", 
                            links: ["Customer Care", "Order Tracking", "Returns & Refunds", "Prescription Help", "Shipping Info"]
                        },
                        {
                            title: "Information",
                            links: ["About Us", "Our Stores", "FAQs", "Terms & Conditions", "Privacy Policy"]
                        }
                    ].map((section, idx) => (
                        <div key={idx}>
                            <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                            <ul className="space-y-3 text-white/80">
                                {section.links.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-blue-300 transition">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white/70 text-sm mb-4 md:mb-0">
                        © 2025 Anand Pharmacy — All Rights Reserved.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {["Contact", "Privacy", "Terms of Use", "Refund Policy", "Delivery Policy"].map((item) => (
                            <a key={item} href="#" className="text-white/70 hover:text-blue-300 transition text-sm">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer