function Education() {
  const education = [
    {
      year: "01/2026 — Present",
      title: "Software Engineering Technology — Artificial Intelligence",
      credential: "Advanced Diploma · In progress",
      institution: "Centennial College · Toronto, Ontario",
      details: "Relevant study: programming, databases, client-side web development, software requirements and testing, web interface design, and Unix/Linux."
    },
    {
      year: "10/2015 — 07/2020",
      title: "Topographic Land Surveying Engineering",
      credential: "Master’s degree",
      institution: "National Advanced School of Public Works · Yaoundé, Cameroon",
      details: "Engineering education grounded in measurement, analysis, and solving problems across complex construction projects."
    }
  ];

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">A foundation in engineering</p>
        <h1 className="page-title">Education<span>.</span></h1>
        <p className="page-lead">Building on an engineering background while specializing in software and artificial intelligence.</p>
      </header>

      <section className="education-list" aria-label="Education timeline">
        {education.map((item) => (
          <article className="education-item" key={item.year}>
            <span className="education-year">{item.year}</span>
            <div className="education-content">
              <span className="education-credential">{item.credential}</span>
              <h2>{item.title}</h2>
              <p className="education-institution">{item.institution}</p>
              <p className="education-details">{item.details}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Education;
