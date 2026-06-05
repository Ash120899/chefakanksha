import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons, LeafSVG } from '../../assets/svg/Icons';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);

  // Scroll-based background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = siteContent.nav.links.map(l => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Magnetic button effect
  const handleMagnetic = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="navbar__logo-text">Chef Akanksha</span>
          <LeafSVG size={18} color="var(--olive-green)" />
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          {siteContent.nav.links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="navbar__cta btn btn--primary"
          onClick={(e) => handleNavClick(e, '#contact')}
          onMouseMove={handleMagnetic}
          onMouseLeave={handleMagneticLeave}
        >
          {siteContent.nav.cta.label} 🌿
        </a>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? icons.close(24) : icons.menu(24)}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {siteContent.nav.links.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: `${i * 0.05}s` }}>
              <a href={link.href} className="navbar__mobile-link" onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn--primary" style={{ marginTop: '1.5rem' }} onClick={(e) => handleNavClick(e, '#contact')}>
          {siteContent.nav.cta.label}
        </a>
      </div>
    </nav>
  );
}
