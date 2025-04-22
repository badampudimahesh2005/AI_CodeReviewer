import { useState , useEffect } from 'react'; 
import "prismjs/themes/prism-tomorrow.css"
import './App.css'

import Editor from 'react-simple-code-editor';
import prism from "prismjs"
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css"

import axios from 'axios';


function App() {



  const [code, setCode] = useState(`
    function sum() {
    return a+b;
    }
    `);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  

  const codeReviewer = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/ai/get-review', { code });
      // console.log(response.data.response);
      setReview(response.data.response);
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    prism.highlightAll();
  }
  , []);

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.js, 'js')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: '100%',
              width: '100%',
               border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
        </div>
        <div className="review" onClick={codeReviewer}>Review</div>
      </div>

      <div className="right">
        {
          loading 
          ? 
          <div className='loader'></div> 
          :
          <Markdown
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
          >{review}
          </Markdown>
        }
        
      </div>
    </main>
    </>
  )
}

export default App
