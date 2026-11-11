function About() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">From field notes to interfaces</p>
        <h1 className="page-title">About Eware<span>.</span></h1>
      </header>

      <section className="about-grid">
        <img className="about-photo" src="/profile.jpg" alt="Eware outdoors" />
        <div className="about-copy">
          <p className="about-intro">I used to map the ground. Now I map the next click.</p>
          <p>
            Before software, I worked as a land surveyor engineer on construction and road projects in Cameroon. Precision, patience, and clear communication mattered on site; those habits still shape the way I build.
          </p>
          <p>
            Today, I’m studying Software Engineering Technology with a specialization in Artificial Intelligence at Centennial College. I work across web and mobile with React, TypeScript, Python, SQL, and Supabase, and I’m drawn to technology that solves practical problems without losing sight of the people using it.
          </p>
          <p>
            Most recently, I’ve helped develop bilingual agricultural tools where language, search, and conversational AI meet. English and French are both part of how I think about building for people.
          </p>
          <div className="about-actions">
            <a className="button-link" href="/resume.pdf" download>Download my resume <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="mailto:ewaremorel1@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
