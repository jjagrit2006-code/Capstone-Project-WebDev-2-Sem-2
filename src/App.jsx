import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './app/AppShell.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { ToastProvider } from './components/Toast.jsx'

// Pages (implemented next)
import { Home } from './pages/Home.jsx'
import { SearchDonors } from './pages/SearchDonors.jsx'
import { EmergencyRequests } from './pages/EmergencyRequests.jsx'
import { PostEmergencyRequest } from './pages/PostEmergencyRequest.jsx'
import { RequestDetail } from './pages/RequestDetail.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { MyRequests } from './pages/MyRequests.jsx'

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/donors" element={<SearchDonors />} />
            <Route path="/requests" element={<EmergencyRequests />} />
            <Route path="/requests/new" element={<PostEmergencyRequest />} />
            <Route path="/requests/:id" element={<RequestDetail />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
