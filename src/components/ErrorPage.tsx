// ErrorPage.tsx
import React from 'react';

interface ErrorPageProps {
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className='container'>
      <h1 className='heading'>Oops! Something went wrong.</h1>
      <p className='message'>{message ?? ''}</p>
    </div>
  );
};

export default ErrorPage;
