import type { Preview } from '@storybook/nextjs'
import React from 'react'
import '../app/globals.css'

// Import our design tokens
import { colors } from '../lib/design-system/tokens/colors'
import { spacing } from '../lib/design-system/tokens/spacing'
import { typography } from '../lib/design-system/tokens/typography'
import { animation } from '../lib/design-system/tokens/animation'
import { elevation } from '../lib/design-system/tokens/elevation'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      theme: {
        base: 'light',
        brandTitle: 'eStaff Design System',
        brandUrl: 'https://estaff.com.br',
        brandImage: '/logo.svg',
        brandTarget: '_self',
      },
      toc: true,
    },
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'gray',
          value: colors.gray[50],
        },
        {
          name: 'freela',
          value: colors.freela[50],
        },
        {
          name: 'empresa',
          value: colors.empresa[900],
        },
        {
          name: 'institucional',
          value: colors.institucional[50],
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '812px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        laptop: {
          name: 'Laptop',
          styles: {
            width: '1366px',
            height: '768px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'autocomplete-valid',
            enabled: false,
          },
        ],
      },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Design System',
          ['Introduction', 'Colors', 'Typography', 'Spacing', 'Animation', 'Elevation'],
          'Components',
          ['Primitives', 'Elements', 'Patterns', 'Templates'],
          'Forms',
          'Pages',
          '*',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Brand theme for components',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default', icon: 'circle' },
          { value: 'freela', title: 'Freelancer', icon: 'user' },
          { value: 'empresa', title: 'Company', icon: 'building' },
          { value: 'institucional', title: 'Institutional', icon: 'globe' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'pt-BR',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'pt-BR', title: 'Português (Brasil)' },
          { value: 'en-US', title: 'English (US)' },
          { value: 'es-ES', title: 'Español' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'default'
      
      // Apply theme class to body for global theme switching
      React.useEffect(() => {
        document.body.setAttribute('data-theme', theme)
      }, [theme])
      
      return (
        <div className={`theme-${theme}`}>
          <Story />
        </div>
      )
    },
  ],
}

export default preview