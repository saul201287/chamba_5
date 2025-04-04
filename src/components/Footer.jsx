import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="links-container">
          <div className="github-links">
            <h3>GitHub</h3>
            <a
              href="https://github.com/ChrisOzuna10"
              target="_blank"
              rel="noopener noreferrer">
              <p>ChrisOzuna10</p>
              <FaGithub className="icon" />
            </a>
            <a
              href="https://github.com/lyzsolar"
              target="_blank"
              rel="noopener noreferrer">
              <p>lyzsolar</p>
              <FaGithub className="icon" />
            </a>
          </div>
          <div className="email-links">
            <h3>Correos</h3>
            <a href="mailto:233384@ids.upchiapas.edu.mx">
              <p>233384@ids.upchiapas.edu.mx</p>
              <FaEnvelope className="icon" />
            </a>
            <a href="mailto:233432@ids.upchiapas.edu.mx">
              <p>233432@ids.upchiapas.edu.mx</p>
              <FaEnvelope className="icon" />
            </a>
          </div>
        </div>
        <p>© 2025 Sistema Automatizado de Pollos - By PiWeb Solutions</p>
      </div>
    </footer>
  );
};

export default Footer;
