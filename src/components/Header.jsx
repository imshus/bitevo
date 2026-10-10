import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import HashLink from './HashLink.jsx';

// Pages that have the "Get the app" section (id="app") at the bottom
const PAGES_WITH_APP_CTA = ['/', '/menu', '/about'];

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClass = ({ isActive }) => (isActive ? 'is-current' : undefined);
  const orderLink = PAGES_WITH_APP_CTA.includes(pathname) ? '#app' : '/#app';

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`} id="top">
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" aria-label="BiteVo home">
          <picture>
            <source srcSet="/assets/logo-480.webp" type="image/webp" />
            <img src="/assets/logo-480.png" alt="BiteVo — Good Food, Better Mood" width="480" height="175" />
          </picture>
        </Link>
        <nav className={`nav__links${open ? ' is-open' : ''}`} id="navLinks" aria-label="Main">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/menu" className={navClass}>Menu</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/support" className={navClass}>Support</NavLink>
          <HashLink to={orderLink} className="btn btn--red nav__cta" onClickCapture={() => setOpen(false)}>Order Now</HashLink>
        </nav>
        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
