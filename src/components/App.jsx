import React, { useState, useEffect } from "react";
import margheritaImg from "../images/margherita.jpeg";
import pepperoniImg from "../images/pepperoni-caroussell.jpeg";
import chickenImg from "../images/chicken.avif";
import veggieImg from "../images/veggie.jpg";
import hawaiianImg from "../images/hawaiian.jpg";
import meatLoversImg from "../images/meat-lovers.jpg";
import Carousel from "./Carousel";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

function App() {
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

        <Carousel pizzas={pizzas} />

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

          <ContactInfo />

          <ContactForm pizzas={pizzas} />
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
