import { useCallback, useEffect, useState } from "react";
import { contactsApi } from "../api/api";
import ContactForm from "../components/ContactForm";
import Alert from "../components/Alert";

// Administrator-only page (protected in App.js): read, edit and delete messages.
// New messages are CREATED by visitors through the public Contact page.
function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [notice, setNotice] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      setContacts(await contactsApi.list());
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpdate(values) {
    const updated = await contactsApi.update(editing._id, values);
    setContacts(contacts.map((c) => (c._id === updated._id ? updated : c)));
    setEditing(null);
    setNotice({ type: "success", text: "The message was updated." });
  }

  async function handleDelete(contact) {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    try {
      await contactsApi.remove(contact._id);
      setContacts(contacts.filter((c) => c._id !== contact._id));
      setNotice({ type: "success", text: "The message was deleted." });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    }
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Administrator</p>
        <h1 className="page-title">Messages<span>.</span></h1>
        <p className="page-lead">Contact form submissions saved in MongoDB.</p>
      </header>

      <Alert type={notice?.type}>{notice?.text}</Alert>

      {editing && (
        <ContactForm
          key={editing._id}
          initial={editing}
          submitLabel="Save changes"
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading && <p className="status-text">Loading messages…</p>}
      {loadError && (
        <div>
          <Alert type="error">{loadError}</Alert>
          <button type="button" className="btn-small" onClick={load}>Try again</button>
        </div>
      )}
      {!loading && !loadError && contacts.length === 0 && (
        <p className="status-text">No messages yet.</p>
      )}

      {!loading && !loadError && contacts.length > 0 && (
        <section className="message-list" aria-label="Contact messages">
          {contacts.map((c) => (
            <article className="message-card" key={c._id}>
              <header>
                <h2>{c.firstName} {c.lastName}</h2>
                <span className="message-date">{new Date(c.createdAt).toLocaleString("en-CA")}</span>
              </header>
              <p className="message-meta">{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
              <p>{c.message}</p>
              <div className="item-controls">
                <button type="button" className="btn-small" onClick={() => { setNotice(null); setEditing(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Edit
                </button>
                <button type="button" className="btn-small btn-danger" onClick={() => handleDelete(c)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default AdminContacts;
