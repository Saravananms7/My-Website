import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Firebase'],
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'React Native', 'iOS', 'Android'],
  },
  {
    category: 'Other',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile'],
  },
];

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Company',
    period: '2021 - Present',
    description: 'Led development of multiple full-stack applications using React, Node.js, and AWS.',
  },
  {
    title: 'Software Engineer',
    company: 'Startup',
    period: '2019 - 2021',
    description: 'Developed and maintained mobile applications using Flutter and React Native.',
  },
  {
    title: 'Junior Developer',
    company: 'Agency',
    period: '2017 - 2019',
    description: 'Built responsive websites and web applications for various clients.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="container py-16">
      {/* About section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Hello! I'm Saravanan, a passionate Flutter & React Developer with a keen interest in AI, ML, 
        and Cloud Computing. I enjoy building innovative digital solutions that solve real-world problems.
        <br></br>
        <br></br>
        What I Do
        <br></br>
        🔹 App Development – Experienced in developing cross-platform apps using Flutter.
        <br></br>
        🔹 Web Development – Skilled in React, Supabase, and Django, creating dynamic web applications.
        <br></br>
        🔹 AI & ML Enthusiast – Worked on IBM SkillsBuild projects, including AI-powered water quality assessment.
        <br></br>
        🔹 Cloud Certified – Proficient in cloud technologies and backend solutions.
        <br></br>
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          When I'm not coding, you can find me exploring new technologies, contributing
          to open-source projects, or writing technical blog posts about my experiences.
        </p>
      </motion.div>

      {/* Skills section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
      >
        {skills.map((skillGroup) => (
          <motion.div
            key={skillGroup.category}
            variants={item}
            className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {skillGroup.category}
            </h3>
            <ul className="space-y-2">
              {skillGroup.items.map((skill) => (
                <li
                  key={skill}
                  className="text-gray-600 dark:text-gray-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Experience section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.title}
              variants={item}
              className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {exp.title}
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                {exp.company} • {exp.period}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 