// import required files
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Signup from "./components/Signup"
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index  path="/" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App
