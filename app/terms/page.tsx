export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            By accessing and using CrownWrite, you accept and agree to be bound by the terms
            and conditions of this agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            2. Use of Service
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            CrownWrite provides AI-powered text humanization services. You agree to use the
            service only for lawful purposes and in accordance with these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            3. Credits System
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our service operates on a credit system where 1 word = 1 credit. New users receive
            300 free credits upon signup. Additional credits can be purchased as needed.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            4. Intellectual Property
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You retain all rights to the content you submit. CrownWrite retains all rights
            to the service and its underlying technology.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            CrownWrite is provided "as is" without warranties of any kind. We are not liable
            for any damages arising from your use of the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            6. Contact
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            For questions about these Terms, contact us at: 
            <a href="mailto:merriaa75@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              merriaa75@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
