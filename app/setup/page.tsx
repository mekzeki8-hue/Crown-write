'use client';

import { useState } from 'react';

/**
 * Database Setup Page
 * Visit /setup to create database tables with one click
 */
export default function SetupPage() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const setupDatabase = async () => {
    setLoading(true);
    setStatus('Creating database tables...');

    try {
      const response = await fetch('/api/setup-database', {
        method: 'POST',
      });

      const result = await response.json();

      if (result.success) {
        setStatus('✅ Database setup complete! You can now use CrownWrite.');
      } else {
        setStatus(`❌ Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 CrownWrite Database Setup
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Click the button below to automatically create all database tables for CrownWrite.
          This only needs to be done once.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            What will be created:
          </h3>
          <ul className="list-disc list-inside text-blue-800 dark:text-blue-400 space-y-1">
            <li>Profiles table (stores user data and credits)</li>
            <li>Credit transactions table (tracks credit usage)</li>
            <li>Humanization history table (saves all humanizations)</li>
            <li>Automatic 300 free credits for new users</li>
          </ul>
        </div>

        <button
          onClick={setupDatabase}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Setting up...' : 'Setup Database Now'}
        </button>

        {status && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {status}
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <strong>Note:</strong> If automatic setup fails, you can create tables manually in your{' '}
          <a
            href="https://supabase.com/dashboard/project/jvisxehsimzstelrkhre/editor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Supabase dashboard
          </a>
          .
        </div>
      </div>
    </div>
  );
}
