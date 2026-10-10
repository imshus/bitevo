import { useLocation, useNavigate } from 'react-router-dom';
import HashLink from '../components/HashLink.jsx';
import { PageHero, AppCta } from '../components/Sections.jsx';
import { CATEGORIES, DISHES } from '../data/food.js';
import { photo } from '../lib/photo.js';
import usePageTitle from '../lib/usePageTitle.js';

const labelOf = key => CATEGORIES.find(c => c.key === key)?.label;

export default function Menu() {
  usePageTitle('Menu');
  const { hash } = useLocation();
  const navigate = useNavigate();

  // The selected category lives in the URL (e.g. /menu#snacks) so it can be linked to.
  const fromHash = hash.slice(1);
  const filter = CATEGORIES.some(c => c.key === fromHash) ? fromHash : 'all';
  const shown = filter === 'all' ? DISHES : DISHES.filter(d => d.cat === filter);

  const choose = key => navigate({ hash: key === 'all' ? '' : `#${key}` }, { replace: true });

  return (
    <>
      <PageHero pill="Our Menu" title={<>Something for <em>every craving</em></>}>
        Biryanis, comfort meals, quick bites and sweet treats — every dish cooked fresh when you order.
      </PageHero>

      <section className="section section--menu">
        <div className="container">
          <div className="tabs" role="group" aria-label="Filter menu">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                className={`tab${filter === c.key ? ' is-active' : ''}`}
                aria-pressed={filter === c.key}
                onClick={() => choose(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* key={filter} replays the card animation whenever the category changes */}
          <div className="menu menu--full" key={filter}>
            {shown.map(d => (
              <article className="dish is-shown" key={d.name}>
                <div className="dish__img"><img src={photo(d.photo, 600, 450)} alt={d.alt} loading="lazy" /></div>
                <div className="dish__body">
                  <span className="dish__tag">{labelOf(d.cat)}</span>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                  <HashLink to="#app" className="dish__link">Order now <span aria-hidden="true">&rarr;</span></HashLink>
                </div>
              </article>
            ))}
          </div>

          <p className="menu-note">Dishes and availability may vary by location. Check the BiteVo app for today's menu and prices.</p>
        </div>
      </section>

      <AppCta title="Found your favourite?" text="Order it hot and fresh on the BiteVo app." />
    </>
  );
}
