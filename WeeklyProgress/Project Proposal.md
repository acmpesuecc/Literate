# Project Proposal: Literate

**Title:** Literate

**Subtitle:** A FOSS, BYO-Cloud PDF Reader & Sync Engine

## 1. Description

**Literate** is a cross-platform PWA that enables users to maintain a unified reading experience across devices without relying on proprietary servers. Users select specific folders within their own cloud storage (starting with Google Drive) to serve as their library.

The app reads, parses, and renders documents using a **MuPDF-based engine** compiled to **WebAssembly (WASM)** / PDF.js depending on the timeline constraint/learning curve. All reading data—including current page, highlights, and bookmarks—is synced via a lightweight JSON sidecar file stored in the user's cloud.

## 2. Tech Stack

* **Frontend:** **React + Vite** SPA
* **Rendering Core:** **MuPDF** compiled to **WASM** (leveraging OpenReadera's logic wrappers).(will improve file support as additional issues to work on)
* **Cloud Integration:** **Google Drive API** (using the `drive.metadata.readonly` and `drive.file` scopes for granular folder access).
* **State Management:** **Zustand** for the reader's UI state.
* **Offline Support:** **Service Workers** (via `next-pwa`) for local caching of the WASM engine and active PDF blobs.

## 3. System Architecture

```
[ VITE DEV SERVER / STATIC HOST ]
        |
        ▼
[ BROWSER ENGINE ]
  ├── [ React UI ] <---- (React Router / Tailwind)
  ├── [ Zustand Store ] <---- (App State)
  ├── [ MuPDF WASM Worker ] <---- (Background Rendering)
  └── [ Service Worker ] <---- (Offline Cache / PWA)
        ▲
        | (Sync via OAuth2)
        ▼
[ GOOGLE DRIVE API ]
```

## 4. Overall Project Timeline

| Week | Phase | Key Tasks |
| --- | --- | --- |
| **W1** | **Cloud & Auth** | Set up Google OAuth; Implement folder picker; List files from selected Drive folders. |
| **W2** | **WASM Integration** | Compile/Bridge MuPDF to WASM; Create a basic `<Canvas>` wrapper to render PDF pages. |
| **W3** | **File Management** | Implement "Upload to Drive" functionality; Local caching of PDFs in IndexedDB for offline access. |
| **W4** | **The Sync Engine** | Develop the JSON sidecar logic; Auto-save reading position to Drive every fixed time limit/on close. |
| **W5** | **Annotations** | Implement text selection on top of the MuPDF canvas; Save/Render highlights and bookmarks. |
| **W6** | **Final Polish** | UI/UX for the library view; PWA manifest configuration; Documentation and Demo prep. |

---

## Some thoughts on implementation

### 1. Folder Selection & Upload

To allow for user-selected folders, we will use the **Google Picker API**.

* **The Flow:** The user clicks "Add Folder"  A secure Google popup appears  The user grants permission to a specific folder  Literate saves that `folderID` and scans it for PDFs.
* **Upload:** When a user adds a new book to Literate, the app will programmatically upload it to one of these "Linked Folders" via the `multipart/form-data` Drive API.

### 2. The MuPDF WASM issue

The primary technical hurdle is the bridging of the WASM Module.

* **Optimization:** In Week 2, if the MuPDF/WASM build becomes too complex, we will write the Reader UI to accept *any* renderer. This way, we can drop in a pre-compiled MuPDF WASM module, but have a basic fallback (like a lightweight PDF worker)

### 3. Data Schema (The Sidecar File)

To keep sync semi-real-time, we will store data in a file named `.literate.sync` inside each linked folder or as a single global config file.

```json
{
  "file_id_123": {
    "last_page": 14,
    "bookmarks": [5, 22],
    "highlights": [
      { "page": 2, "rects": [...], "color": "yellow", "note": "Important!" }
    ]
  }
}

```
### 4. Use of OpenReadEra's render/parser engines

This will need a lot of work to rework and compile into WASM modules, however the parser/render engines are pretty reliable to use. Source code will require us to mail, but alternatives also exist.
---
