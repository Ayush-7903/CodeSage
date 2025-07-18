import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ code, setCode ] = useState(
  `Paste your code here 
We will review it and give you feedback
Thanks for using our service!`)
  const [ review, setReview ] = useState("")
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post('https://codesage-1.onrender.com/ai/get-review', { code })
      setReview(response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code-review-container">
            <div className="code code-scrollable">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  height: "100%",
                  width: "100%"
                }}
              />
            </div>
            <button
              onClick={reviewCode}
              className="review"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <span className="spinner"></span> : "Review"}
            </button>
          </div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App