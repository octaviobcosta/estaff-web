import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { spacing } from '../../lib/design-system/tokens/spacing'

const SpacingShowcase = () => {
  const renderSpacingScale = () => {
    const spacingEntries = Object.entries(spacing)
      .filter(([key]) => !isNaN(Number(key)))
      .sort((a, b) => Number(a[0]) - Number(b[0]))

    return (
      <div className="space-y-4">
        {spacingEntries.map(([key, value]) => {
          const pixelValue = parseFloat(value) * 16 // Convert rem to pixels (assuming 16px base)
          return (
            <div key={key} className="flex items-center gap-4">
              <div className="w-12 text-right">
                <span className="text-sm font-mono text-gray-600">{key}</span>
              </div>
              <div className="w-20 text-right">
                <span className="text-xs font-mono text-gray-400">{value}</span>
              </div>
              <div className="w-20 text-right">
                <span className="text-xs font-mono text-gray-400">{pixelValue}px</span>
              </div>
              <div className="flex-1">
                <div 
                  className="bg-freela-500 rounded"
                  style={{ 
                    width: value,
                    height: '24px',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderSpacingExamples = () => {
    const examples = [
      { name: 'Extra Small', spacing: spacing[2], description: 'Tight spacing for compact UI elements' },
      { name: 'Small', spacing: spacing[4], description: 'Default spacing for buttons and inputs' },
      { name: 'Medium', spacing: spacing[8], description: 'Standard spacing between sections' },
      { name: 'Large', spacing: spacing[16], description: 'Major section separation' },
      { name: 'Extra Large', spacing: spacing[32], description: 'Page-level spacing' },
    ]

    return (
      <div className="space-y-8">
        {examples.map((example) => (
          <div key={example.name}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{example.name}</h4>
            <p className="text-xs text-gray-500 mb-4">{example.description}</p>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4" style={{ gap: example.spacing }}>
                <div className="bg-white rounded p-4 shadow-sm">
                  <div className="h-8 bg-gray-200 rounded" />
                </div>
                <div className="bg-white rounded p-4 shadow-sm">
                  <div className="h-8 bg-gray-200 rounded" />
                </div>
                <div className="bg-white rounded p-4 shadow-sm">
                  <div className="h-8 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs font-mono text-gray-400">gap: {example.spacing}</div>
          </div>
        ))}
      </div>
    )
  }

  const renderPaddingExamples = () => {
    const paddingExamples = [
      { name: 'Button', padding: `${spacing[3]} ${spacing[6]}`, demo: 'Click Me' },
      { name: 'Card', padding: spacing[6], demo: 'Card Content' },
      { name: 'Modal', padding: spacing[8], demo: 'Modal Content' },
      { name: 'Page', padding: spacing[10], demo: 'Page Content' },
    ]

    return (
      <div className="grid grid-cols-2 gap-6">
        {paddingExamples.map((example) => (
          <div key={example.name} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">{example.name}</h4>
            <div className="bg-gray-100 rounded-lg p-2">
              <div 
                className="bg-white rounded shadow-sm flex items-center justify-center"
                style={{ padding: example.padding }}
              >
                <span className="text-gray-600">{example.demo}</span>
              </div>
            </div>
            <div className="text-xs font-mono text-gray-400">padding: {example.padding}</div>
          </div>
        ))}
      </div>
    )
  }

  const renderMarginExamples = () => {
    return (
      <div className="space-y-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="bg-white rounded p-4 shadow-sm" style={{ marginBottom: spacing[4] }}>
            <div className="text-sm text-gray-600">Component with bottom margin</div>
          </div>
          <div className="bg-white rounded p-4 shadow-sm" style={{ marginBottom: spacing[4] }}>
            <div className="text-sm text-gray-600">Component with bottom margin</div>
          </div>
          <div className="bg-white rounded p-4 shadow-sm">
            <div className="text-sm text-gray-600">Last component (no margin)</div>
          </div>
        </div>
        <div className="text-xs font-mono text-gray-400">margin-bottom: {spacing[4]}</div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Spacing System</h1>
        <p className="text-lg text-gray-600 mb-2">
          A comprehensive spacing scale based on a 4px grid system.
        </p>
        <p className="text-base text-gray-500">
          Consistent spacing creates visual rhythm and improves readability across the interface.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Spacing Scale</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4 flex items-center gap-4 text-xs font-mono text-gray-500">
              <div className="w-12 text-right">Scale</div>
              <div className="w-20 text-right">REM</div>
              <div className="w-20 text-right">Pixels</div>
              <div className="flex-1">Visual Reference</div>
            </div>
            {renderSpacingScale()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Gap Examples</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {renderSpacingExamples()}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Padding Examples</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {renderPaddingExamples()}
            </div>
            
            <h2 className="text-2xl font-bold mb-6 mt-8">Margin Examples</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {renderMarginExamples()}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Layout Spacing</h4>
            <ul className="space-y-1">
              <li>• Use 4px grid system</li>
              <li>• Apply consistent gaps</li>
              <li>• Group related elements</li>
              <li>• Create visual hierarchy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Component Spacing</h4>
            <ul className="space-y-1">
              <li>• Padding: Internal spacing</li>
              <li>• Margin: External spacing</li>
              <li>• Gap: Grid/flex spacing</li>
              <li>• Consistent throughout</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Responsive Spacing</h4>
            <ul className="space-y-1">
              <li>• Scale with breakpoints</li>
              <li>• Maintain proportions</li>
              <li>• Test on all devices</li>
              <li>• Use relative units</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Design System/Spacing',
  component: SpacingShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive spacing system based on a 4px grid for consistent layouts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacingShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Spacing Scale',
}