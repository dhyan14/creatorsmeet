import Head from 'next/head';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add glow effect to cards on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(157, 78, 221, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Your Professional Website</title>
        <meta name="description" content="Professional website with glowy purple and black theme" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="background-animation"></div>
      
      <header>
          <div className="logo">
              <span className="logo-text">YourBrand</span>
          </div>
          <nav>
              <ul>
                  <li><a href="#" className="active">Home</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
              </ul>
          </nav>
      </header>

      <main>
          <section className="hero">
              <div className="hero-content">
                  <h1>Welcome to <span className="highlight">YourBrand</span></h1>
                  <p>Professional solutions for your business needs</p>
                  <button className="cta-button">Get Started</button>
              </div>
          </section>

          <section className="features">
              <h2>Our <span className="highlight">Services</span></h2>
              <div className="feature-cards">
                  <div className="card">
                      <div className="card-icon">🚀</div>
                      <h3>Fast Delivery</h3>
                      <p>Quick and efficient solutions for your projects.</p>
                  </div>
                  <div className="card">
                      <div className="card-icon">💡</div>
                      <h3>Creative Ideas</h3>
                      <p>Innovative approaches to solve complex problems.</p>
                  </div>
                  <div className="card">
                      <div className="card-icon">🛠️</div>
                      <h3>Expert Support</h3>
                      <p>Professional assistance whenever you need it.</p>
                  </div>
              </div>
          </section>
      </main>

      <footer>
          <div className="footer-content">
              <div className="footer-logo">YourBrand</div>
              <div className="footer-links">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">Contact Us</a>
              </div>
              <div className="footer-social">
                  <a href="#" className="social-icon">📱</a>
                  <a href="#" className="social-icon">📷</a>
                  <a href="#" className="social-icon">🐦</a>
              </div>
          </div>
          <div className="footer-bottom">
              <p>&copy; 2023 YourBrand. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
} 