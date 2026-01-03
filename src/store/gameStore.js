import { create } from 'zustand'

export const useGameStore = create((set) => ({
  gameState: 'menu', // menu, playing, finished
  startTime: 0,
  endTime: 0,
  
  startGame: () => set({ gameState: 'playing', startTime: Date.now() }),
  endGame: () => set((state) => ({ gameState: 'finished', endTime: Date.now() })),
  resetGame: () => set({ gameState: 'menu', startTime: 0, endTime: 0 }),
}))
