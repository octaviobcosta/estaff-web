import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { colors } from '../../lib/design-system/tokens/colors'

const ColorPalette = () => {
  const renderColorScale = (name: string, scale: Record<string, string>) => {
    // Sort shades numerically
    const sortedShades = Object.entries(scale).sort((a, b) => {
      const aNum = parseInt(a[0]) || 0
      const bNum = parseInt(b[0]) || 0
      return aNum - bNum
    })

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 capitalize">{name}</h3>
        <div className="grid grid-cols-6 gap-2">
          {sortedShades.map(([shade, value]) => (
            <div key={shade} className="space-y-2">
              <div
                className="h-20 rounded-lg shadow-sm border border-gray-200"
                style={{ backgroundColor: value }}
                title={`${name}-${shade}: ${value}`}
              />
              <div className="text-xs text-center space-y-1">
                <div className="font-medium">{shade}</div>
                <div className="text-gray-500 font-mono text-[10px]">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSemanticColors = () => {
    const semanticGroups = {
      'Primary Actions': {
        'Primary': colors.primary,
        'Primary Hover': colors.primaryHover,
        'Primary Active': colors.primaryActive,
      },
      'Secondary Actions': {
        'Secondary': colors.secondary,
        'Secondary Hover': colors.secondaryHover,
        'Secondary Active': colors.secondaryActive,
      },
      'Status Colors': {
        'Success': colors.success,
        'Warning': colors.warning,
        'Error': colors.error,
        'Info': colors.info,
      },
      'UI Elements': {
        'Background': colors.background,
        'Foreground': colors.foreground,
        'Border': colors.border,
        'Muted': colors.muted,
        'Muted Foreground': colors.mutedForeground,
      },
    }

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-6">Semantic Colors</h2>
        {Object.entries(semanticGroups).map(([group, colors]) => (
          <div key={group}>
            <h3 className="text-lg font-semibold mb-4">{group}</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(colors).map(([name, value]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-20 rounded-lg shadow-sm border border-gray-200"
                    style={{ backgroundColor: value }}
                    title={`${name}: ${value}`}
                  />
                  <div className="text-xs text-center space-y-1">
                    <div className="font-medium">{name}</div>
                    <div className="text-gray-500 font-mono text-[10px]">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Color System</h1>
        <p className="text-lg text-gray-600 mb-8">
          Our comprehensive color system includes brand colors, neutrals, and semantic tokens for consistent UI design.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Brand Colors</h2>
          {renderColorScale('Freelancer (Freela)', colors.freela)}
          {renderColorScale('Company (Empresa)', colors.empresa)}
          {renderColorScale('Institutional', colors.institucional)}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Neutral Colors</h2>
          {renderColorScale('Gray', colors.gray)}
        </div>

        {renderSemanticColors()}
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Use brand colors contextually (freela for freelancer features, empresa for company features)</li>
          <li>• Maintain WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)</li>
          <li>• Use semantic colors for consistent messaging (success, warning, error, info)</li>
          <li>• Apply lighter shades for backgrounds and darker shades for text</li>
          <li>• Test color combinations with the accessibility checker in the toolbar</li>
        </ul>
      </div>
    </div>
  )
}

const meta = {
  title: 'Design System/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color palette including brand colors, neutrals, and semantic tokens.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Color Palette',
}