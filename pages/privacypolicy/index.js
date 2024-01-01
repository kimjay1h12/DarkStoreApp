import React from 'react'
import MainLayout from '../../layouts/Mainlayouts'
import { Typography } from '@mui/material'

function Index() {
    const privacyPolicySections = [
        {
          title: "1. Information We Collect",
          content: [
            "We may collect personal information directly from you or through automated means. The types of information we may collect include:",
            "Contact Information (e.g., name, email address, phone number)",
            "Billing and Shipping Information",
            "Payment Information",
            "Order History",
            "Device Information (e.g., IP address, browser type)",
            "Usage Data (e.g., pages visited, time spent on the site)",
          ],
        },
        {
          title: "2. How We Use Your Information",
          content: [
            "We use the collected information for the following purposes:",
            "Process and fulfill your orders",
            "Provide customer support",
            "Improve our website and services",
            "Customize your experience",
            "Communicate with you about promotions and updates",
            "Comply with legal obligations",
          ],
        },
        {
          title: "3. Sharing Your Information",
          content: [
            "We may share your information with third parties, including:",
            "Service providers assisting with order fulfillment, payment processing, and other business operations",
            "Legal authorities to comply with applicable laws and regulations",
            "We do not sell or rent your personal information to third parties for marketing purposes.",
          ],
        },
        {
          title: "4. Cookies and Tracking Technologies",
          content: [
            "We use cookies and similar technologies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.",
          ],
        },
        {
          title: "5. Security",
          content: [
            "We implement reasonable security measures to protect your information from unauthorized access and disclosure. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          title: "6. Your Choices",
          content: [
            "You have the right to:",
            "Access, correct, or delete your personal information",
            "Opt-out of marketing communications",
            "Disable cookies through your browser settings",
          ],
        },
        {
          title: "7. Changes to This Privacy Policy",
          content: [
            "We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the updated policy on our website.",
          ],
        },
        {
          title: "8. Contact Us",
          content: [
            "If you have any questions or concerns about this Privacy Policy, please contact us at [contact@yourwebsite.com].",
          ],
        },
      ];
      
    
      
  return (
   <MainLayout>
    <div  style={{color:"#fff",padding:30}}>
    <div className="privacy-policy">
    <header style={{marginBottom:100}}>
              <h1 >Privacy Policy</h1>
            </header>
    {
        privacyPolicySections?.map((cur,i)=>(
            <div key={i} style={{marginBottom:50}}>
            
      
            <section>
              <h2  style={{marginBottom:20}}>{cur.title}</h2>
        
              <ul>
                {
                cur.content?.map((item,t)=>(
                    <li style={{marginBottom:10}} key={t}>{item}</li>
                ))
                }
  
              </ul>
            </section>
            </div>
        ))
    }

      <footer>
        <p>Last Updated: 1/01/2024</p>
        <p>Contact: <a href="mailto:olawaleadeit@gmail.com">contact@officialkimjay.com</a></p>
      </footer>
   </div>
   </div>
   </MainLayout>
  )
}

export default Index