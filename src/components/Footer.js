import React from "react";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="container">
        <footer className="text-center text-white">
          <div className="container p-4 pb-0">
            <section className="mb-4">
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#0082ca" }}
                href="https://www.linkedin.com/in/khizer-hayat-462a47251/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#333333" }}
                href="https://github.com/khizer-hayat-fed"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </section>
          </div>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:
            <a
              className="text-white mx-2"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/khizer-hayat-462a47251/"
            >
              Khizer Hayat
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
