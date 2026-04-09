import { create } from 'zustand'

export const useStore = create((set,get) => ({
        currentPDFid: null,
        Title: "",
        currentPage: 0,
        highlights: [],
        blob:null,
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
        },
        setBlob: (inputBlob)=>{
            set({blob: inputBlob})
            console.log(get())
        }
    }))
