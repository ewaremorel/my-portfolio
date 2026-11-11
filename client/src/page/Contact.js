import { contactsApi } from "../api/api";
import ContactForm from "../components/ContactForm";

function Contact() {
  // Called by the form after validation passes. It saves the message in MongoDB
  // through the backend API and returns the text for the green success box.
  async function handleSend(values) {
    await contactsApi.create({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    return "Thank you! Your message was sent and saved. I will get back to you soon.";
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
        <ContactForm onSubmit={handleSend} resetOnSuccess />
      </section>
    </main>
  );
}

export default Contact;
