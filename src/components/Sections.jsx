import { Apple, Play } from './Icons.jsx';

export function PageHero({ pill, title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="pill">{pill}</span>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}

// "Get the app" banner. Replace the store hrefs with your real App Store / Google Play links.
export function AppCta({ title, text, spaced = false }) {
  return (
    <section className={`cta${spaced ? ' cta--spaced' : ''}`} id="app">
      <div className="container">
        <div className="cta__card">
          <div className="cta__text">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta__buttons">
            <a href="#" className="store">
              <Apple />
              <span><small>Download on the</small>App Store</span>
            </a>
            <a href="#" className="store">
              <Play />
              <span><small>Get it on</small>Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
