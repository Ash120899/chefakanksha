"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import { icons, PawPrintSVG } from '../../assets/svg/Icons';
import './ContactForm.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useGSAP(() => {
    gsap.fromTo('.contact__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    gsap.fromTo('.contact__form',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
    );
    gsap.fromTo('.contact__info',
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
    );
  }, { scope: sectionRef });

  const { contact } = siteContent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} className="contact section section--alt" id="contact">
      <div className="container">
        <div className="contact__header text-center">
          <span className="label">{contact.label} 💌</span>
          <h2>{contact.title}</h2>
          <p className="contact__subtitle">{contact.subtitle}</p>
        </div>
        <div className="contact__grid">
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className={`contact__field ${focused === 'name' || formData.name ? 'contact__field--active' : ''}`}>
              <label className="contact__label">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} required />
              <div className="contact__field-line" />
            </div>
            <div className={`contact__field ${focused === 'email' || formData.email ? 'contact__field--active' : ''}`}>
              <label className="contact__label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} required />
              <div className="contact__field-line" />
            </div>
            <div className={`contact__field ${focused === 'subject' || formData.subject ? 'contact__field--active' : ''}`}>
              <label className="contact__label">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} required>
                <option value="">Choose a topic...</option>
                {contact.fields[2].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <div className="contact__field-line" />
            </div>
            <div className={`contact__field ${focused === 'message' || formData.message ? 'contact__field--active' : ''}`}>
              <label className="contact__label">Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} rows="4" required />
              <div className="contact__field-line" />
            </div>
            <motion.button type="submit" disabled={isSubmitting} className={`btn btn--primary contact__submit ${submitted ? 'contact__submit--sent' : ''}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              {isSubmitting ? 'Sending...' : submitted ? '✓ Message Sent!' : <>{icons.send(18)} Send Message</>}
            </motion.button>
            {submitError && <p className="contact__error" style={{ color: '#d9534f', marginTop: '10px', fontSize: '0.9rem' }}>{submitError}</p>}
          </form>
          <div className="contact__info">
            <div className="contact__info-items">
              {contact.info.map((item, i) => (
                <div key={i} className="contact__info-item">
                  <div className="contact__info-icon">{icons[item.icon](20)}</div>
                  <div>
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact__social">
              <span className="contact__social-label">Follow the journey</span>
              <div className="contact__social-links">
                {contact.social.map((s, i) => (
                  <a key={i} href={s.url} className="contact__social-link" aria-label={s.platform}>
                    {icons[s.platform.toLowerCase()]?.(22)}
                  </a>
                ))}
              </div>
            </div>
            <div className="contact__paw-deco">
              {[...Array(3)].map((_, i) => <PawPrintSVG key={i} size={16 + i * 4} color="var(--tan)" style={{ opacity: 0.2, transform: `rotate(${i * 30}deg)` }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
