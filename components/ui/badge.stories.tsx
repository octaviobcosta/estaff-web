import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'
import { Check, X, AlertCircle, Info, TrendingUp, Star, Clock, Users } from 'lucide-react'

const meta = {
  title: 'Components/Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact badge component for status indicators, labels, and notifications with gradient support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gradient'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        defaultValue: { summary: 'sm' },
      },
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Border radius',
      table: {
        defaultValue: { summary: 'full' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable animation on appearance',
      table: {
        defaultValue: { summary: false },
      },
    },
    pulse: {
      control: 'boolean',
      description: 'Enable pulse animation',
      table: {
        defaultValue: { summary: false },
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
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'sm',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="gradient">Gradient</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Badge variant="success">
          <Check className="w-3 h-3 mr-1" />
          Active
        </Badge>
        <Badge variant="warning">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </Badge>
        <Badge variant="danger">
          <X className="w-3 h-3 mr-1" />
          Inactive
        </Badge>
        <Badge variant="primary">
          <Info className="w-3 h-3 mr-1" />
          Info
        </Badge>
      </div>
    </div>
  ),
}

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button className="p-2 rounded-lg bg-gray-100">
          <AlertCircle className="w-5 h-5" />
        </button>
        <Badge 
          variant="danger" 
          size="xs" 
          className="absolute -top-1 -right-1"
        >
          3
        </Badge>
      </div>
      
      <div className="relative">
        <button className="p-2 rounded-lg bg-gray-100">
          <Users className="w-5 h-5" />
        </button>
        <Badge 
          variant="primary" 
          size="xs" 
          className="absolute -top-1 -right-1"
        >
          12
        </Badge>
      </div>
      
      <div className="relative">
        <button className="p-2 rounded-lg bg-gray-100">
          <Star className="w-5 h-5" />
        </button>
        <Badge 
          variant="warning" 
          size="xs" 
          className="absolute -top-1 -right-1"
          pulse
        >
          New
        </Badge>
      </div>
    </div>
  ),
}

export const AnimatedBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge animated variant="primary">Animated Entry</Badge>
      <Badge pulse variant="success">
        <div className="w-2 h-2 bg-white rounded-full mr-2" />
        Live
      </Badge>
      <Badge pulse variant="danger">
        Recording
      </Badge>
      <Badge animated pulse variant="gradient">
        Premium
      </Badge>
    </div>
  ),
}

export const GradientBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="gradient" gradient="brand">Brand Gradient</Badge>
      <Badge variant="gradient" gradient="freela">Freela Gradient</Badge>
      <Badge variant="gradient" gradient="empresa">Empresa Gradient</Badge>
      <Badge variant="gradient" gradient="institucional">Institutional</Badge>
      <Badge variant="gradient" gradient="premium">Premium</Badge>
    </div>
  ),
}

export const BorderRadius: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge rounded="sm" variant="primary">Small Radius</Badge>
      <Badge rounded="md" variant="secondary">Medium Radius</Badge>
      <Badge rounded="lg" variant="success">Large Radius</Badge>
      <Badge rounded="full" variant="gradient">Full Radius</Badge>
    </div>
  ),
}

export const SkillBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold mb-2">Technical Skills</h4>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm" variant="default">React</Badge>
          <Badge size="sm" variant="default">TypeScript</Badge>
          <Badge size="sm" variant="default">Node.js</Badge>
          <Badge size="sm" variant="default">Next.js</Badge>
          <Badge size="sm" variant="default">Tailwind CSS</Badge>
          <Badge size="sm" variant="default">PostgreSQL</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold mb-2">Expertise Level</h4>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm" variant="success">Expert</Badge>
          <Badge size="sm" variant="primary">Advanced</Badge>
          <Badge size="sm" variant="warning">Intermediate</Badge>
          <Badge size="sm" variant="default">Beginner</Badge>
        </div>
      </div>
    </div>
  ),
}

export const CategoryBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Project Type:</span>
        <Badge variant="primary">Web Development</Badge>
        <Badge variant="secondary">Mobile App</Badge>
        <Badge variant="gradient">Full Stack</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Availability:</span>
        <Badge variant="success">Available Now</Badge>
        <Badge variant="warning">Busy</Badge>
        <Badge variant="danger">Unavailable</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Experience:</span>
        <Badge variant="gradient" gradient="premium">
          <Star className="w-3 h-3 mr-1" />
          Senior
        </Badge>
        <Badge variant="primary">Mid-Level</Badge>
        <Badge variant="default">Junior</Badge>
      </div>
    </div>
  ),
}

export const MetricBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success">
        <TrendingUp className="w-3 h-3 mr-1" />
        +12%
      </Badge>
      <Badge variant="danger">
        <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
        -5%
      </Badge>
      <Badge variant="primary">
        <Clock className="w-3 h-3 mr-1" />
        2h ago
      </Badge>
      <Badge variant="warning">
        <Users className="w-3 h-3 mr-1" />
        3 waiting
      </Badge>
      <Badge variant="gradient">
        <Star className="w-3 h-3 mr-1" />
        4.8/5.0
      </Badge>
    </div>
  ),
}

export const InlineUsage: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <p className="text-sm">
        This project requires <Badge size="xs" variant="primary">React 18+</Badge> and{' '}
        <Badge size="xs" variant="secondary">TypeScript</Badge> knowledge.
      </p>
      
      <p className="text-sm">
        Status: <Badge size="sm" variant="success">Approved</Badge> by 
        management on <Badge size="xs">Dec 15, 2023</Badge>
      </p>
      
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium">Premium Feature</span>
        <Badge variant="gradient" gradient="premium" pulse>PRO</Badge>
      </div>
    </div>
  ),
}

// Interactive Playground
export const Playground: Story = {
  args: {
    children: 'Playground Badge',
    variant: 'default',
    size: 'sm',
    rounded: 'full',
    animated: false,
    pulse: false,
  },
}