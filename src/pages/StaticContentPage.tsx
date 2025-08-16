import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaticContentPage: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const location = useLocation();
  
  // Extract page name from URL path
  const pageName = page || location.pathname.replace('/', '').replace(/-/g, ' ');
  
  const getPageContent = (pageName: string) => {
    switch (pageName.toLowerCase()) {
      case 'careers':
        return {
          title: 'Careers',
          content: `
            <h2>Join Brayan Espinoza's Team</h2>
            <p>We're always looking for passionate individuals who share our vision of creating exceptional athletic experiences. At Brayan Espinoza's team, we believe in fostering creativity, innovation, and personal growth.</p>
            
            <h3>Current Opportunities</h3>
            <ul>
              <li>Fashion Designer - Full-time</li>
              <li>E-commerce Manager - Full-time</li>
              <li>Customer Experience Specialist - Part-time</li>
              <li>Social Media Coordinator - Contract</li>
            </ul>
            
            <h3>Why Work With Us?</h3>
            <ul>
              <li>Competitive salary and benefits</li>
              <li>Creative and collaborative work environment</li>
              <li>Professional development opportunities</li>
              <li>Employee discounts on all products</li>
              <li>Flexible work arrangements</li>
            </ul>
            
            <p>Interested in joining our team? Send your resume and portfolio to <strong>fortysixpluss@gmail.com</strong></p>
          `
        };
      
      case 'press':
        return {
          title: 'Press & Media',
          content: `
            <h2>Press & Media Center</h2>
            <p>Welcome to Brayan Espinoza's press center. Here you'll find the latest news, press releases, and media resources about our athlete.</p>
            
            <h3>Latest News</h3>
            <ul>
              <li><strong>December 2024:</strong> Brayan Espinoza wins national championship</li>
              <li><strong>November 2024:</strong> Partnership with local Costa Rican sports organizations announced</li>
              <li><strong>October 2024:</strong> Brayan Espinoza sets new personal record</li>
            </ul>
            
            {/* Removed Media Kit section */}
            
            <h3>Press Inquiries</h3>
            <p>For all press and media inquiries, please contact:</p>
            <p><strong>Email:</strong> fortysixpluss@gmail.com<br>
<strong>Phone:</strong> +506 85489448</p>
          `
        };
      
      case 'stores':
        return {
          title: 'Store Locations',
          content: `
            <h2>Visit Our Stores</h2>
            <p>Experience Brayan Espinoza in person at our carefully curated training locations.</p>
            
            <h3>San José Flagship Store</h3>
            <p><strong>Address:</strong> Avenida Central, San José, Costa Rica<br>
            <strong>Hours:</strong> Monday - Saturday: 10:00 AM - 8:00 PM, Sunday: 11:00 AM - 6:00 PM<br>
            <strong>Phone:</strong> +506 85489448</p>
            
            <h3>Escazú Boutique</h3>
            <p><strong>Address:</strong> Multiplaza Escazú, Escazú, Costa Rica<br>
            <strong>Hours:</strong> Monday - Sunday: 10:00 AM - 9:00 PM<br>
            <strong>Phone:</strong> +506 85489448</p>
            
            <h3>Coming Soon</h3>
            <ul>
              <li>Cartago - Opening Spring 2025</li>
              <li>Heredia - Opening Summer 2025</li>
            </ul>
            
            <p>Can't visit us in person? Shop our complete collection online with free shipping on orders over ₡65,000.</p>
          `
        };
      
      case 'size guide':
        return {
          title: 'Size Guide',
          content: `
            <h2>Size Guide</h2>
            <p>Find your perfect fit with our comprehensive size guide. All measurements are in centimeters.</p>
            
            <h3>Women's Clothing</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 8px;">Size</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Bust</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Waist</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Hips</th>
              </tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">XS</td><td style="border: 1px solid #ddd; padding: 8px;">81-84</td><td style="border: 1px solid #ddd; padding: 8px;">61-64</td><td style="border: 1px solid #ddd; padding: 8px;">86-89</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">S</td><td style="border: 1px solid #ddd; padding: 8px;">86-89</td><td style="border: 1px solid #ddd; padding: 8px;">66-69</td><td style="border: 1px solid #ddd; padding: 8px;">91-94</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">M</td><td style="border: 1px solid #ddd; padding: 8px;">91-94</td><td style="border: 1px solid #ddd; padding: 8px;">71-74</td><td style="border: 1px solid #ddd; padding: 8px;">96-99</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">L</td><td style="border: 1px solid #ddd; padding: 8px;">96-99</td><td style="border: 1px solid #ddd; padding: 8px;">76-79</td><td style="border: 1px solid #ddd; padding: 8px;">101-104</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">XL</td><td style="border: 1px solid #ddd; padding: 8px;">101-104</td><td style="border: 1px solid #ddd; padding: 8px;">81-84</td><td style="border: 1px solid #ddd; padding: 8px;">106-109</td></tr>
            </table>
            
            <h3>Men's Clothing</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 8px;">Size</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Chest</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Waist</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Hips</th>
              </tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">S</td><td style="border: 1px solid #ddd; padding: 8px;">86-91</td><td style="border: 1px solid #ddd; padding: 8px;">71-76</td><td style="border: 1px solid #ddd; padding: 8px;">86-91</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">M</td><td style="border: 1px solid #ddd; padding: 8px;">96-101</td><td style="border: 1px solid #ddd; padding: 8px;">81-86</td><td style="border: 1px solid #ddd; padding: 8px;">96-101</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">L</td><td style="border: 1px solid #ddd; padding: 8px;">106-111</td><td style="border: 1px solid #ddd; padding: 8px;">91-96</td><td style="border: 1px solid #ddd; padding: 8px;">106-111</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">XL</td><td style="border: 1px solid #ddd; padding: 8px;">116-121</td><td style="border: 1px solid #ddd; padding: 8px;">101-106</td><td style="border: 1px solid #ddd; padding: 8px;">116-121</td></tr>
              <tr><td style="border: 1px solid #ddd; padding: 8px;">XXL</td><td style="border: 1px solid #ddd; padding: 8px;">126-131</td><td style="border: 1px solid #ddd; padding: 8px;">111-116</td><td style="border: 1px solid #ddd; padding: 8px;">126-131</td></tr>
            </table>
            
            <h3>How to Measure</h3>
            <ul>
              <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest/bust</li>
              <li><strong>Waist:</strong> Measure around your natural waistline</li>
              <li><strong>Hips:</strong> Measure around the fullest part of your hips</li>
            </ul>
            
            <p>Still unsure about sizing? Contact our customer service team at <strong>fortysixpluss@gmail.com</strong> for personalized assistance.</p>
          `
        };
      
      case 'shipping':
        return {
          title: 'Shipping Information',
          content: `
            <h2>Shipping & Delivery</h2>
            <p>We offer fast and reliable shipping throughout Costa Rica and internationally.</p>
            
            <h3>Domestic Shipping (Costa Rica)</h3>
            <ul>
              <li><strong>Standard Delivery:</strong> 2-3 business days - ₡2,500</li>
              <li><strong>Express Delivery:</strong> 1-2 business days - ₡5,000</li>
              <li><strong>Free Shipping:</strong> On orders over ₡65,000</li>
            </ul>
            
            <h3>International Shipping</h3>
            <ul>
              <li><strong>Central America:</strong> 5-7 business days - ₡8,500</li>
              <li><strong>North America:</strong> 7-10 business days - ₡15,000</li>
              <li><strong>Europe:</strong> 10-14 business days - ₡20,000</li>
              <li><strong>Rest of World:</strong> 14-21 business days - ₡25,000</li>
            </ul>
            
            <h3>Order Processing</h3>
            <p>Orders are processed within 1-2 business days. You'll receive a tracking number once your order ships.</p>
            
            <h3>Delivery Areas</h3>
            <p>We deliver to all provinces in Costa Rica. For remote areas, additional delivery time may apply.</p>
            
            <p>Questions about your shipment? Contact us at <strong>fortysixpluss@gmail.com</strong></p>
          `
        };
      
      case 'returns':
        return {
          title: 'Returns & Exchanges',
          content: `
            <h2>Returns & Exchanges</h2>
            <p>We want you to love your Brayan Espinoza experience. If you're not completely satisfied, we're here to help.</p>
            
            <h3>Return Policy</h3>
            <ul>
              <li>Returns accepted within <strong>30 days</strong> of purchase</li>
              <li>Items must be unworn, unwashed, and in original condition</li>
              <li>Original tags must be attached</li>
              <li>Original packaging and receipt required</li>
            </ul>
            
            <h3>How to Return</h3>
            <ol>
              <li>Contact our customer service team at <strong>fortysixpluss@gmail.com</strong></li>
              <li>Receive your return authorization and prepaid shipping label</li>
              <li>Package your items securely</li>
              <li>Drop off at any authorized shipping location</li>
            </ol>
            
            <h3>Exchanges</h3>
            <p>We offer free exchanges for different sizes or colors within 30 days of purchase.</p>
            
            <h3>Refunds</h3>
            <ul>
              <li>Refunds processed within 5-7 business days</li>
              <li>Original payment method will be credited</li>
              <li>Shipping costs are non-refundable (unless item is defective)</li>
            </ul>
            
            <h3>Final Sale Items</h3>
            <p>Items marked as "Final Sale" cannot be returned or exchanged.</p>
            
            <p>Need help with a return? Contact us at <strong>fortysixpluss@gmail.com</strong> or call +506 85489448.</p>
          `
        };
      
      case 'privacy policy':
        return {
          title: 'Privacy Policy',
          content: `
            <h2>Privacy Policy</h2>
            <p><em>Last updated: December 2024</em></p>
            
            <h3>Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Create an account or make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact customer service</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            
            <h3>How We Use Your Information</h3>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your purchases</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h3>Information Sharing</h3>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul>
              <li>Service providers who help us operate our business</li>
              <li>Law enforcement when required by law</li>
              <li>Business partners for joint marketing (with your consent)</li>
            </ul>
            
            <h3>Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h3>Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            
            <h3>Contact Us</h3>
            <p>If you have questions about this Privacy Policy, contact us at <strong>fortysixpluss@gmail.com</strong></p>
          `
        };
      
      case 'terms of service':
        return {
          title: 'Terms of Service',
          content: `
            <h2>Terms of Service</h2>
            <p><em>Last updated: December 2024</em></p>
            
            <h3>Acceptance of Terms</h3>
            <p>By accessing and using Brayan Espinoza's website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h3>Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on Brayan Espinoza's website for personal, non-commercial transitory viewing only.</p>
            
            <h3>Disclaimer</h3>
            <p>The materials on Brayan Espinoza's website are provided on an 'as is' basis. Brayan Espinoza makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h3>Limitations</h3>
            <p>In no event shall Brayan Espinoza or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Brayan Espinoza's website.</p>
            
            <h3>Account Terms</h3>
            <ul>
              <li>You must be 18 years or older to create an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate and complete information</li>
              <li>One account per person</li>
            </ul>
            
            <h3>Prohibited Uses</h3>
            <p>You may not use our service:</p>
            <ul>
              <li>For any unlawful purpose</li>
              <li>To transmit viruses or malicious code</li>
              <li>To infringe upon intellectual property rights</li>
              <li>To harass or abuse others</li>
            </ul>
            
            <h3>Governing Law</h3>
            <p>These terms and conditions are governed by and construed in accordance with the laws of Costa Rica.</p>
            
            <p>Questions about these Terms? Contact us at <strong>fortysixpluss@gmail.com</strong></p>
          `
        };
      
      case 'cookie policy':
        return {
          title: 'Cookie Policy',
          content: `
            <h2>Cookie Policy</h2>
            <p><em>Last updated: December 2024</em></p>
            
            <h3>What Are Cookies?</h3>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
            
            <h3>Types of Cookies We Use</h3>
            
            <h4>Essential Cookies</h4>
            <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.</p>
            
            <h4>Performance Cookies</h4>
            <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
            
            <h4>Functional Cookies</h4>
            <p>These cookies enable the website to provide enhanced functionality and personalization, such as remembering your shopping cart contents.</p>
            
            <h4>Marketing Cookies</h4>
            <p>These cookies are used to track visitors across websites to display relevant and engaging advertisements.</p>
            
            <h3>Managing Cookies</h3>
            <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
            
            <h3>Third-Party Cookies</h3>
            <p>We may use third-party services such as Google Analytics, which may place cookies on your device. These services have their own privacy policies.</p>
            
            <h3>Updates to This Policy</h3>
            <p>We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            
            <p>Questions about our Cookie Policy? Contact us at <strong>fortysixpluss@gmail.com</strong></p>
          `
        };
      
      default:
        return {
          title: 'Page Not Found',
          content: `
            <h2>Page Not Found</h2>
            <p>Sorry, the page you're looking for doesn't exist or is under construction.</p>
            <p>Please check the URL or return to our homepage.</p>
          `
        };
    }
  };

  const { title, content } = getPageContent(pageName);

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-4xl mx-auto section-padding py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-stone transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-sm p-8 md:p-12"
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8">
            {title}
          </h1>
          
          <div 
            className="prose prose-lg max-w-none text-stone leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              lineHeight: '1.7',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default StaticContentPage;