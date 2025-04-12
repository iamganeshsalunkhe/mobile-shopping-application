// import required files
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Signup from "./components/Signup"
import Login from "./components/Login";
import Footer from "./components/Footer";
import DemoComponent from "./components/DemoComponent";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index  path="/" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="footer" element={<Footer/>}/>
          <Route path="/demo" element={<DemoComponent/>}/>
        </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App
