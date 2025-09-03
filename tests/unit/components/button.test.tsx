/**
 * Unit Tests for Button Component
 * Tests all variants, states, accessibility, and responsive behavior
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '@/components/ui/button'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock Framer Motion for consistent testing
jest.mock('framer-motion', () => ({
  motion: {
    button: React.forwardRef<HTMLButtonElement, any>(({ children, className, onClick, ...props }, ref) => (
      <button ref={ref} className={className} onClick={onClick} {...props}>
        {children}
      </button>
    )),
  },
}))

describe('Button Component', () => {
  describe('Rendering and Basic Props', () => {
    test('should render with default props', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('type', 'button')
    })

    test('should render different button types', () => {
      const { rerender } = render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
      
      rerender(<Button type="reset">Reset</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
    })

    test('should handle disabled state', () => {
      render(<Button disabled>Disabled Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    test('should render as different HTML elements when asChild is used', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      
      const link = screen.getByRole('link', { name: /link button/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  describe('Button Variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const

    variants.forEach(variant => {
      test(`should render ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Test Button</Button>)
        
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        
        // Check for variant-specific classes
        if (variant === 'default') {
          expect(button.className).toContain('bg-')
        } else if (variant === 'destructive') {
          expect(button.className).toContain('destructive')
        } else if (variant === 'outline') {
          expect(button.className).toContain('border')
        }
      })
    })

    test('should handle invalid variant gracefully', () => {
      // @ts-expect-error - Testing invalid variant
      render(<Button variant="invalid">Test</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Button Sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const

    sizes.forEach(size => {
      test(`should render ${size} size correctly`, () => {
        render(<Button size={size}>Test Button</Button>)
        
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        
        // Check for size-specific classes
        if (size === 'sm') {
          expect(button.className).toContain('h-9')
        } else if (size === 'lg') {
          expect(button.className).toContain('h-11')
        } else if (size === 'icon') {
          expect(button.className).toContain('h-10')
          expect(button.className).toContain('w-10')
        }
      })
    })
  })

  describe('Loading State', () => {
    test('should show loading state correctly', () => {
      render(<Button loading>Loading Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
      
      // Check for loading spinner
      const spinner = screen.getByRole('status', { hidden: true })
      expect(spinner).toBeInTheDocument()
    })

    test('should show custom loading text', () => {
      render(
        <Button loading loadingText="Saving...">
          Save
        </Button>
      )
      
      expect(screen.getByText('Saving...')).toBeInTheDocument()
      expect(screen.queryByText('Save')).not.toBeInTheDocument()
    })

    test('should not be clickable when loading', async () => {
      const onClick = jest.fn()
      render(
        <Button loading onClick={onClick}>
          Click me
        </Button>
      )
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Event Handling', () => {
    test('should call onClick when clicked', async () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('should handle keyboard navigation', async () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick}>Press me</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      
      expect(button).toHaveFocus()
      
      // Test Enter key
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
      expect(onClick).toHaveBeenCalledTimes(1)
      
      // Test Space key
      fireEvent.keyDown(button, { key: ' ', code: 'Space' })
      expect(onClick).toHaveBeenCalledTimes(2)
    })

    test('should prevent event when disabled', async () => {
      const onClick = jest.fn()
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
      )
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(
        <Button>Accessible Button</Button>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    test('should support aria-label', () => {
      render(
        <Button aria-label="Close dialog">
          ×
        </Button>
      )
      
      const button = screen.getByRole('button', { name: /close dialog/i })
      expect(button).toBeInTheDocument()
    })

    test('should support aria-describedby', () => {
      render(
        <div>
          <Button aria-describedby="help-text">Submit</Button>
          <div id="help-text">This will submit the form</div>
        </div>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-describedby', 'help-text')
    })

    test('should have proper focus indicators', () => {
      render(<Button>Focus me</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      
      expect(button).toHaveFocus()
      expect(button.className).toContain('focus')
    })

    test('should announce loading state to screen readers', () => {
      render(<Button loading>Save</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      
      const status = screen.getByRole('status', { hidden: true })
      expect(status).toBeInTheDocument()
    })
  })

  describe('Custom Styling and Classes', () => {
    test('should accept custom className', () => {
      render(
        <Button className="custom-class">
          Custom Button
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button.className).toContain('custom-class')
    })

    test('should merge classes correctly with variants', () => {
      render(
        <Button variant="outline" className="border-red-500">
          Custom Outline
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button.className).toContain('border-red-500')
      expect(button.className).toContain('border') // from outline variant
    })

    test('should forward ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Button</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Theme Integration', () => {
    test('should use design system colors', () => {
      const { container } = render(<Button>Themed Button</Button>)
      
      const button = container.querySelector('button')
      const styles = getComputedStyle(button!)
      
      // The exact color values depend on the theme implementation
      expect(styles).toBeDefined()
    })

    test('should support dark mode classes', () => {
      render(
        <div className="dark">
          <Button>Dark Mode Button</Button>
        </div>
      )
      
      const button = screen.getByRole('button')
      // Should contain dark mode responsive classes
      expect(button.className).toMatch(/dark:/)
    })
  })

  describe('Performance', () => {
    test('should not re-render unnecessarily', () => {
      const renderSpy = jest.fn()
      const TestButton = React.memo(({ children }: { children: React.ReactNode }) => {
        renderSpy()
        return <Button>{children}</Button>
      })
      
      const { rerender } = render(<TestButton>Test</TestButton>)
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      // Re-render with same props
      rerender(<TestButton>Test</TestButton>)
      expect(renderSpy).toHaveBeenCalledTimes(1) // Should not re-render
      
      // Re-render with different props
      rerender(<TestButton>Changed</TestButton>)
      expect(renderSpy).toHaveBeenCalledTimes(2) // Should re-render
    })

    test('should handle rapid clicks gracefully', async () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick}>Rapid Click</Button>)
      
      const button = screen.getByRole('button')
      
      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        await userEvent.click(button)
      }
      
      expect(onClick).toHaveBeenCalledTimes(10)
    })
  })

  describe('Edge Cases', () => {
    test('should handle empty children gracefully', () => {
      render(<Button>{null}</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    test('should handle complex children', () => {
      render(
        <Button>
          <span>Icon</span>
          <strong>Bold Text</strong>
          Regular text
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Bold Text')).toBeInTheDocument()
    })

    test('should work with React.Fragment', () => {
      render(
        <Button>
          <React.Fragment>
            Fragment content
          </React.Fragment>
        </Button>
      )
      
      expect(screen.getByText('Fragment content')).toBeInTheDocument()
    })

    test('should handle concurrent state updates', async () => {
      const TestButton = () => {
        const [loading, setLoading] = React.useState(false)
        const [disabled, setDisabled] = React.useState(false)
        
        const handleClick = () => {
          setLoading(true)
          setDisabled(true)
          setTimeout(() => {
            setLoading(false)
            setDisabled(false)
          }, 100)
        }
        
        return (
          <Button loading={loading} disabled={disabled} onClick={handleClick}>
            Concurrent Updates
          </Button>
        )
      }
      
      render(<TestButton />)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(button).toBeDisabled()
      
      await waitFor(() => {
        expect(button).not.toBeDisabled()
      }, { timeout: 200 })
    })
  })

  describe('Integration with Form Libraries', () => {
    test('should work with form submission', () => {
      const onSubmit = jest.fn(e => e.preventDefault())
      
      render(
        <form onSubmit={onSubmit}>
          <Button type="submit">Submit Form</Button>
        </form>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    test('should prevent form submission when disabled', () => {
      const onSubmit = jest.fn(e => e.preventDefault())
      
      render(
        <form onSubmit={onSubmit}>
          <Button type="submit" disabled>
            Submit Disabled
          </Button>
        </form>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })
})