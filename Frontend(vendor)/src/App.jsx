// import required files
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Footer from "./components/Footer";
import DemoComponent from "./components/DemoComponent";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route index  path="/" element={<LoginPage/>}/> */}
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/demo" element={<DemoComponent/>}/>
          <Route path="/" element ={<HomePage/>}/>   
        </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App
