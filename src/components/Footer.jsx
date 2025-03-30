import React from "react";
import githubIcon from "../icons/github.png";
import email from "../icons/email_15579150.gif";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="links-container">
          <div className="github-links">
            <h3>GitHub</h3>
            <a
              href="https://github.com/saul201287"
              target="_blank"
              rel="noopener noreferrer">
              <p>ExampleCuenta</p>
              <img src={githubIcon} alt="GitHub Saul" className="icon" />
            </a>
            <a
              href="https://github.com/saul201287"
              target="_blank"
              rel="noopener noreferrer">
              <p>ExampleCuenta</p>
              <img src={githubIcon} alt="GitHub Saul" className="icon" />
            </a>
          </div>
          <div className="email-links">
            <h3>Contacto</h3>
            <a href="mailto:example@example.com">
              <p>ExampleCuenta</p>
              <img src={email} alt="Email" className="icon" />
            </a>
            <a href="mailto:example@example.com">
              <p>ExampleCuenta</p>
              <img src={email} alt="Email" className="icon" />
            </a>
          </div>
        </div>
        <p>© 2025 Sistema Automatizado de Pollos - By PiWeb Solutions</p>
      </div>
    </footer>
  );
};

export default Footer;
