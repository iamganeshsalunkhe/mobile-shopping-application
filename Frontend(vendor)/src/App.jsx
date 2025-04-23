// import required files
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import DemoComponent from "./components/DemoComponent";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:30 * 1000
      }
    }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen ={false}/>
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
    </QueryClientProvider>
  )
}

export default App
