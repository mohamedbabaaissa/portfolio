import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCube, faDiamond, faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { COPY, SKILLS } from '../config';
import { useReveal, useScrolled } from '../motion';

function Coin({ className }) {
  return (
    <span className={`coin ${className}`} aria-hidden="true">
      <FontAwesomeIcon icon={faDollarSign} />
    </span>
  );
}

function Silhouette() {
  return (
    <div className="sil">
      <span className="sil-head" />
      <span className="sil-neck" />
      <span className="sil-body" />
      <p className="sil-label">
        <strong>YOUR PNG HERE</strong>
        <span>transparent background</span>
      </p>
    </div>
  );
}

function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function Portfolio() {
  const [state, setState] = useState({ status: 'loading' });
  const rootRef = useRef(null);
  const scrolled = useScrolled();

  useEffect(() => {
    api
      .public()
      .then((data) => setState({ status: 'ready', ...data }))
      .catch(() => setState({ status: 'error' }));
  }, []);

  // Title and description shown in Google results and when the link is shared.
  useEffect(() => {
    const p = state.profile;
    if (!p?.name) return;
    const title = p.title ? `${p.name} | ${p.title}` : `${p.name} | Portfolio`;
    const description = (p.bio || `${p.name}'s portfolio: projects, skills and contact.`).slice(0, 160);
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
  }, [state.profile]);

  // Hooks must run before any early return.
  useReveal(rootRef, [state.status, state.projects?.length]);

  if (state.status === 'loading') return <div className="pub pub-status">Loading…</div>;
  if (state.status === 'error') {
    return <div className="pub pub-status">The site could not load. Refresh the page to try again.</div>;
  }

  const { profile, projects } = state;
  const skills = [profile.title, ...SKILLS].filter(
    (word, i, all) => word && all.findIndex((w) => w.toLowerCase() === word.toLowerCase()) === i
  );

  return (
    <div className="pub" id="top" ref={rootRef}>
      <header className={`pub-bar${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap pub-nav">
          <a className="pub-brand" href="#top">
            <span className="pub-brand-mark" />
            {profile.name}
          </a>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="about">
        <div className="hero-bg-name" aria-hidden="true">
          {profile.name}
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow reveal">Welcome to my portfolio</p>
            <h1 className="reveal" style={{ '--d': '80ms' }}>
              Hi, I&apos;m
              <span className="outline">{profile.name}</span>
            </h1>
            <p className="hero-bio reveal" style={{ '--d': '160ms' }}>{profile.bio || COPY.fallbackBio}</p>
            <div className="hero-actions reveal" style={{ '--d': '240ms' }}>
              <a className="btn-dark" href="#work">
                View my work
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <a className="btn-line" href="#contact">
                Contact me
              </a>
            </div>
          </div>

          <div className="hero-visual reveal" style={{ '--d': '120ms' }}>
            <div className={`hero-card${profile.photo ? ' has-photo' : ''}`}>
              {profile.photo && <img className="hero-photo" src={profile.photo} alt={profile.name} />}
            </div>
            {!profile.photo && (
              <div className="hero-figure">
                <Silhouette />
              </div>
            )}
            <Coin className="coin-dark" />
            <Coin className="coin-light" />
            <FontAwesomeIcon className="deco-cube" icon={faCube} aria-hidden="true" />
            <FontAwesomeIcon className="deco-plus" icon={faPlus} aria-hidden="true" />
            <span className="deco-star" aria-hidden="true" />
          </div>
        </div>
        <p className="hero-scroll">Scroll</p>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {skills.map((word) => (
                <span className="marquee-item" key={word}>
                  {word}
                  <FontAwesomeIcon className="marquee-sep" icon={faDiamond} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="wrap work" id="work">
        <div className="work-head reveal">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Latest projects</h2>
          </div>
          <p className="work-intro">{COPY.workIntro}</p>
        </div>

        {projects.length === 0 ? (
          <p className="work-empty">Projects will show up here soon.</p>
        ) : (
          <div className="work-grid">
            {projects.map((p, i) => (
              <article className="proj-card reveal" key={p.id} style={{ '--d': `${Math.min(i, 5) * 70}ms` }}>
                <div className="card-media">
                  {p.image ? <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" /> : <span>Project image</span>}
                </div>
                <div className="card-body">
                  <h3>{p.title}</h3>
                  {p.description && <p>{p.description}</p>}
                  {p.tags.length > 0 && (
                    <ul className="tags">
                      {p.tags.map((tag) => (
                        <li className="tag" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.link && (
                    <a className="card-link" href={p.link} target="_blank" rel="noopener noreferrer">
                      View project
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="contact" id="contact">
        <div className="wrap reveal">
          <p className="eyebrow">Get in touch</p>
          <h2>Let&apos;s talk.</h2>
          {profile.email && (
            <a className="contact-mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          )}
          {(profile.github || profile.linkedin) && (
            <div className="contact-links">
              {profile.github && (
                <a className="btn-ghost" href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {profile.linkedin && (
                <a className="btn-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          )}
          <p className="contact-foot">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </section>
    </div>
  );
}
