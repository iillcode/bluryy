import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About - ImageBlur Pro",
  description: "Learn about ImageBlur Pro, the advanced image blur tool built with modern web technologies.",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About ImageBlur Pro</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              ImageBlur Pro is a professional image editing tool designed to make advanced blurring effects accessible to everyone. 
              Built with modern web technologies, our tool provides powerful features while maintaining simplicity and ease of use.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Next.js 15 with App Router</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• HTML5 Canvas for image processing</li>
                  <li>• Real-time blur effects</li>
                  <li>• Undo/Redo functionality</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose ImageBlur Pro?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-semibold text-gray-800 mb-2">Fast & Efficient</h3>
                <p className="text-gray-600 text-sm">Optimized performance for quick image processing</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-gray-800 mb-2">Creative Control</h3>
                <p className="text-gray-600 text-sm">Multiple blur modes and color options</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💻</div>
                <h3 className="font-semibold text-gray-800 mb-2">Web-Based</h3>
                <p className="text-gray-600 text-sm">No installation required, works in any browser</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}