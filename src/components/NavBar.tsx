// src/components/Navbar.tsx
import React from 'react';
import TranscriptsList from './VideoList';
// import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <TranscriptsList/>
        </div>
    );
}

export default Navbar;
