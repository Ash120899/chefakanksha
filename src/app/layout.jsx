import './globals.css';

// Import all component CSS files to avoid Next.js App Router restrictions on CSS imports in nested client components
import '../components/LoadingScreen/LoadingScreen.css';
import '../components/Navbar/Navbar.css';
import '../components/Hero/Hero.css';
import '../components/Journey/Journey.css';
import '../components/Craft/Craft.css';
import '../components/Experience/Experience.css';
import '../components/Milestones/Milestones.css';
import '../components/VeganPiatto/VeganPiatto.css';
import '../components/PersonalStory/PersonalStory.css';
import '../components/Collaborate/Collaborate.css';
import '../components/Contact/Contact.css';
import '../components/Footer/Footer.css';
import '../components/CustomCursor/CustomCursor.css';
import '../components/ContactForm/ContactForm.css';
import '../components/Testimonials/Testimonials.css';
import '../components/FootprintTrail/FootprintTrail.css';


export const viewport = {
  themeColor: '#FBF7F0',
};

export const metadata = {
  title: 'Chef Akanksha — Good for you. Kind for them.',
  description: 'Plant-based goodness, made with love. A vegan chef on a mission to create delicious, compassionate meals that nourish the body and respect all living beings.',
  openGraph: {
    title: 'Chef Akanksha — Good for you. Kind for them.',
    description: 'Plant-based goodness, made with love. 100% Vegan cuisine crafted with compassion.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
