import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('AI Image App')).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('AI Image App')).toBeInTheDocument()
  })

  it('renders upload component', () => {
    render(<App />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })

  it('renders generate button', () => {
    render(<App />)
    expect(screen.getByText('Generate')).toBeInTheDocument()
  })

  it('renders show history button', () => {
    render(<App />)
    expect(screen.getByText('Show History')).toBeInTheDocument()
  })

  it('shows history when show history button is clicked', async () => {
    render(<App />)
    const showHistoryButton = screen.getByText('Show History')
    fireEvent.click(showHistoryButton)
    
    await waitFor(() => {
      expect(screen.getByText('History')).toBeInTheDocument()
    })
  })
})
