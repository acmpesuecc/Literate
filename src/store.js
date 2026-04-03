import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useStore = create(
    persist((set,get) => ({currentPDFid: null,
        setCurrentPDF: (pdfId) => {set({currentPDFid: pdfId})}
     }),
    {name:'Literate'}))
console.log(useStore.getState)