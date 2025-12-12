// frontend/store.js
import create from 'zustand'

export const useAppStore = create(set => ({
  user: { id: 'me', name: 'Dhrubo', role: 'borrower' }, // role: borrower | investor
  selectedProfile: null,
  // version tick to trigger manual re-renders
  tick: 0,
  setUser: (u) => set(state => ({ user: { ...state.user, ...u } })),
  setSelectedProfile: (p) => set({ selectedProfile: p }),
  bump: () => set(state => ({ tick: state.tick + 1 }))
}))
