import React, { useState, useRef } from "react";
import "./ContactForm.css";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const EMAILJS_SERVICE_ID = "service_863d7z6";
  const EMAILJS_TEMPLATE_ID = "template_prxjtgi";

  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // generate a five digit number for the contact_number variable
    formRef.current.contact_number.value = (Math.random() * 100000) | 0;

    emailjs.init("J3B_0yKxI16w5L7gu");
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current)
      .then(
        function () {
          setSubmitted(true);
        },
        function (error) {
          console.log("FAILED...", error);
          setError(true);
        }
      );
  };

  if (submitted) {
    return (
      <>
        <div>Danke vielmals für deine Anfrage!</div>
        <div>Ich freue mich Dich kennen zu lernen.</div>
      </>
    );
  } else if (error) {
    return (
      <>
        <div>
          Deine Anfrage konnte aufgrund technischer Probleme leider nicht
          gesendet werden.
        </div>
        <div>
          Versuche mich bitte direkt per E-Mail (
          <a href="mailto:zaugg84@gmail.com">zaugg84@gmail.com</a>) zu
          erreichen. Danke!
        </div>
      </>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <input type="hidden" name="contact_number" />
      <div>
        <input type="text" placeholder="Dein Name" name="user_name" required />
      </div>
      <div>
        <input type="email" placeholder="Email" name="user_email" required />
      </div>
      <div>
        <textarea placeholder="Dein Anliegen" name="message" required />
      </div>
      <div>
        <button type="submit">Anfrage senden!</button>
      </div>
    </form>
  );
};

export default ContactForm;
