import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }/>
          <Route path='/register' element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
