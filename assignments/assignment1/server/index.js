import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());

const educationData = [
  { degree: 'Advanced Diploma in Computer Programming and Analysis', institution: 'Humber College', year: '2020' },
  { degree: 'Bachelor of Computer Science', institution: 'York University', year: '2022' },
];

const experienceData = [
  { 
    title: 'Web Developer', 
    company: 'Innovatech Solutions', 
    duration: '2021 – Present', 
    responsibilities: [
      'Built and improved interactive web apps using React and Node.js.',
      'Worked closely with designers and product teams to deliver user-friendly features.',
      'Actively engaged in peer code reviews, improving overall code quality.'
    ]
  },
  { 
    title: 'Mobile App Intern', 
    company: 'LaunchPad Startups', 
    duration: '2020 – 2021', 
    responsibilities: [
      'Helped develop and test cross-platform mobile apps using React Native.',
      'Identified bugs and improved app stability through extensive debugging.',
      'Supported documentation efforts for ongoing projects.'
    ]
  },
];

const overviewData = 'Abby Smith is an enthusiastic developer with a keen interest in creating dynamic web and mobile experiences. With a solid foundation in computer science and practical expertise in modern web technologies, she thrives when collaborating on projects that push creative boundaries.';

const skillsData = [
  'JavaScript', 
  'React', 
  'Node.js', 
  'Express', 
  'HTML & CSS', 
  'Version Control (Git)', 
  'Agile Practices'
];

app.get('/getEdu', (req, res) => {
  res.json(educationData);
});

app.get('/getExp', (req, res) => {
  res.json(experienceData);
});

app.get('/getOverview', (req, res) => {
  res.json(overviewData);
});

app.get('/getSkills', (req, res) => {
  res.json(skillsData);
});

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});