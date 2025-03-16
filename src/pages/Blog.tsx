import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type BlogPost } from '../lib/supabase';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Thoughts, tutorials, and insights about software development,
          technology, and my journey as a developer.
        </p>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500 dark:text-gray-400 mb-4 block">
                    {new Date(post.published_at).toLocaleDateString()}
                  </time>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </motion.article>
            ))}
            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 