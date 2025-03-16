import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from('projects').select('count');
        if (error) throw error;
        setStatus('connected');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect to Supabase');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            status === 'checking'
              ? 'bg-yellow-500'
              : status === 'connected'
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Supabase: {status}
        </span>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
} 