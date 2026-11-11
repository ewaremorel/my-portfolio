import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page-shell home-page">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Software engineering · AI</p>
          <h1 className="hero-title">Curious by nature.<br />Built to <span>solve.</span></h1>
          <p className="hero-lead">
            I’m Eware, a software engineering technology student specializing in AI and building useful web and mobile experiences.
          </p>
          <div className="button-row">
            <Link className="button-link" to="/projects">Explore my work <span aria-hidden="true">↗</span></Link>
            <Link className="button-link secondary" to="/about">More about me</Link>
          </div>
        </div>

        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img src="/profile.jpg" alt="Eware outdoors" />
            <figcaption className="portrait-caption">
              <span>Profile / 01</span>
              <span>Eware · Developer</span>
            </figcaption>
          </div>
        </figure>
      </section>

      <section className="mission-band" aria-labelledby="mission-title">
        <div>
          <p className="eyebrow">My mission</p>
          <h2 id="mission-title">Make technology feel <span>clearer, kinder,</span> and more useful.</h2>
        </div>
        <p className="mission-copy">
          I bring careful engineering and a people-first mindset to digital tools, especially experiences that work across languages, screens, and real-world needs.
        </p>
      </section>

      <section className="home-focus" aria-label="Areas of focus">
        <p className="eyebrow">Areas of focus</p>
        <div className="focus-list">
          <span>React · TypeScript</span>
          <span>AI · Prompt engineering</span>
          <span>PostgreSQL · Supabase</span>
        </div>
        <Link className="text-link" to="/services">What I do <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}

export default Home;
