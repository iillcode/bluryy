"use client";

export default function PrivacyPolicy() {
  return (
    <div className="pt-6 pb-12">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              ImageBlur Pro ("we," "our," or "us") respects your privacy and is
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you use our image blurring web application ("Service").
            </p>
            <p>
              By using our Service, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with this policy, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-medium mb-2">
              2.1 Information You Provide
            </h3>
            <p className="mb-4">
              We do not require you to create an account or provide personal
              information to use our basic image blurring service. However, if
              you choose to contact us via email or other communication methods,
              we may collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your name and email address</li>
              <li>Any information you voluntarily provide in communications</li>
            </ul>

            <h3 className="text-lg font-medium mb-2">
              2.2 Information Automatically Collected
            </h3>
            <p className="mb-4">
              When you use our Service, we may automatically collect certain
              technical information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our Service</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              4. Data Storage and Security
            </h2>
            <p className="mb-4">
              All image processing in our Service occurs locally in your
              browser. This means:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your images are never uploaded to our servers</li>
              <li>No image data is stored by us</li>
              <li>All processing happens on your device</li>
            </ul>
            <p>
              We implement appropriate security measures to protect against
              unauthorized access, alteration, disclosure, or destruction of any
              limited information we may collect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              We use Google AdSense on our website, which may use cookies and
              similar tracking technologies to serve relevant advertisements.
              These third-party vendors may:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use first-party cookies and third-party cookies together</li>
              <li>
                Collect information about your visits to our site and other
                websites
              </li>
              <li>
                Use this information to provide advertisements about goods and
                services
              </li>
            </ul>
            <p>
              You can opt out of personalized advertising by visiting
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google's Ad Settings
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              6. Third-Party Services
            </h2>
            <p className="mb-4">
              Our Service may contain links to third-party websites or services
              that are not operated by us. We have no control over and assume no
              responsibility for the content, privacy policies, or practices of
              any third-party sites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              7. Children's Privacy
            </h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from
              children under 13. If you are a parent or guardian and you are
              aware that your child has provided us with personal information,
              please contact us so we can take necessary actions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
              <a
                href="mailto:privacy@imageblurpro.com"
                className="text-blue-600 hover:underline"
              >
                {" "}
                privacy@imageblurpro.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
