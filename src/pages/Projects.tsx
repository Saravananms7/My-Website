import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Project } from '../lib/supabase';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const getPlatformBadge = (platform: Project['platform']) => {
    const badges = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      android: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      ios: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      desktop: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };

    return badges[platform] || badges.web;
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-16">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Here are some of the projects I've worked on. Each project represents a unique
          challenge and learning experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getPlatformBadge(
                    project.platform
                  )}`}
                >
                  {project.platform}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  GitHub
                </a>
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                  >
                    Live Demo
                  </a>
                )}
                {project.apk_url && (
                  <a
                    href={project.apk_url}
                    download
                    className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                  >
                    <CloudArrowDownIcon className="h-5 w-5" />
                    Download APK
                    {project.apk_version && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        (v{project.apk_version})
                      </span>
                    )}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 