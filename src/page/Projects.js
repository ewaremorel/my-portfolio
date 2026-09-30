function Projects() {
  const projects = [
    {
      number: "01",
      title: "Bilingual agriculture marketplace",
      category: "React · TypeScript · Supabase",
      description: "Built bilingual marketplace features and search that matches French crop names and regional terms to an English product catalog backed by PostgreSQL.",
      artLabel: "Search / FR + EN",
      style: "project-art-one"
    },
    {
      number: "02",
      title: "Locale-aware AI assistant",
      category: "Conversational AI · Prompt design",
      description: "Implemented dynamic, locale-aware prompts to help an agricultural chatbot respond in context across English and French experiences.",
      artLabel: "Prompts / Locale",
      style: "project-art-two"
    },
    {
      number: "03",
      title: "Marketplace for Android",
      category: "Next.js · Capacitor · Android",
      description: "Helped bring an existing Next.js marketplace to native Android with Capacitor, adding camera capture and testing on emulator and physical devices.",
      artLabel: "Web → Android",
      style: "project-art-three"
    }
  ];

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Selected work · FRED AI</p>
        <h1 className="page-title">Projects<span>.</span></h1>
        <p className="page-lead">Product work across bilingual search, conversational AI, and mobile experiences.</p>
      </header>

      <section className="project-grid" aria-label="Selected projects">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className={`project-art ${project.style}`} aria-hidden="true">
              <div className="project-art-top"><span>{project.artLabel}</span><span>0{project.number}</span></div>
              <span className="project-art-index">{project.number}</span>
              <span className="project-art-rule" />
            </div>
            <div className="project-copy">
              <span className="project-index">FRED AI · 2026—Present</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span className="project-stack">{project.category}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Projects;
