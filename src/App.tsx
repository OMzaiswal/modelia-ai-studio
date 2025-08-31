import './App.css'
import PromptInput from './components/PromptInput';
import StyleDropdown from './components/StyleDropdown';
import Upload from './components/Upload'
import { useState } from 'react';
import type { GenerateRequest, GenerateResponse } from './types';
import { saveToHistory, getHistory } from './lib/history';
import { retryWithBackoff } from './lib/retry';
import { GenerateImage } from './lib/api';
import History from './components/History'

function App() {
  const [img, setImg] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [history, setHistory] = useState<GenerateResponse[]>(getHistory());
  const [response, setresponse] = useState<GenerateResponse | null>(null);
  const [showHistory, setShowHistory] = useState(false);


  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const request: GenerateRequest = {
      prompt,
      style,
      image: img
    }

    try {
      const res = await retryWithBackoff(() => GenerateImage(request), 3, 500);

      setresponse(res);

      saveToHistory(res);
      // setHistory(getHistory);
      setShowHistory(false);
    } catch(err: any) {
      if (err.message) {
        setError(err.message)
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen space-x-40">   
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md gap-4">
        <h1 className='my-6'>AI Image App</h1>
        <Upload onUpload={setImg} />
        <PromptInput onchange={setPrompt}/>
        <StyleDropdown value={style} onchange={setStyle}/>
        <button
          className='border-2 border-gray-300 rounded-lg py-2 px-4 text-blue-600 hover:bg-blue-200 '
          onClick={handleSubmit}
        >
          {loading? 'Generating...' : 'Generate'}
        </button>
        {error && <p>{error}</p>}
      </div>


      <div>
        <button className='text-red-500 hover:border-0 hover:bg-red-50 p-2 rounded-md' onClick={() => setShowHistory(!showHistory)}>
          {showHistory? 'Hide History' : 'Show History'}
        </button>
        {/* History Secrtion */}
        {showHistory ? (
          <History />
        ) : (
          <div>{response && (
            <div className="my-4 w-full p-4 border rounded bg-white">
              <img src={response.imageUrl} alt="Generated" className="max-w-sm rounded" />
              <p className="text-gray-600 text-sm mt-2">
                <strong>ID:</strong> {response.id} <br/>
                <strong>Prompt:</strong> {response.prompt}<br />
                <strong>Style:</strong> {response.style} <br/>
                <strong>Created At:</strong> {response.createdAt}
              </p>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
