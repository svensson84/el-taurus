import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, TextField, InputAdornment } from "@mui/material";
import {
  PersonOutlineRounded,
  AlternateEmailRounded,
  MailOutlineRounded,
  PhoneAndroidRounded,
} from "@mui/icons-material";

const ContactForm = () => {
  const EMAILJS_SERVICE_ID = "service_863d7z6";
  const EMAILJS_TEMPLATE_ID = "template_prxjtgi";

  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);
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
          if (
            error.text ===
            "reCAPTCHA: The g-recaptcha-response parameter not found"
          ) {
            console.log("FAILED...", error);
            setRecaptchaFailed(true);
          } else {
            console.log("FAILED...", error);
            setError(true);
          }
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
    <div>
      {recaptchaFailed && (
        <div>
          Du musst zuerst das reCAPTCHA H&auml;kchen setzen, bevor deine Anfrage
          gesendet werden kann.
        </div>
      )}

      <form
        style={{ position: "left", width: "300px" }}
        className="contact-form"
        ref={formRef}
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input type="hidden" name="contact_number" />
        <div>
          <TextField
            id="user_name"
            name="user_name"
            label="Name"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRounded />
                </InputAdornment>
              ),
            }}
            size="small"
            margin="dense"
            variant="outlined"
            fullWidth
            className="contact-form-input"
          />
        </div>
        <div>
          <TextField
            id="user_email"
            name="user_email"
            label="E-Mail"
            type="email"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailRounded />
                </InputAdornment>
              ),
            }}
            size="small"
            margin="dense"
            variant="outlined"
            fullWidth
            className="contact-form-input"
          />
        </div>
        <div>
          <TextField
            id="user_phone"
            name="user_phone"
            label="Mobile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidRounded />
                </InputAdornment>
              ),
            }}
            size="small"
            margin="dense"
            variant="outlined"
            fullWidth
            className="contact-form-input"
          />
        </div>
        <div>
          <TextField
            id="message"
            name="message"
            label="Anliegen"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineRounded />
                </InputAdornment>
              ),
            }}
            multiline
            margin="dense"
            rows={5}
            variant="outlined"
            fullWidth
            className="contact-form-input"
          />
        </div>
        <div>
          {/* reCAPTCHA's server sitekey is saved under email templates of emailjs */}
          <ReCAPTCHA sitekey="6LdOo9AhAAAAAOWUQaIemW7skUKng73JLFt0lI-8" />
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            type="submit"
            sx={{
              backgroundColor: "#6d034b",
              "&:hover": {
                backgroundColor: "#a41b6b",
              },
              marginTop: "10px"
            }}
          >
            Anfrage senden!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
