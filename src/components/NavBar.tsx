import React from 'react';
import VideoList from './VideoList';

interface NavbarProps {
    handleSelectChange: (id: number) => void;
}
const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <VideoList />
        </div>
    );
}

export default Navbar;
