import React, { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import { TypeAnimation } from "react-type-animation";
import api from "../services/api";
import "../assets/css/styles.css";


function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      const { data } = await api.get("/portfolio");
      setPortfolio(data);
    } catch (err) {
      console.log("Backend sleeping... retrying in 3 seconds",err);
      setTimeout(fetchPortfolio, 3000);
    }
  };

  fetchPortfolio();
}, []);

    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1500,
      delay: 200,
      reset: false,
    });

    sr.reveal(
      ".home__data, .about__img, .skills__subtitle, .skills__text",
      {}
    );
    sr.reveal(
      ".home__img, .about__subtitle, .about__text, .skills__img",
      { delay: 400 }
    );
    sr.reveal(".home__social-icon", { interval: 200 });
  

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  if (!portfolio) return null;

  return (
    <>
      <main className="l-main">

        {/* HOME */}
        <section className="home bd-grid" id="home">
          <div className="home__data">
            <h1 className="home__title">
              Hi,<br />
              I'am{" "}
              <span className="home__title-color">
                {portfolio.heroTitle || "Abbu Bhakar Siddik"}
              </span>
              <br />
              <TypeAnimation
  sequence={[
    "Java Full Stack Developer",
    2000,
    "MERN Stack Engineer",
    2000,
    "AI Product Builder",
    2000,
  ]}
  speed={50}
  repeat={Infinity}
/>
            </h1>

            <a
              href="/projects"
              className="button"
              rel="noreferrer"
            >
              View Project
            </a>
             <a
              href="/certificates"
              className="button"
              style={{ marginLeft: "1rem" }}
              rel="noreferrer"
            >
              View Certificates
            </a>

            <div style={{ marginTop: "1rem" }}>
              {portfolio.resumeFile && (
                <a
                  href={`${baseURL}${portfolio.resumeFile}`}
                  className="button"
                  target="_blank"
                  rel="noreferrer"
                  download
                  style={{ marginRight: "1rem" }}
                >
                  View Resume
                </a>
              )}

              {portfolio.cvFile && (
                <a
                  href={`${baseURL}${portfolio.cvFile}`}
                  className="button"
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  View CV
                </a>
              )}
            </div>
          </div>
          <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'></link>

          <div className="home__social">
            {portfolio.linkedin && (
              <a
                href={portfolio.linkedin}
                className="home__social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bxl-linkedin"></i>
              </a>
            )}

            {portfolio.github && (
              <a
                href={portfolio.github}
                className="home__social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bxl-github"></i>
              </a>
            )}
          </div>

          <div class="home__img">
                    <svg class="home__blob" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <mask id="mask0" mask-type="alpha">
                            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                            {portfolio.profileImage && (
                  <image
                    className="home__blob-img"
                    x="50"
                    y="60"
                    
                    href={`${baseURL}${portfolio.profileImage}`}
                  />
                )}
                        </g>
                    </svg>
                </div>
        </section>
       

        {/* ABOUT */}
        <section className="about section" id="about">
          <h2 className="section-title">About</h2>

          <div className="about__container bd-grid">
            <div className="about__img">
              {portfolio.aboutImage && (
                <img
                  src={`${baseURL}${portfolio.aboutImage}`}
                  alt="about"
                />
              )}
            </div>

            <div>
              <h2 className="about__subtitle">
                I'am {portfolio.heroTitle}
              </h2>

              <p class="about__text">"I’m a builder-mindset developer with a strong focus on creating practical, real-world web applications. 
                          I enjoy working quietly and deeply on problems, breaking them down into clean, efficient solutions. Currently, 
                          I’m strengthening my full-stack JavaScript 
                          skills and preparing to expand into software and mobile application development."</p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="skills section" id="skills">
          <h2 className="section-title">Skills</h2>

          <div class="skills__container bd-grid">          
                    <div>
                        <h2 class="skills__subtitle">Professional Skills</h2>
                        <p class="skills__text">Experienced in developing responsive and scalable web applications
                            using modern full-stack technologies, with a strong focus on clean UI,
                              performance, and problem-solving.</p>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxl-react skills__icon'></i>
                                <span class="skills__name">React</span>
                            </div>
                            <div class="skills__bar skills__html">

                            </div>
                            <div>
                                <span class="skills__percentage">80%</span>
                            </div>
                        </div>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxl-javascript skills__icon'></i>
                                <span class="skills__name">JavaScript</span>
                            </div>
                            <div class="skills__bar skills__css">
                                
                            </div>
                            <div>
                                <span class="skills__percentage">70%</span>
                            </div>
                        </div>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxl-nodejs skills__icon' ></i>
                                <span class="skills__name">NodeJS/Express</span>
                            </div>
                            <div class="skills__bar skills__js">
                                
                            </div>
                            <div>
                                <span class="skills__percentage">60%</span>
                            </div>
                        </div>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bx-brain skills__icon'></i>
                                <span class="skills__name">Promt Engineering</span>
                            </div>
                            <div class="skills__bar skills__ux">
                                
                            </div>
                            <div>
                                <span class="skills__percentage">85%</span>
                            </div>
                        </div>
                    </div>

            <div>
              {portfolio.skillsImage && (
                <img
                  src={`${baseURL}${portfolio.skillsImage}`}
                  alt="skills"
                  className="skills__img"
                />
              )}
            </div>
          </div>
        </section>
        <section className="projects section" id="projects">
  <h2 className="section-title">Projects</h2>

  <div class="projects__container bd-grid">

        <div class="project__card">
            <h3>NextPath AI</h3>
            <p>
                A student-focused full-stack platform providing useful
                academic and tech tools including resume analysis,
                career assistance, and developer resources.
            </p>
            <span class="project__tech">
                React • Node.js • MongoDB
            </span>
        </div>

        <div class="project__card">
            <h3>Developer Portfolio Platform</h3>
            <p>
                A college exhibition project built to help students
                showcase their skills and market themselves as developers.
                Awarded 2nd Prize in project exhibition.
            </p>
            <span class="project__tech">
                React • Web Technologies
            </span>
        </div>

    </div>
</section>



<section class="experience section" id="experience">
    <h2 class="section-title">Experience</h2>

    <div class="experience__container bd-grid">

        <div class="experience__card">
            <h3>NextPath AI — Full Stack Developer</h3>
            <span>2025 – Present</span>
            <p>
                Built and deployed a full-stack platform providing
                academic and developer tools for students using MERN stack.
            </p>
        </div>

        <div class="experience__card">
            <h3>Developer Portfolio Project</h3>
            <span>College Project Exhibition</span>
            <p>
                Developed a developer portfolio platform and secured
                2nd prize in project exhibition.
            </p>
        </div>

    </div>
</section>


<section class="education section" id="education">
    <h2 class="section-title">Education</h2>

    <div class="education__container bd-grid">
        <div class="education__card">
            <h3>Diploma in Computer Science</h3>
            <span>H.M.S Polytechnic, Tumkur</span>
            <p>2021 – 2024</p>
            <p>
                Completed diploma with a focus on software development,
                data structures, and web technologies.
            </p>
        </div>
        <div class="education__card">
            <h3>Bachelor of Engineering in Computer Science</h3>
            <span>Shridevi Institute of Engineering and Technology</span>
            <p>2024 – Present</p>
            <p>
                Currently pursuing Computer Science Engineering with
                focus on full-stack development and real-world project building.
            </p>
        </div>

    </div>
</section>
<section class="contact section" id="contact">
    <h2 class="section-title">Contact</h2>

    <div class="contact__container bd-grid">

        <div class="contact__card">
            <h3>Let’s Connect</h3>
            <p>
                I’m open to internship opportunities, collaborations,
                and exciting development projects.
            </p>

            <p class="contact__email">
                📧 abuakyt@gmail.com
            </p>

            <a href="mailto:abuakyt@gmail.com" class="button">
                Send Email
            </a>
        </div>

    </div>
</section>

      </main>
      <footer class="footer">
    <div class="footer__container bd-grid">

        <div>
            <h2 class="footer__title">Abbu Bhakar Siddik</h2>
            <p class="footer__subtitle">
                Java Full Stack Developer
            </p>
        </div>

        <div class="footer__social">
            <a href="https://linkedin.com" target="_blank">
                <i class='bx bxl-linkedin'></i>
            </a>
            <a href="https://github.com" target="_blank">
                <i class='bx bxl-github'></i>
            </a>
            <a href="mailto:abuakyt@gmail.com">
                <i class='bx bx-envelope'></i>
            </a>
        </div>

    </div>

    <p class="footer__copy">
        © 2026 Abbu Bhakar Siddik . All rights reserved
    </p>
</footer>
 <script src="https://unpkg.com/scrollreveal"></script>

        
        <script src="assets/js/main.js"></script>
    </>
  );
}

export default Home;