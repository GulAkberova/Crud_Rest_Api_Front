import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { StyledEngineProvider } from '@mui/material/styles';// import ParallelQueries from "./pages/ParallelQueries";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
   <BrowserRouter>
   <StyledEngineProvider injectFirst>
   <App />
   </StyledEngineProvider>
   </BrowserRouter>
   </QueryClientProvider>
)
