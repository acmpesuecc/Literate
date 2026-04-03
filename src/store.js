import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create((set,get) => ({
        currentPDFid: null,
        Title: "",
        currentPage: 0,
        highlights: [],
        setCurrentPDF: (pdfId) => {
            set({currentPDFid: pdfId})
        },
        setTitle: (pdftitle) => {
            set({Title:pdftitle})
        },
        setCurrentPage: (index) => {
            set({currentPage:index})
        },
        setHighlights: (pdfHighlights) => {
            set({highlights:pdfHighlights})
            console.log(get())
        }
    }))
