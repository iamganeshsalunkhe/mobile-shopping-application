// import required modules
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import SignUpPage from "./Pages/SignUpPage";
import DemoPage from "./Pages/DemoPage";
import LoginPage from "./Pages/LoginPage";
import AccountPage from "./Pages/AccountPage";


// create queryClient instance
const queryClient = new QueryClient();

function App() {
return (
    <QueryClientProvider client = {queryClient} >
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<AccountPage/>}/>
          <Route path="/demo/:pageName" element={<DemoPage/>}/>
        </Routes>
      </MantineProvider>
      <Toaster toastOptions={{
        success:{
          style:{
            fontFamily:'inherit',
            fontWeight:'bold',
            fontSize:'18px'
          }
        },
        error:{
          style:{
            fontFamily:"inherit",
            fontWeight:'bold',
            fontSize:'18px'
          }
        }
      }} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </BrowserRouter>
    </QueryClientProvider>
  );
}


export default App;
