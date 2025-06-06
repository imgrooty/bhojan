'use client';

import { useEffect } from 'react';

// Data for our menu items
const menuItems = [
  {
    name: "Maithil Thali",
    description: "A grand platter featuring rice, dal, various vegetable curries, and traditional pickles.",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2581&auto=format&fit=crop",
  },
  {
    name: "Dahi Vada",
    description: "Soft lentil dumplings soaked in creamy yogurt, garnished with sweet and spicy chutneys.",
    price: "₹120",
    image: "https://images.unsplash.com/photo-1613478223719-2ab3b143c4a4?q=80&w=2592&auto=format&fit=crop",
  },
  {
    name: "Litti Chokha",
    description: "A beloved dish of roasted wheat balls stuffed with sattu, served with mashed vegetables.",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c72732b2?q=80&w=2592&auto=format&fit=crop",
  },
  {
    name: "Thekua",
    description: "A crispy and sweet deep-fried biscuit, a traditional snack for festivals.",
    price: "₹90",
    image: "https://plus.unsplash.com/premium_photo-1694699353366-a280207c3747?q=80&w=2592&auto=format&fit=crop",
  },
];

// Data for cultural highlights
const culturalHighlights = [
    {
      icon: "🎨",
      title: "Madhubani Art",
      description: "Our restaurant is a living gallery of Madhubani art, featuring intricate patterns and vibrant colors that tell ancient stories."
    },
    {
      icon: "🎉",
      title: "Festivals",
      description: "We celebrate Maithil festivals like Chhath Puja and Sama Chakeva with special menus and events."
    },
    {
      icon: "🎵",
      title: "Folk Music",
      description: "Enjoy the soulful sounds of Maithil folk music, creating an authentic and immersive dining experience."
    }
  ];

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId!);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
        <CultureSection />
      </main>
      <Footer />
    </>
  );
}

const Header = () => (
  <header className="main-header">
    <div className="container">
      <div className="header-content">
        <a href="#" className="logo-link">Mithila Rasoi</a>
        <nav className="main-nav">
          <a href="#menu">Menu</a>
          <a href="#culture">Culture</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="hero">
    <div className="container">
      <h1>A Taste of Tradition. A Celebration of Art.</h1>
      <p>
        Welcome to Mithila Rasoi, where every dish is a masterpiece inspired by
        Maithil culture and every corner is adorned with the beauty of Madhubani art.
      </p>
      <a href="#menu" className="btn btn-primary">Explore the Menu</a>
    </div>
  </section>
);

const MenuSection = () => (
  <section id="menu">
    <div className="container">
      <div className="section-title-wrapper">
        <h2>Our Culinary Canvas</h2>
        <hr className="decorative-line" />
      </div>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.image} alt={item.name} className="menu-card-image" />
            <div className="menu-card-content">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="menu-card-price">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CultureSection = () => (
    <section id="culture" style={{ backgroundColor: '#F8F0E3' }}>
      <div className="container">
        <div className="section-title-wrapper">
          <h2>The Heart of Mithila</h2>
          <hr className="decorative-line" />
        </div>
        <div className="culture-grid">
          {culturalHighlights.map((item, index) => (
            <div className="culture-card" key={index}>
              <div className="culture-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

const Footer = () => (
  <footer className="main-footer" id="contact">
    <div className="container">
      <h3>Mithila Rasoi</h3>
      <p>Janakpur, Madhesh Pradesh, Nepal</p>
      <p>info@mithilarasoi.com | +977-41-520001</p>
      <hr className="decorative-line" style={{ borderColor: 'var(--color-cream)', width: '50px', margin: '2rem auto' }} />
      <p>&copy; {new Date().getFullYear()} Mithila Rasoi. All Rights Reserved.</p>
    </div>
  </footer>
);
