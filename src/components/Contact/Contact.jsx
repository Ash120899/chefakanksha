import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons } from '../../assets/svg/Icons';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const { contact } = siteContent;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({});

  useGSAP(() => {
    // Label
    gsap.fromTo('.contact__label',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.contact__header', start: 'top 88%', end: 'top 72%', scrub: true }
      }
    );

    // Title
    gsap.fromTo('.contact__title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.contact__header', start: 'top 84%', end: 'top 58%', scrub: true }
      }
    );

    // Subtitle
    gsap.fromTo('.contact__subtitle',
      { opacity: 0, y: 25 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.contact__subtitle', start: 'top 90%', end: 'top 70%', scrub: true }
      }
    );

    // Form reveal
    gsap.fromTo('.contact__form-wrapper',
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, ease: 'none',
        scrollTrigger: { trigger: '.contact__body', start: 'top 85%', end: 'top 55%', scrub: true }
      }
    );

    // Info card reveal
    gsap.fromTo('.contact__info-card',
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, ease: 'none',
        scrollTrigger: { trigger: '.contact__body', start: 'top 85%', end: 'top 55%', scrub: true }
      }
    );

    // Individual form fields stagger
    const fields = gsap.utils.toArray('.contact__field');
    fields.forEach((field, i) => {
      gsap.fromTo(field,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, ease: 'none',
          scrollTrigger: {
            trigger: field,
            start: `top ${92 - i * 2}%`,
            end: `top ${72 - i * 2}%`,
            scrub: true,
          }
        }
      );
    });
  }, { scope: sectionRef });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (name) => {
    setFocused({ ...focused, [name]: true });
  };

  const handleBlur = (name) => {
    if (!formData[name]) {
      setFocused({ ...focused, [name]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 4 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFocused({});
    }, 4000);
  };

  // Split subtitle by \n\n
  const subtitleParts = contact.subtitle.split('\n\n');

  // Map social platform names to icon keys
  const socialIconMap = {
    Instagram: 'instagram',
    YouTube: 'youtube',
    Twitter: 'twitter',
    Facebook: 'facebook',
    Linkedin: 'linkedin',

  };

  return (
    <section ref={sectionRef} className="contact section section--dark" id="contact">
      <div className="grain-overlay" />

      {/* Decorative gradient overlay */}
      <div className="contact__gradient" />

      <div className="container contact__container">
        {/* Header */}
        <div className="contact__header text-center">
          <span className="contact__label label">{contact.label} ✉️</span>
          <h2 className="contact__title">{contact.title}</h2>
          <hr className="divider divider--center" style={{ background: 'var(--sage)' }} />
          <div className="contact__subtitle" style={{ willChange: 'transform, opacity' }}>
            {subtitleParts.map((part, i) => (
              <p key={i}>{part}</p>
            ))}
          </div>
        </div>

        {/* Body: Form + Info */}
        <div className="contact__body">
          {/* Form */}
          <div className="contact__form-wrapper" style={{ willChange: 'transform, opacity' }}>
            <form className="contact__form" onSubmit={handleSubmit}>
              {contact.fields.map((field) => (
                <div
                  key={field.name}
                  className={`contact__field ${focused[field.name] || formData[field.name] ? 'contact__field--active' : ''
                    }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <label className="contact__floating-label" htmlFor={field.name}>
                    {field.label}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className="contact__input contact__select"
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={() => handleBlur(field.name)}
                      required
                    >
                      <option value="" disabled></option>
                      {field.options.map((opt, j) => (
                        <option key={j} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      className="contact__input contact__textarea"
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={() => handleBlur(field.name)}
                      rows={5}
                      required
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="contact__input"
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={() => handleBlur(field.name)}
                      required
                    />
                  )}

                  <div className="contact__underline" />
                </div>
              ))}

              <button
                type="submit"
                className={`contact__submit btn btn--primary ${submitted ? 'contact__submit--success' : ''}`}
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <span className="contact__submit-check">✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    {icons.send(18)}
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="contact__info-card" style={{ willChange: 'transform, opacity' }}>
            <div className="contact__info-inner">
              <h4 className="contact__info-heading">Get in Touch</h4>
              <div className="contact__info-divider" />

              {/* Info items */}
              <div className="contact__info-items">
                {contact.info.map((item, i) => (
                  <div key={i} className="contact__info-item">
                    <div className="contact__info-icon">
                      {icons[item.icon] && icons[item.icon](22)}
                    </div>
                    <div className="contact__info-text">
                      <span className="contact__info-label">{item.label}</span>
                      <span className="contact__info-value">
                        {item.icon === 'mail' ? (
                          <a href={`mailto:${item.value}`}>{item.value}</a>
                        ) : (
                          item.value
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="contact__social">
                <span className="contact__social-label">Follow Along</span>
                <div className="contact__social-links">
                  {contact.social.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      className="contact__social-link"
                      aria-label={s.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {icons[socialIconMap[s.platform]] && icons[socialIconMap[s.platform]](22)}
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative quote */}
              <div className="contact__info-quote handwritten">
                "Great food should represent the world we hope to build."
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top wave */}
      <div className="section-wave section-wave--top">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,50 C1260,70 1380,20 1440,35 L1440,0 L0,0Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  );
}
