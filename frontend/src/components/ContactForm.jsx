import { Phone, Mail, MapPin } from "lucide-react";
import "../styles/ContactForm.css"; // Importing CSS file
import { useState } from "react";

const ContactForm = () => {
  const contactDetails = [
    { icon: <Phone className="icon" />, text: "0301-4121388" },
    { icon: <Mail className="icon" />, text: "islegal@gmail.com" },
    { icon: <MapPin className="icon" />, text: "14-B Faisal Town Lahore" },
  ];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <section className="contact-container">
      <div className="contact-grid">
        <div className="contact-details">
          <h2>Get in Touch</h2>
          <p>Schedule a consultation with our experienced attorneys to discuss your legal needs.</p>
          {contactDetails.map((contact, index) => (
            <div key={index} className="contact-info">
              <span>{contact.icon}</span>
              {contact.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
