import React from 'react';
import VideoList from './VideoList';

interface NavbarProps {
    handleSelectChange: (id: number) => void;
}
const Navbar: React.FC <NavbarProps>= ({handleSelectChange}) => {
    return (
        <div className="navbar">
            <VideoList handleSelectChange={handleSelectChange}/>
        </div>
    );
}

export default Navbar;
