"use client";

export default function TermsOfService() {
  return (
    <div className="pt-6 pb-12">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-sm text-gray-500 mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to ImageBlur Pro ("Service"). By accessing or using our
              website and services, you agree to be bound by these Terms of
              Service ("Terms") and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p>
              ImageBlur Pro provides an online image editing tool that allows
              users to blur portions of digital images. All processing occurs
              locally in your browser - no images are uploaded to our servers.
              The Service is provided free of charge for personal and commercial
              use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              3. Intellectual Property Rights
            </h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality
              are owned by ImageBlur Pro and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property or proprietary rights laws.
            </p>
            <p>
              You retain all rights to your images. We do not claim any
              ownership rights to images processed through our Service since all
              processing occurs locally in your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              4. User Responsibilities
            </h2>
            <p className="mb-4">By using our Service, you agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Service for any illegal purposes</li>
              <li>
                Infringe upon or violate our intellectual property rights or
                those of others
              </li>
              <li>
                Transmit any material that contains viruses or other harmful
                components
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or networks
              </li>
              <li>
                Interfere with or disrupt the Service or servers connected to
                the Service
              </li>
            </ul>
            <p>
              You are solely responsible for ensuring that your use of the
              Service complies with applicable laws and does not infringe upon
              the rights of any third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Advertisements</h2>
            <p className="mb-4">
              We use Google AdSense to display advertisements on our website.
              These advertisements are subject to Google's AdSense policies and
              may be targeted based on content or user interests.
            </p>
            <p>
              By using our Service, you acknowledge and agree that you may be
              exposed to advertisements and that we are not responsible for the
              content or accuracy of any advertisements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided on an "as is" and "as available" basis.
              ImageBlur Pro makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              In no event shall ImageBlur Pro, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless ImageBlur Pro
              and its licensee and licensors, and their employees, contractors,
              agents, officers and directors, from and against any and all
              claims, damages, obligations, losses, liabilities, costs or debt,
              and expenses arising from: your use and access of the Service, or
              your violation of any term of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately,
              without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of India, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <a
                href="mailto:terms@imageblurpro.com"
                className="text-blue-600 hover:underline"
              >
                {" "}
                terms@imageblurpro.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
