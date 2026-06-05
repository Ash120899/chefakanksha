import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons, PawPrintSVG, LeafSVG, LeafBranchSVG } from '../../assets/svg/Icons';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.footer__inner > *',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5,
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
      }
    );
  }, { scope: footerRef });

  const { footer, contact } = siteContent;

  return (
    <footer ref={footerRef} className="footer" id="footer">
      <div className="footer__paw-trail">
        {[...Array(12)].map((_, i) => (
          <PawPrintSVG key={i} size={10 + (i % 3) * 4} color="rgba(255,255,255,0.06)" style={{ transform: `rotate(${-20 + i * 15}deg)` }} />
        ))}
      </div>
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-text">Chef Akanksha</span>
            <LeafSVG size={18} color="var(--sage)" />
          </div>
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
        <LeafBranchSVG width={200} color="rgba(255,255,255,0.15)" className="footer__divider" />
        <div className="footer__links-grid">
          {footer.links.map((group, i) => (
            <div key={i} className="footer__links-col">
               <h6 className="footer__links-title">{group.title}</h6>
              <ul className="footer__links-list">
                {group.items.map((link, j) => (
                  <li key={j}><a href={link.href} className="footer__link">{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer__badges">
            <h6 className="footer__links-title">Our Promise</h6>
            <div className="footer__badge-row">
              {footer.badges.map((badge, i) => (
                <span key={i} className="footer__badge">{badge}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__social">
          {contact.social.map((s, i) => {
            const key = s.platform.toLowerCase();
            return (
              <a
                key={i}
                href={s.url}
                className="footer__social-link"
                aria-label={s.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons[key] ? icons[key](20) : s.platform}
              </a>
            );
          })}
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
