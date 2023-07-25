import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-EN';



function App() {



  const [isListening, setIsListening] = useState(false);
  const [transcript, setTransript] = useState("")


  useEffect(() => {
    handleListen();
    // eslint-disable-next-line
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      setTransript("")
      mic.onend = () => {
        mic.start();
      }
    }
    else {
      mic.stop();
      mic.onend = () => {
        console.log('Mic is off');
      }
    }

    mic.onstart = () => {
      console.log('Mic is on');
    }

    mic.onresult = event => {
      // Result is an array of all the words spoken
      const mytransript = Array.from(event.results)
        // Map through the array and return the transcript
        .map(result => result[0])
        .map(result => result.transcript)
        // Join the array into a string
        .join('');
      // Set the note to the transcript
      setTransript(mytransript)
      mic.onerror = event => {
        console.log(event.error);
      }
    }
  }

  return (
    <div className="App">
      <div className='d-flex justify-content-end me-auto gap-2'>
          <button onClick={() => setIsListening(prevState => !prevState)} outline color={isListening ? 'warning' : 'success'}>{isListening ? "Stop" : "Start"}</button>
          {isListening && <p>Listening: {transcript}</p> } 
      </div>

    </div>
  );
}

export default App;
