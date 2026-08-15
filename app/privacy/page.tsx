export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We collect information you provide directly to us when you create an account, 
            including your email address and Google profile information (if you sign in with Google).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use the information we collect to provide, maintain, and improve our AI humanization service,
            process your text humanization requests, and manage your credit balance.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            3. Data Security
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use industry-standard security measures to protect your data. Your text submissions
            are processed securely and not shared with third parties.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            4. Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            If you have questions about this Privacy Policy, please contact us at: 
            <a href="mailto:merriaa75@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              merriaa75@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
