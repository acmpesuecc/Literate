import {db} from "../db.js"

const { pdfs }=db
const {highlights}=db
export function AddDataPage({ defaultPage } = { defaultPage : 0 }) {
  const [title, setTitle] = useState("")
  const [pg, setPage] = useState(defaultPage)
  const [status, setStatus] = useState("")

  async function pdfinfo() {
    try {
      const id = await pdfs.add({
        title,
        pg,
      })

      setStatus(`Title ${title} successfully added. Got id ${id}`)
      setTitle("")
      setPage(defaultPage)
    } catch (error) {
      setStatus(`Failed to add ${title}: ${error}`)
    }
  }

  return (
    <>
      <p>{status}</p>
      Title:
      <input
        type="text"
        value={title}
        onChange={(ev) => setName(ev.target.value)}
      />
      Page:
      <input
        type="number"
        value={pg}
        onChange={(ev) => setPage(Number(ev.target.value))}
      />
      <button onClick={pdfinfo}>Add</button>
    </>
  )
}

export function AddDataHighlights({ defaultPage } = { defaultPage : 0 },{ defaultPara } = { defaultPara : 0 },{ defaultLength } = { defaultLength : 0 }) {
  const [para, setParagraph] = useState(defaultPara)
  const [pg, setPage] = useState(defaultPage)
  const [wordlen, setLength] = useState(defaultLength)
  const [status, setStatus] = useState("")

  async function highlightinfo() {
    try {
      const id = await highlights.add({
        pg,
        para,
        wordlen,
      })

      setStatus(`Page ${pg} successfully added. Got id ${id}`)
      setPage(defaultPage)
      setParagraph(defaultPara)
      setLength(defaultLength)
    } catch (error) {
      setStatus(`Failed to add ${pg}: ${error}`)
    }
  }

  return (
    <>
      <p>{status}</p>
      Page:
      <input
        type="number"
        value={pg}
        onChange={(ev) => setPage(Number(ev.target.value))}
      />
      Paragraph:
      <input
        type="number"
        value={para}
        onChange={(ev) => setPage(Number(ev.target.value))}
      />
      Wordlength:
      <input
        type="number"
        value={wordlen}
        onChange={(ev) => setPage(Number(ev.target.value))}
      />
      <button onClick={highlightinfo}>Add</button>
    </>
  )
}