import { projectsApi } from "../api/api";
import ResourceManager from "../components/ResourceManager";
import { formatMonthYear } from "../utils/format";

const ART_STYLES = ["project-art-one", "project-art-two", "project-art-three"];

function Projects() {
  // How ONE project card looks. ResourceManager calls this for every record.
  function renderProject(project, controls, index) {
    const number = String(index + 1).padStart(2, "0");
    return (
      <article className="project-card" key={project._id}>
        <div className={`project-art ${ART_STYLES[index % ART_STYLES.length]}`} aria-hidden="true">
          <div className="project-art-top"><span>Project</span><span>{number}</span></div>
          <span className="project-art-index">{number}</span>
          <span className="project-art-rule" />
        </div>
        <div className="project-copy">
          <span className="project-index">Completed · {formatMonthYear(project.completion)}</span>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {controls}
        </div>
      </article>
    );
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Selected work</p>
        <h1 className="page-title">Projects<span>.</span></h1>
        <p className="page-lead">Product work across bilingual search, conversational AI, and mobile experiences.</p>
      </header>

      <ResourceManager
        api={projectsApi}
        noun="project"
        wrapperClass="project-grid"
        emptyText="No projects have been added yet."
        renderItem={renderProject}
      />
    </main>
  );
}

export default Projects;
