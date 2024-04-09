import React from "react";

const About = () => {
  return (
    <div className="container-fluid about-page">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-6 py-2">Welcome to Note Maker</h1>
            <p className="lead text-muted">
              Create, edit, and organize your notes with ease.
            </p>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <h2 className="mb-3">Key Features</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Intuitive note creation and editing with rich text formatting
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Secure storage of notes across devices with authentication
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Technology Stack</h2>
            <p className="text-muted">
              Built with React for the frontend, Node.js and MongoDB for the backend, and Tiptap for rich text editing capabilities.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-4">About Me</h2>
            <p className="text-muted">
              I'm Sai Mani Kumar Devathi, I'm passionate about building useful applications that enhance productivity and creativity.
            </p>
            <p className="text-muted">
              If you have any feedback, suggestions, or questions about Note Maker, feel free to reach out!
            </p>
          </div>
          <div className="col-md-6 text-muted">
            <p>
              This is my GitHub repository:&nbsp;&nbsp;
              <a
                href="https://github.com/saimanikumar/Note-Maker"
                target="_blank"
              >
                <i className="bi bi-github" />
              </a>
              &nbsp;&nbsp;&nbsp; This is my documentation link:&nbsp;&nbsp;
              <a
                href="https://docs.google.com/document/d/1300Gb7Z8vm4Asb0l2Z6AE0GAfzCWOW6w/edit?usp=sharing&ouid=103984165654683084270&rtpof=true&sd=true"
                target="_blank"
              >
                <i className="bi bi-book" />
              </a>
            </p>
          </div>
          <div className="col-md-12 d-flex justify-content-center py-3">
            <a
              href="https://www.linkedin.com/in/sai-mani-kumar-devathi/"
              target="_blank"
              className="me-3"
            >
              <i className="bi bi-linkedin text-muted fs-4"></i>
            </a>
            <a
              href="https://github.com/saimanikumar"
              target="_blank"
              className="me-3"
            >
              <i className="bi bi-github text-muted fs-4"></i>
            </a>
            <a
              href="mailto:saimanikumar67@gmail.com"
              target="_blank"
              className="me-3"
            >
              <i className="bi bi-envelope text-muted fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
