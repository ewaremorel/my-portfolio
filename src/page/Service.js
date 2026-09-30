function Services() {
  const services = [
    { number: "01", title: "Web Development", description: "Modern websites and web applications." },
    { number: "02", title: "Mobile App Development", description: "Mobile experiences designed around real needs." },
    { number: "03", title: "Database Design", description: "Structured data foundations for reliable applications." }
  ];

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">How I can help</p>
        <h1 className="page-title">Services<span>.</span></h1>
        <p className="page-lead">Thoughtful development from the first idea to the finished experience.</p>
      </header>

      <section className="service-grid" aria-label="Services offered">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <span className="service-number">{service.number}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Services;
