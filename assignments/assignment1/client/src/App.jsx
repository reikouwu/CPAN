import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [overview, setOverview] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setData) => {
      try {
        const response = await fetch(`http://localhost:8000/${endpoint}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData('getEdu', setEducation);
    fetchData('getExp', setExperience);
    fetchData('getOverview', setOverview);
    fetchData('getSkills', setSkills);
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Abby Smith's Resume</h1>
      </header>

      <div className="resume-container">
        <section className="overview-section">
          <h2>Overview</h2>
          <p>{overview}</p>
        </section>

        <section className="education-section">
          <h2>Education</h2>
          {education.map((edu, idx) => (
            <div className="education-item" key={idx}>
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <p>{edu.year}</p>
            </div>
          ))}
        </section>

        <section className="experience-section">
          <h2>Experience</h2>
          {experience.map((exp, idx) => (
            <div className="experience-item" key={idx}>
              <h3>{exp.title}</h3>
              <p><strong>{exp.company}</strong></p>
              <p>{exp.duration}</p>
              <ul>
                {exp.responsibilities.map((resp, subIdx) => (
                  <li key={subIdx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="skills-section">
          <h2>Skills</h2>
          <ul>
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default App;