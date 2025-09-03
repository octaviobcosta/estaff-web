import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { typography } from '../../lib/design-system/tokens/typography'

const TypographyShowcase = () => {
  const renderTypographyScale = () => {
    const sizes = Object.entries(typography.sizes).reverse()
    
    return (
      <div className="space-y-6">
        {sizes.map(([name, value]) => (
          <div key={name} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-sm font-mono text-gray-500 w-16">{name}</span>
              <span className="text-xs font-mono text-gray-400">{value}</span>
            </div>
            <p style={{ fontSize: value }} className="leading-normal">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </div>
    )
  }

  const renderFontWeights = () => {
    return (
      <div className="space-y-4">
        {Object.entries(typography.weights).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-500 w-24">{name}</span>
            <span className="text-xs font-mono text-gray-400 w-16">{value}</span>
            <p style={{ fontWeight: value }} className="text-lg flex-1">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </div>
    )
  }

  const renderLineHeights = () => {
    return (
      <div className="space-y-6">
        {Object.entries(typography.lineHeights).map(([name, value]) => (
          <div key={name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-sm font-mono text-gray-500">{name}</span>
              <span className="text-xs font-mono text-gray-400">{value}</span>
            </div>
            <p style={{ lineHeight: value }} className="text-base bg-gray-50 p-2 rounded">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris.
            </p>
          </div>
        ))}
      </div>
    )
  }

  const renderLetterSpacing = () => {
    return (
      <div className="space-y-4">
        {Object.entries(typography.letterSpacing).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-500 w-24">{name}</span>
            <span className="text-xs font-mono text-gray-400 w-20">{value}</span>
            <p style={{ letterSpacing: value }} className="text-lg flex-1">
              THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
            </p>
          </div>
        ))}
      </div>
    )
  }

  const renderHeadings = () => {
    const headingStyles = {
      h1: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, lineHeight: typography.lineHeights.tight },
      h2: { fontSize: typography.sizes['3xl'], fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.tight },
      h3: { fontSize: typography.sizes['2xl'], fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.snug },
      h4: { fontSize: typography.sizes.xl, fontWeight: typography.weights.medium, lineHeight: typography.lineHeights.snug },
      h5: { fontSize: typography.sizes.lg, fontWeight: typography.weights.medium, lineHeight: typography.lineHeights.normal },
      h6: { fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.normal },
    }

    return (
      <div className="space-y-6">
        {Object.entries(headingStyles).map(([tag, style]) => (
          <div key={tag} className="space-y-2">
            <div className="text-xs font-mono text-gray-500 uppercase">{tag}</div>
            <div style={style}>
              Heading {tag.toUpperCase()} - Design System Typography
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Typography System</h1>
        <p className="text-lg text-gray-600 mb-2">
          Font family: <span className="font-mono">DM Sans</span>
        </p>
        <p className="text-base text-gray-500">
          A comprehensive type system with consistent scales for sizes, weights, line heights, and letter spacing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Type Scale</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderTypographyScale()}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Heading Styles</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderHeadings()}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Font Weights</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderFontWeights()}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Letter Spacing</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderLetterSpacing()}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Line Heights</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderLineHeights()}
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
            <ul className="space-y-1">
              <li>• Use the type scale consistently across the application</li>
              <li>• Maintain hierarchy with size and weight combinations</li>
              <li>• Apply tighter line heights for headings</li>
              <li>• Use letter spacing for uppercase text</li>
              <li>• Ensure minimum 16px for body text on mobile</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Accessibility</h4>
            <ul className="space-y-1">
              <li>• Maintain WCAG contrast ratios</li>
              <li>• Use relative units (rem) for scalability</li>
              <li>• Support user font size preferences</li>
              <li>• Avoid text smaller than 14px</li>
              <li>• Test with screen readers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Design System/Typography',
  component: TypographyShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Typography system with DM Sans font family, including type scale, weights, line heights, and letter spacing.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Typography Scale',
}