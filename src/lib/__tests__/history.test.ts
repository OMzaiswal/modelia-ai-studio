import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { saveToHistory, getHistory, clearHistory } from '../history'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

const mockGenerateResponse = {
  id: 'test-id',
  imageUrl: 'test-image.jpg',
  prompt: 'Test prompt',
  style: 'Realistic',
  createdAt: '2024-01-01T00:00:00Z'
}

describe('History Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe('saveToHistory', () => {
    it('saves item to history', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      saveToHistory(mockGenerateResponse)
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'LocalHistory',
        JSON.stringify([mockGenerateResponse])
      )
    })

    it('adds new item to beginning of existing history', () => {
      const existingHistory = [mockGenerateResponse]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingHistory))
      
      const newItem = { ...mockGenerateResponse, id: 'new-id' }
      saveToHistory(newItem)
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'LocalHistory',
        JSON.stringify([newItem, mockGenerateResponse])
      )
    })

    it('limits history to 5 items', () => {
      const existingHistory = Array.from({ length: 5 }, (_, i) => ({
        ...mockGenerateResponse,
        id: `id-${i}`
      }))
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingHistory))
      
      const newItem = { ...mockGenerateResponse, id: 'new-id' }
      saveToHistory(newItem)
      
      const savedHistory = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      expect(savedHistory).toHaveLength(5)
      expect(savedHistory[0].id).toBe('new-id')
    })
  })

  describe('getHistory', () => {
    it('returns empty array when no history exists', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      const result = getHistory()
      
      expect(result).toEqual([])
    })

    it('returns parsed history when it exists', () => {
      const history = [mockGenerateResponse]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(history))
      
      const result = getHistory()
      
      expect(result).toEqual(history)
    })

    it('returns empty array when JSON parsing fails', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json')
      
      const result = getHistory()
      
      expect(result).toEqual([])
    })
  })

  describe('clearHistory', () => {
    it('removes history from localStorage', () => {
      clearHistory()
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('LocalHistory')
    })
  })
})
