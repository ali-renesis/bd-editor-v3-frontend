import ReactDOM from 'react-dom'
import Editor from '@components/Editor'
import reportWebVitals from './reportWebVitals'
import { CanvasProvider } from '@components/Canvas'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import 'focus-visible/dist/focus-visible'
import './i18n/index'
import './assets/css/icomoon.css'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <CanvasProvider>
      <ChakraProvider>
        <Editor />
      </ChakraProvider>
    </CanvasProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
