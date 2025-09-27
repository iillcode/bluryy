import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Features - ImageBlur Pro",
  description: "Discover all the powerful features of ImageBlur Pro including normal blur, line blur, color options, and more.",
}

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Features</h1>
          
          <div className="grid gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🖌️ Normal Blur Mode</h2>
              <p className="text-gray-600">Apply circular blur effects with our intuitive brush tool. Perfect for general image editing and artistic blurring.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">📏 Line Blur Mode</h2>
              <p className="text-gray-600">Create precise straight line blurs. Ideal for text blurring, geometric shapes, and technical image editing.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎨 Color Options</h2>
              <p className="text-gray-600">Choose from Normal, White, Black, Red, Green, and Yellow blur tints to create stunning visual effects.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚙️ Adjustable Settings</h2>
              <p className="text-gray-600">Fine-tune your blur effects with adjustable brush size (5-100px) and blur intensity (0-100%).</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">↩️ Undo/Redo</h2>
              <p className="text-gray-600">Full undo/redo functionality with keyboard shortcuts (Ctrl+Z/Ctrl+Y) for perfect editing control.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">💾 Easy Export</h2>
              <p className="text-gray-600">Download your edited images in high-quality PNG format with a single click.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}