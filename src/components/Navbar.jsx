import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { user, doLogout, setLoginOpen, setSosOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#features',    label: 'Features' },
    { href: '#driver',      label: 'Driver Register' },
    { href: '#parental',    label: 'Parental Control' },
    { href: '#attendance',  label: 'Attendance' },
    { href: '#analytics',   label: 'Analytics' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`} id="mainNav">
      <a className="nav-logo" href="#home" aria-label="SafeRide Home" onClick={() => setMenuOpen(false)}>
        <div className="nav-logo-icon" aria-hidden="true">🚐</div>
        <div className="nav-logo-text">Safe<span>Ride</span></div>
      </a>

      <ul className="nav-links" id="navLinks">
        {navLinks.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-actions" id="navActions">
        {user ? (
          <>
            <span className="nav-user">👤 {user.name.split(' ')[0]}</span>
            <button className="btn-nav-outline" onClick={doLogout}>Log Out</button>
            <button className="btn-sos-sm" onClick={() => setSosOpen(true)}>🆘 SOS</button>
          </>
        ) : (
          <>
            <button className="btn-nav-outline" onClick={() => setLoginOpen(true)}>Log In</button>
            <button className="btn-nav-primary" onClick={() => setLoginOpen(true)}>Get Started</button>
          </>
        )}
      </div>

      <button
        className="nav-ham"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(v => !v)}
      >
        <span className={menuOpen ? 'rot1' : ''}></span>
        <span className={menuOpen ? 'hide' : ''}></span>
        <span className={menuOpen ? 'rot2' : ''}></span>
      </button>
    </nav>
  );
}
