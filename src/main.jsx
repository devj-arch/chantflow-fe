import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './layouts/Layout.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Terms from './pages/Terms/Terms.jsx'
import Chant from './pages/Chant/Chant.jsx'
import Explore from './pages/Explore/Explore.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'

const router = createBrowserRouter([
    {path:'/', element: <Layout />, children: [
      {path: '/', element: <App />},
      {path: '/about', element: <About /> },
      {path: '/contact', element: <Contact /> },
      {path: '/terms', element: <Terms /> },
      {path: '/chant/:mantraId', element: <Chant /> },
      {path: '/explore', element: <Explore /> },
      {path: '/login', element: <Login /> },
      {path: '/signup', element: <Signup /> },
    ]}
  ])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
)
