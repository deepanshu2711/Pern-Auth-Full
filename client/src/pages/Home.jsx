import React from 'react';

export default function Home() {
  return (
    <div className='  mx-5 flex flex-col justify-top h-screen items-center gap-12'>
          <h1 className='text-3xl font-semibold mt-12'>Welcome to my Auth app</h1>
           <p className='p-12'>
        This is a full-stack web application built with the PERN (PostgresQL,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses PostgresQL as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
        </div>
    
  );
}