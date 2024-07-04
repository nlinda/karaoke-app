import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ContentPage from './components/ContentPage';
import NotFound from './components/NotFound';
import Navbar from './components/NavBar';

const App: React.FC = () => {
  const [selectedTranscriptId, setSelectedTranscriptId] = useState<number>(0);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Your Navbar or other layout components can be placed here */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route element={<ContentPage/>} path="/transcript/:selectedTranscriptId"  />
          <Route element={<NotFound/>} /> {/* Fallback route for 404 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
