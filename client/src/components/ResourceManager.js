import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResourceForm from "./ResourceForm";
import Alert from "./Alert";

// The whole "list + add + edit + delete" screen, shared by Projects and Education.
//   api         -> the CRUD helpers from api.js (projectsApi / qualificationsApi)
//   noun        -> "project" / "qualification"
//   renderItem  -> how ONE record should look: (item, controls) => JSX
//   wrapperClass-> CSS class that lays the records out (grid or list)
function ResourceManager({ api, noun, renderItem, wrapperClass, emptyText }) {
  const { user, isAdmin } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [notice, setNotice] = useState(null); // { type, text } success/error banner
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // the record being edited, or null

  // READ: load everything when the page opens
  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      setItems(await api.list());
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  function openAdd() {
    setNotice(null);
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(item) {
    setNotice(null);
    setEditing(item);
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  // CREATE or UPDATE (the form calls this)
  async function handleSave(values) {
    if (editing) {
      const updated = await api.update(editing._id, values);
      setItems(items.map((it) => (it._id === updated._id ? updated : it)));
      setNotice({ type: "success", text: `The ${noun} was updated.` });
    } else {
      const created = await api.create(values);
      setItems([created, ...items]);
      setNotice({ type: "success", text: `The ${noun} was created.` });
    }
    closeForm();
  }

  // DELETE
  async function handleDelete(item) {
    if (!window.confirm(`Delete this ${noun}? This cannot be undone.`)) return;
    try {
      await api.remove(item._id);
      setItems(items.filter((it) => it._id !== item._id));
      setNotice({ type: "success", text: `The ${noun} was deleted.` });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    }
  }

  // Edit/Delete buttons - ONLY created for administrators
  const controlsFor = (item) =>
    isAdmin ? (
      <div className="item-controls">
        <button type="button" className="btn-small" onClick={() => openEdit(item)}>Edit</button>
        <button type="button" className="btn-small btn-danger" onClick={() => handleDelete(item)}>
          Delete
        </button>
      </div>
    ) : null;

  return (
    <>
      {isAdmin && !formOpen && (
        <div className="toolbar">
          <button type="button" className="btn-primary" onClick={openAdd}>
            + Add {noun}
          </button>
        </div>
      )}

      {user && !isAdmin && (
        <Alert type="info">You are signed in as a regular user, so this page is view-only.</Alert>
      )}

      {!user && (
        <p className="hint-text">
          <Link to="/signin">Sign in</Link> as an administrator to manage this content.
        </p>
      )}

      <Alert type={notice?.type}>{notice?.text}</Alert>

      {isAdmin && formOpen && (
        <ResourceForm
          key={editing ? editing._id : "new"}
          noun={noun}
          initial={editing || undefined}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}

      {loading && <p className="status-text">Loading {noun}s…</p>}

      {loadError && (
        <div>
          <Alert type="error">{loadError}</Alert>
          <button type="button" className="btn-small" onClick={load}>Try again</button>
        </div>
      )}

      {!loading && !loadError && items.length === 0 && (
        <p className="status-text">{emptyText}</p>
      )}

      {!loading && !loadError && items.length > 0 && (
        <section className={wrapperClass}>
          {items.map((item, index) => renderItem(item, controlsFor(item), index))}
        </section>
      )}
    </>
  );
}

export default ResourceManager;
