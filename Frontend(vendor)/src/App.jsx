// import required files
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Signup from "./components/Signup"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index  path="/" element={<Signup/>}/>
        </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App
