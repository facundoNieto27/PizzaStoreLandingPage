import { React, useState } from "react";

function ContactForm({ pizzas }) {
  // Contact form

  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formValues.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formValues.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // This is where you connect to your Express backend
        const response = await fetch("http://localhost:5000/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (data.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);

          // Reset form after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setFormValues({
              name: "",
              email: "",
              message: "",
            });
          }, 3000);
        } else {
          setIsSubmitting(false);
          // Handle error from server
          alert(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        setIsSubmitting(false);
        alert("Failed to send message. Please try again later.");
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className="contact-form-box">
      {isSubmitted ? (
        <div className="success-message">
          <div className="success-icon"></div>
          <h3 className="success-title">Message Sent!</h3>
          <p className="success-text">
            Thank you for contacting us. We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="error-message">
                <span className="error-icon"></span> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="error-message">
                <span className="error-icon"></span> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              className={`form-textarea ${errors.message ? "input-error" : ""}`}
              placeholder="How can we help you?"
            ></textarea>
            {errors.message && (
              <p className="error-message">
                <span className="error-icon"></span> {errors.message}
              </p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="form-button">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
