import React, { useState, useEffect } from "react";
import margheritaImg from "../images/margherita.jpeg";
import pepperoniImg from "../images/pepperoni-caroussell.jpeg";
import chickenImg from "../images/chicken.avif";
import veggieImg from "../images/veggie.jpg";
import hawaiianImg from "../images/hawaiian.jpg";
import meatLoversImg from "../images/meat-lovers.jpg";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

function App() {
  const [currentPizza, setCurrentPizza] = useState(0);
  const pizzas = [
    {
      name: "Margherita",
      description: "Classic tomato sauce, mozzarella & basil",
      image: margheritaImg,
    },
    {
      name: "Pepperoni",
      description: "Tomato sauce, mozzarella & spicy pepperoni",
      image: pepperoniImg,
    },
    {
      name: "BBQ Chicken",
      description: "BBQ sauce, chicken, red onions & cilantro",
      image: chickenImg,
    },
    {
      name: "Vegetarian",
      description: "Tomato sauce, veggies, mushrooms & olives",
      image: veggieImg,
    },
    {
      name: "Hawaiian",
      description: "Tomato sauce, ham, pineapple & mozzarella",
      image: hawaiianImg,
    },
    {
      name: "Meat Lovers",
      description: "Tomato sauce, pepperoni, sausage, bacon & ham",
      image: meatLoversImg,
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPizza((prevPizza) => (prevPizza + 1) % pizzas.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [pizzas.length]);

  const nextPizza = () => {
    setCurrentPizza((prevPizza) => (prevPizza + 1) % pizzas.length);
  };

  const prevPizza = () => {
    setCurrentPizza(
      (prevPizza) => (prevPizza - 1 + pizzas.length) % pizzas.length
    );
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
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
      }, 1000);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <span className="logo-text">PizzaLand</span>
        </div>
        <nav className="nav">
          <a href="#menu" className="nav-link">
            Menu
          </a>
          <a href="#hours" className="nav-link">
            Hours
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </header>

      <section className="hero">
        <h1 className="hero-title">Welcome to PizzaLand</h1>
        <p className="hero-subtitle">Crafting Perfect Pizzas Since 2010</p>
        <button className="order-button">Order Now</button>
      </section>

      <section id="menu" className="menu-section">
        <h2 className="section-title">Our Specialty Pizzas</h2>

        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevPizza}>
            &#10094;
          </button>
          <div className="carousel">
            <div className="carousel-item">
              <h3 className="pizza-name">{pizzas[currentPizza].name}</h3>
              <img
                src={pizzas[currentPizza].image}
                alt={pizzas[currentPizza].name}
                className="pizza-image"
              />
              <p className="pizza-desc">{pizzas[currentPizza].description}</p>
            </div>
          </div>
          <button className="carousel-button next" onClick={nextPizza}>
            &#10095;
          </button>

          <div className="carousel-dots">
            {pizzas.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentPizza ? "active" : ""}`}
                onClick={() => setCurrentPizza(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {pizzas.map((pizza, index) => (
            <div className="menu-item" key={index}>
              <h3>{pizza.name}</h3>
              <p>{pizza.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="hours" className="hours-section">
        <h2 className="section-title">Opening Hours</h2>
        <div className="hours-container">
          <div className="hours-item">
            <span className="day">Monday - Friday</span>
            <span className="time">11 AM - 10 PM</span>
          </div>
          <div className="hours-item">
            <span className="day">Saturday</span>
            <span className="time">12 PM - 11 PM</span>
          </div>
          <div className="hours-item">
            <span className="day">Sunday</span>
            <span className="time">Closed</span>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info-box">
            <h3 className="contact-title">Get in Touch</h3>

            <div className="contact-info">
              <div className="contact-item">
                <div className="icon phone-icon"></div>
                <span>+5544332211</span>
              </div>

              <div className="contact-item">
                <div className="icon mail-icon"></div>
                <span>info@pizzaplace.com</span>
              </div>

              <div className="contact-item">
                <div className="icon location-icon"></div>
                <a
                  href="https://www.google.com/maps/place/El+Imperio+de+la+Pizza/@-34.58689,-58.4548231,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb5e4e5a2fd87:0x59358a2c4ae0eac5!8m2!3d-34.58689!4d-58.4548231!16s%2Fg%2F1vyk3pl_?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-link"
                >
                  123 Pizza St, Food City
                </a>
              </div>
            </div>

            <div className="business-hours">
              <p>We're open from Monday to Sunday, 11:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
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
                    className={`form-input ${
                      errors.email ? "input-error" : ""
                    }`}
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
                    className={`form-textarea ${
                      errors.message ? "input-error" : ""
                    }`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="error-message">
                      <span className="error-icon"></span> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-button"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="social-links">
          <a href="#" className="social-link">
            <i className="icon facebook-icon"></i>
          </a>
          <a href="#" className="social-link">
            <i className="icon instagram-icon"></i>
          </a>
          <a href="#" className="social-link">
            <i className="icon twitter-icon"></i>
          </a>
        </div>
        <p className="copyright">© 2025 PizzaLand. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
