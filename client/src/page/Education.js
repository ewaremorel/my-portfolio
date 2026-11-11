import { qualificationsApi } from "../api/api";
import ResourceManager from "../components/ResourceManager";
import { formatMonthYear } from "../utils/format";

function Education() {
  function renderQualification(item, controls) {
    return (
      <article className="education-item" key={item._id}>
        <span className="education-year">{formatMonthYear(item.completion)}</span>
        <div className="education-content">
          <h2>{item.title}</h2>
          <p className="education-details">{item.description}</p>
          {controls}
        </div>
      </article>
    );
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">A foundation in engineering</p>
        <h1 className="page-title">Education<span>.</span></h1>
        <p className="page-lead">Building on an engineering background while specializing in software and artificial intelligence.</p>
      </header>

      <ResourceManager
        api={qualificationsApi}
        noun="qualification"
        wrapperClass="education-list"
        emptyText="No qualifications have been added yet."
        renderItem={renderQualification}
      />
    </main>
  );
}

export default Education;
