'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    
    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Ops! Algo deu errado
            </h2>
            
            <p className="mb-6 text-gray-600">
              Encontramos um erro inesperado. Por favor, tente novamente ou volte para a página inicial.
            </p>

            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-800">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-institucional-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-institucional-700 focus:outline-none focus:ring-2 focus:ring-institucional-400 focus:ring-offset-2"
                aria-label="Tentar novamente"
              >
                <RefreshCcw className="h-4 w-4" />
                Tentar Novamente
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Voltar para página inicial"
              >
                <Home className="h-4 w-4" />
                Página Inicial
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Wrapper component for easier use
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}