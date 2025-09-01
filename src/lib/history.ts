import type { GenerateResponse } from "../types";

const STORAGE_KEY = "LocalHistory";

export function saveToHistory(item: GenerateResponse) {
    const currentData = getHistory();
    currentData.unshift(item);

    if (currentData.length > 5) {
        currentData.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
}

export function getHistory(): GenerateResponse[] {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return [];
    try {
        return JSON.parse(rawData) as GenerateResponse[]
    } catch (err) {
        return []
    }
}

export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
  }