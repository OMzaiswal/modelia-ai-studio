import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Upload from '../Upload'

// Mock the onUpload prop
const mockOnUpload = vi.fn()

describe('Upload Component', () => {
  beforeEach(() => {
    mockOnUpload.mockClear()
  })

  it('renders upload component', () => {
    render(<Upload onUpload={mockOnUpload} />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
    expect(screen.getByDisplayValue('')).toBeInTheDocument() // file input
  })

  it('accepts image files', () => {
    render(<Upload onUpload={mockOnUpload} />)
    const fileInput = screen.getByDisplayValue('')
    expect(fileInput).toHaveAttribute('accept', 'image/png, image/jpeg')
  })

  it('shows error for non-image files', () => {
    render(<Upload onUpload={mockOnUpload} />)
    const fileInput = screen.getByDisplayValue('')
    
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    expect(screen.getByText('Please upload a PNG or JPG file')).toBeInTheDocument()
  })

  it('shows error for files larger than 10MB', () => {
    render(<Upload onUpload={mockOnUpload} />)
    const fileInput = screen.getByDisplayValue('')
    
    // Create a mock file larger than 10MB
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
    fireEvent.change(fileInput, { target: { files: [largeFile] } })
    
    expect(screen.getByText('File size must be less than 10MB')).toBeInTheDocument()
  })

  it('renders file input with correct attributes', () => {
    render(<Upload onUpload={mockOnUpload} />)
    const fileInput = screen.getByDisplayValue('')
    
    expect(fileInput).toHaveAttribute('accept', 'image/png, image/jpeg')
    expect(fileInput).toHaveAttribute('type', 'file')
  })

  it('shows no image text initially', () => {
    render(<Upload onUpload={mockOnUpload} />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })
})
