import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import About from './components/About';
import Meta from './components/Meta';
import MobileNav from './components/MobileNav';

function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Meta />
      <Header />
      <MobileNav />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <CTA />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
