import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { Provider } from '../context/quiz.jsx'
// import { Provider } from '../context/quiz.jsx'
import Provider from '../context/GlobalProvider.jsx'
// import Provider from '../context/GlobalProvider.jsx'
// import { QuizProvider } from '../context/quiz.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>      
  </StrictMode>,
)
