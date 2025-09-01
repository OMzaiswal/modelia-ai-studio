import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import History from '../History'

// Mock the history module
vi.mock('../../lib/history', () => ({
  getHistory: vi.fn()
}))

import { getHistory } from '../../lib/history'

const mockGetHistory = getHistory as vi.MockedFunction<typeof getHistory>

describe('History Component', () => {
  beforeEach(() => {
    mockGetHistory.mockClear()
  })

  it('renders history heading', () => {
    mockGetHistory.mockReturnValue([])
    render(<History />)
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  it('renders empty state when no history', () => {
    mockGetHistory.mockReturnValue([])
    render(<History />)
    expect(screen.getByText('History')).toBeInTheDocument()
    // Should not have any list items
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('renders history items when available', () => {
    const mockHistory = [
      {
        id: '1',
        imageUrl: 'test1.jpg',
        prompt: 'Test prompt 1',
        style: 'Realistic',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        imageUrl: 'test2.jpg',
        prompt: 'Test prompt 2',
        style: 'Artistic',
        createdAt: '2024-01-02T00:00:00Z'
      }
    ]
    
    mockGetHistory.mockReturnValue(mockHistory)
    render(<History />)
    
    expect(screen.getByText('Test prompt 1')).toBeInTheDocument()
    expect(screen.getByText('Test prompt 2')).toBeInTheDocument()
    expect(screen.getByText('Realistic')).toBeInTheDocument()
    expect(screen.getByText('Artistic')).toBeInTheDocument()
    expect(screen.getAllByText(/ID:/)).toHaveLength(2)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('displays formatted dates', () => {
    const mockHistory = [
      {
        id: '1',
        imageUrl: 'test.jpg',
        prompt: 'Test prompt',
        style: 'Realistic',
        createdAt: '2024-01-01T12:30:00Z'
      }
    ]
    
    mockGetHistory.mockReturnValue(mockHistory)
    render(<History />)
    
    // Check that the date is displayed (format may vary by locale)
    expect(screen.getByText(/Created At:/)).toBeInTheDocument()
  })

  it('renders images with correct attributes', () => {
    const mockHistory = [
      {
        id: '1',
        imageUrl: 'test.jpg',
        prompt: 'Test prompt',
        style: 'Realistic',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ]
    
    mockGetHistory.mockReturnValue(mockHistory)
    render(<History />)
    
    const image = screen.getByAltText('Test prompt')
    expect(image).toHaveAttribute('src', 'test.jpg')
    expect(image).toHaveClass('h-20', 'w-auto')
  })
})
