import type { Meta, StoryObj } from '@storybook/react'
import { Button, IconButton } from './button'
import { Search, Heart, ArrowRight, Download, Mail, Settings, Plus, ChevronRight } from 'lucide-react'

const meta = {
  title: 'Components/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Premium button component with multiple variants, sizes, animations, and brand theming support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'gradient', 'glass', 'glow'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    animation: {
      control: 'select',
      options: ['scale', 'shine', 'pulse', 'none'],
      description: 'Animation effect',
      table: {
        defaultValue: { summary: 'scale' },
      },
    },
    gradient: {
      control: 'select',
      options: ['brand', 'freela', 'empresa', 'institucional', 'premium'],
      description: 'Gradient style (for gradient variant)',
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
      table: {
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Click Me',
    variant: 'primary',
    size: 'md',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="glass" className="bg-gray-800 p-4">Glass</Button>
      <Button variant="glow">Glow</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button icon={<Search className="w-4 h-4" />}>Search</Button>
      <Button icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">Continue</Button>
      <Button variant="outline" icon={<Download className="w-4 h-4" />}>Download</Button>
      <Button variant="gradient" icon={<Mail className="w-4 h-4" />}>Send Email</Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton size="xs" aria-label="Search">
        <Search className="w-3 h-3" />
      </IconButton>
      <IconButton size="sm" aria-label="Favorite">
        <Heart className="w-4 h-4" />
      </IconButton>
      <IconButton size="md" aria-label="Settings">
        <Settings className="w-5 h-5" />
      </IconButton>
      <IconButton size="lg" variant="outline" aria-label="Add">
        <Plus className="w-6 h-6" />
      </IconButton>
      <IconButton size="xl" variant="gradient" aria-label="Next">
        <ChevronRight className="w-7 h-7" />
      </IconButton>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading size="sm">Loading...</Button>
      <Button loading variant="secondary">Processing</Button>
      <Button loading variant="outline" size="lg">Please Wait</Button>
      <IconButton loading aria-label="Loading">
        <Settings className="w-5 h-5" />
      </IconButton>
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Primary</Button>
      <Button disabled variant="secondary">Disabled Secondary</Button>
      <Button disabled variant="outline">Disabled Outline</Button>
      <Button disabled variant="gradient">Disabled Gradient</Button>
    </div>
  ),
}

export const AnimationEffects: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button animation="scale">Scale on Hover</Button>
      <Button animation="shine" variant="gradient">Shine Effect</Button>
      <Button animation="pulse" variant="secondary">Pulse Animation</Button>
      <Button animation="none" variant="outline">No Animation</Button>
    </div>
  ),
}

export const BorderRadius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button rounded="sm">Small Radius</Button>
      <Button rounded="md">Medium Radius</Button>
      <Button rounded="lg">Large Radius</Button>
      <Button rounded="xl">Extra Large</Button>
      <Button rounded="full">Full Radius</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline" icon={<Mail className="w-4 h-4" />}>
        Contact Us
      </Button>
      <Button fullWidth variant="gradient" size="lg">
        Get Started Now
      </Button>
    </div>
  ),
}

export const BrandTheming: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Freelancer Theme</h3>
        <div className="flex gap-3">
          <Button variant="primary">Freela Primary</Button>
          <Button variant="outline">Freela Outline</Button>
          <Button variant="gradient" gradient="freela">Freela Gradient</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Company Theme</h3>
        <div className="flex gap-3">
          <Button variant="secondary">Empresa Secondary</Button>
          <Button variant="outline" className="border-empresa-700 text-empresa-700 hover:bg-empresa-700">
            Empresa Outline
          </Button>
          <Button variant="gradient" gradient="empresa">Empresa Gradient</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Institutional Theme</h3>
        <div className="flex gap-3">
          <Button className="bg-institucional-400 hover:bg-institucional-500">
            Institutional Primary
          </Button>
          <Button variant="gradient" gradient="institucional">Institutional Gradient</Button>
        </div>
      </div>
    </div>
  ),
}

export const GlassEffect: Story = {
  render: () => (
    <div className="p-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="flex flex-wrap gap-4">
        <Button variant="glass">Glass Button</Button>
        <Button variant="glass" size="lg" icon={<Heart className="w-5 h-5" />}>
          Like This
        </Button>
        <IconButton variant="glass" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </IconButton>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { disable: true },
  },
}

export const ComplexCompositions: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="flex gap-3">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
          Add Item
        </Button>
      </div>
      
      <div className="flex gap-3">
        <Button variant="ghost">Skip</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="gradient" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
          Continue
        </Button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">3 items selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">Deselect All</Button>
            <Button size="sm" variant="primary">Apply Action</Button>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Interactive Playground
export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'primary',
    size: 'md',
    rounded: 'lg',
    animation: 'scale',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
}