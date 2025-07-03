import Dashboard from "./pages/Dashboard"
import { SharedBrain } from "./pages/SharedBrain"
import { SignIn } from "./pages/signin"
import { SignUp } from "./pages/signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/share/:shareId" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
