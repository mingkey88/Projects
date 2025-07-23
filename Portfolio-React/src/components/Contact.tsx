import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Download } from 'lucide-react'
import emailjs from '@emailjs/browser'
import './Contact.css'
import ScrollReveal from './ScrollReveal'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // For demo purposes, we'll simulate a successful submission
      // Replace these with your actual EmailJS credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Ming Jie',
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, we'll just simulate success
      // emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_public_key')
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      console.error('Failed to send message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Let's work together</p>
          </div>
        </ScrollReveal>
        
        <div className="contact-container">
          <ScrollReveal delay={0.2}>
            <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Let's connect!
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <Mail className="contact-icon" />
                <span>mingjie.tan88@gmail.com</span>
              </div>
              <div className="contact-method">
                <Phone className="contact-icon" />
                <span>+65 98278695</span>
              </div>
              <div className="contact-method">
                <MapPin className="contact-icon" />
                <span>Singapore</span>
              </div>
            </div>
            
            <button className="download-resume-btn" onClick={() => window.open('/resume.pdf', '_blank')}>
              <Download size={20} />
              Download Resume
            </button>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="form-status success">
                ✅ Message sent successfully! Thank you for reaching out.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="form-status error">
                ❌ Failed to send message. Please try again or contact me directly.
              </div>
            )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
