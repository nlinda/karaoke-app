import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ContentPage from './components/ContentPage';
import NotFound from './components/NotFound';
import Navbar from './components/NavBar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          {/* Your Navbar or other layout components can be placed here */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route  path="/transcript/:selectedTranscriptId" element={<ContentPage/>}  />
            <Route element={<NotFound/>} /> {/* Fallback route for 404 */}
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
