import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent, CardFooter } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Users, Star, TrendingUp, Calendar, Clock, ArrowRight } from 'lucide-react'

const meta = {
  title: 'Components/Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile card component with multiple variants, hover effects, and gradient support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient', 'bordered', 'elevated'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    hover: {
      control: 'select',
      options: ['lift', 'glow', 'scale', 'tilt', 'none'],
      description: 'Hover animation effect',
      table: {
        defaultValue: { summary: 'lift' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Border radius',
      table: {
        defaultValue: { summary: '2xl' },
      },
    },
    gradient: {
      control: 'select',
      options: ['freela', 'empresa', 'institucional', 'brand', 'premium'],
      description: 'Gradient style (for gradient variant)',
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Default Card</h3>
        <p className="text-gray-600">This is a basic card with default styling.</p>
      </div>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card variant="default">
        <h3 className="font-semibold mb-2">Default</h3>
        <p className="text-sm text-gray-600">Standard card with shadow</p>
      </Card>
      
      <Card variant="bordered">
        <h3 className="font-semibold mb-2">Bordered</h3>
        <p className="text-sm text-gray-600">Card with border</p>
      </Card>
      
      <Card variant="elevated">
        <h3 className="font-semibold mb-2">Elevated</h3>
        <p className="text-sm text-gray-600">Enhanced shadow depth</p>
      </Card>
      
      <Card variant="gradient" gradient="freela">
        <h3 className="font-semibold mb-2">Gradient</h3>
        <p className="text-sm">Gradient background</p>
      </Card>
      
      <div className="p-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
        <Card variant="glass">
          <h3 className="font-semibold mb-2 text-white">Glass</h3>
          <p className="text-sm text-white/80">Glassmorphism effect</p>
        </Card>
      </div>
    </div>
  ),
}

export const HoverEffects: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card hover="lift">
        <h3 className="font-semibold mb-2">Lift on Hover</h3>
        <p className="text-sm text-gray-600">Elevates when hovered</p>
      </Card>
      
      <Card hover="scale">
        <h3 className="font-semibold mb-2">Scale on Hover</h3>
        <p className="text-sm text-gray-600">Scales up slightly</p>
      </Card>
      
      <Card hover="glow">
        <h3 className="font-semibold mb-2">Glow on Hover</h3>
        <p className="text-sm text-gray-600">Adds glow effect</p>
      </Card>
      
      <Card hover="tilt">
        <h3 className="font-semibold mb-2">Tilt on Hover</h3>
        <p className="text-sm text-gray-600">3D tilt effect</p>
      </Card>
      
      <Card hover="none">
        <h3 className="font-semibold mb-2">No Hover Effect</h3>
        <p className="text-sm text-gray-600">Static card</p>
      </Card>
    </div>
  ),
}

export const WithHeaderFooter: Story = {
  render: () => (
    <div className="max-w-md">
      <Card>
        <CardHeader
          title="Project Dashboard"
          subtitle="Track your project progress"
          icon={<TrendingUp className="w-5 h-5 text-freela" />}
          action={
            <Button size="sm" variant="ghost">
              View All
            </Button>
          }
        />
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed Tasks</span>
              <span className="font-semibold">24/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-freela h-2 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>2 days left</span>
          </div>
          <Button size="sm" variant="primary">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const FreelancerCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card variant="elevated" hover="scale">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">John Developer</h3>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>
          <Badge variant="success">Available</Badge>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">4.8 (127)</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Experienced developer specializing in React, Node.js, and cloud solutions.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" size="sm">React</Badge>
          <Badge variant="outline" size="sm">Node.js</Badge>
          <Badge variant="outline" size="sm">TypeScript</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-freela">R$ 120</span>
            <span className="text-sm text-gray-500">/hora</span>
          </div>
          <Button size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Ver Perfil
          </Button>
        </div>
      </Card>
    </div>
  ),
}

export const CompanyCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card variant="gradient" gradient="empresa" hover="glow">
        <div className="text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tech Solutions Inc.</h3>
              <p className="text-sm opacity-80">Software Development</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Open Positions</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Active Projects</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Team Size</span>
              <span className="font-semibold">45+</span>
            </div>
          </div>
          
          <Button variant="glass" fullWidth size="sm">
            Explore Opportunities
          </Button>
        </div>
      </Card>
    </div>
  ),
}

export const StatCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card padding="sm" hover="none">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Projects</p>
            <p className="text-2xl font-bold">247</p>
            <p className="text-xs text-green-600 mt-1">+12% this month</p>
          </div>
          <div className="w-12 h-12 bg-freela-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-freela" />
          </div>
        </div>
      </Card>
      
      <Card padding="sm" hover="none">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Active Users</p>
            <p className="text-2xl font-bold">1,842</p>
            <p className="text-xs text-green-600 mt-1">+8% this week</p>
          </div>
          <div className="w-12 h-12 bg-empresa-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-empresa-700" />
          </div>
        </div>
      </Card>
      
      <Card padding="sm" hover="none">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Revenue</p>
            <p className="text-2xl font-bold">R$ 48.5k</p>
            <p className="text-xs text-green-600 mt-1">+23% this quarter</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>
      
      <Card padding="sm" hover="none">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold">94.2%</p>
            <p className="text-xs text-green-600 mt-1">+2.1% improvement</p>
          </div>
          <div className="w-12 h-12 bg-institucional-100 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-institucional-500" />
          </div>
        </div>
      </Card>
    </div>
  ),
}

export const EventCard: Story = {
  render: () => (
    <div className="max-w-md">
      <Card variant="bordered" hover="lift">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-freela-100 rounded-lg flex flex-col items-center justify-center">
              <span className="text-xs text-freela-600 font-medium">JAN</span>
              <span className="text-xl font-bold text-freela">15</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Developer Meetup 2024</h3>
            <p className="text-sm text-gray-600 mb-3">
              Join us for networking and talks about the latest in web development.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>19:00</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>45 attending</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
}

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'default',
    hover: 'lift',
    padding: 'md',
    rounded: '2xl',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Playground Card</h3>
        <p className="text-gray-600">
          Use the controls to customize this card's appearance and behavior.
        </p>
      </div>
    ),
  },
}