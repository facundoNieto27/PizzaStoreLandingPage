import React from "react";

function ContactInfo() {
  return (
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
  );
}
export default ContactInfo;
