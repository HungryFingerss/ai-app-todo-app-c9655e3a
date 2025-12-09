import React, { useEffect, useState, useCallback, memo } from 'react';
import './App.css';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'preferred-theme';

const App: React.FC = memo(function App() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className="app-root">
      <header className="app-header" aria-label="Main navigation">
        <div className="app-header-inner">
          <a href="#" className="logo" aria-label="Homepage">
            <span className="logo-mark">◎</span>
            <span className="logo-text">AuraUI</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#workflow" className="nav-link">
              Workflow
            </a>
            <a href="#cta" className="nav-link">
              Get started
            </a>
          </nav>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span className="theme-toggle-text">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="hero-pill">Vite + React starter · Lightning fast</p>
            <h1 id="hero-title" className="hero-title">
              Build beautiful products
              <span className="hero-gradient"> in minutes</span>
            </h1>
            <p className="hero-subtitle">
              Ship modern, accessible React apps with a clean design system,
              sensible defaults, and blazing fast development powered by Vite.
            </p>

            <div className="hero-actions">
              <a href="#cta" className="btn btn-primary">
                Get started
              </a>
              <a href="#features" className="btn btn-ghost">
                Explore features
              </a>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-label">Instant reload</span>
                <span className="hero-meta-value">Vite-powered DX</span>
              </div>
              <div className="hero-meta-divider" aria-hidden="true" />
              <div className="hero-meta-item">
                <span className="hero-meta-label">Type-safe</span>
                <span className="hero-meta-value">TypeScript by default</span>
              </div>
            </div>
          </div>

          <div className="hero-card" aria-hidden="true">
            <div className="hero-card-inner">
              <div className="hero-card-header">
                <span className="hero-card-dot" />
                <span className="hero-card-dot" />
                <span className="hero-card-dot" />
              </div>
              <div className="hero-card-body">
                <div className="hero-card-badge">live preview</div>
                <p className="hero-card-title">Beautiful homepage</p>
                <p className="hero-card-text">
                  This layout is fully responsive, theme-aware, and ready to adapt
                  to your next big idea.
                </p>
                <div className="hero-card-gradient" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section" aria-labelledby="features-title">
          <div className="section-header">
            <p className="section-kicker">Why this starter</p>
            <h2 id="features-title" className="section-title">
              Everything you need to move fast
            </h2>
            <p className="section-subtitle">
              Opinionated defaults that stay out of your way, so you can spend
              more time crafting experiences and less time wiring boilerplate.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <h3 className="feature-title">Modern stack</h3>
              <p className="feature-text">
                Built on React 18 and Vite for instant feedback, ESM-first tooling,
                and a future-proof developer experience.
              </p>
            </article>

            <article className="feature-card">
              <h3 className="feature-title">Type-safe by default</h3>
              <p className="feature-text">
                Strict TypeScript configuration gives you reliable autocompletion
                and catches bugs before they ever hit production.
              </p>
            </article>

            <article className="feature-card">
              <h3 className="feature-title">Accessible UI</h3>
              <p className="feature-text">
                Semantic HTML, focus states, and keyboard-friendly interactions
                help you ship inclusive interfaces from day one.
              </p>
            </article>

            <article className="feature-card">
              <h3 className="feature-title">Dark mode built-in</h3>
              <p className="feature-text">
                A theme system powered by CSS variables lets your product feel at
                home in light and dark environments.
              </p>
            </article>
          </div>
        </section>

        <section id="workflow" className="section" aria-labelledby="workflow-title">
          <div className="workflow-grid">
            <div>
              <p className="section-kicker">Your workflow</p>
              <h2 id="workflow-title" className="section-title">
                From idea to prototype in an afternoon
              </h2>
              <p className="section-subtitle">
                Start with this homepage and grow into a full product. Add routes,
                connect APIs, and ship without wrestling your tooling.
              </p>
            </div>

            <ol className="workflow-steps">
              <li className="workflow-step">
                <span className="workflow-step-number">1</span>
                <div>
                  <h3 className="workflow-step-title">Clone & install</h3>
                  <p className="workflow-step-text">
                    Fork the repo, install dependencies, and run the dev server.
                    You&apos;ll be designing in seconds.
                  </p>
                </div>
              </li>
              <li className="workflow-step">
                <span className="workflow-step-number">2</span>
                <div>
                  <h3 className="workflow-step-title">Customize the UI</h3>
                  <p className="workflow-step-text">
                    Swap colors, fonts, and layouts. The design system is small
                    enough to understand, powerful enough to scale.
                  </p>
                </div>
              </li>
              <li className="workflow-step">
                <span className="workflow-step-number">3</span>
                <div>
                  <h3 className="workflow-step-title">Ship with confidence</h3>
                  <p className="workflow-step-text">
                    TypeScript, accessibility, and responsive styling give you a
                    solid foundation for production-ready apps.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="cta" className="section cta-section" aria-labelledby="cta-title">
          <div className="cta-card">
            <div>
              <h2 id="cta-title" className="cta-title">
                Ready to build your next interface?
              </h2>
              <p className="cta-text">
                Start from this homepage, plug in your content, and launch. No
                heavy frameworks, no unnecessary complexity.
              </p>
            </div>
            <div className="cta-actions">
              <a href="#" className="btn btn-primary">
                Open in editor
              </a>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={toggleTheme}
              >
                Toggle {theme === 'dark' ? 'light' : 'dark'} theme
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" aria-label="Footer">
        <p className="footer-text">
          Built with Vite + React · Theme-aware · Ready for your next idea
        </p>
      </footer>
    </div>
  );
});

export default App;