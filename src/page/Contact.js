import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first: "",
    last: "",
    phone: "",
    email: "",
    message: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", form);
    navigate("/");
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Let’s talk</p>
        <h1 className="page-title">Get in touch<span>.</span></h1>
        <p className="page-lead">Have a question or an idea to discuss? Send me a note.</p>
      </header>

      <section className="contact-layout">
        <p className="contact-note">Share a few details and I’ll be glad to hear from you.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="first">First name</label>
            <input id="first" name="first" autoComplete="given-name" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="last">Last name</label>
            <input id="last" name="last" autoComplete="family-name" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" onChange={handleChange} required />
          </div>
          <div className="form-field full-width">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" onChange={handleChange} required />
          </div>
          <button type="submit">Send message <span aria-hidden="true">↗</span></button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
