import React from 'react';

function Layout() {
  return (
    <div className="home-layout">
      <section className="hero">
        <h1>Welcome to ALLEN Career Institute</h1>
        <p>Your trusted partner for IIT-JEE, NEET, Olympiads, and more!</p>
        <img src="https://www.allen.ac.in/images/home-banner.jpg" alt="ALLEN Students" className="hero-img" />
      </section>
      <section className="about">
        <h2>About ALLEN</h2>
        <p>ALLEN is India’s leading coaching institute for competitive exams, helping students achieve their dreams since 1988.</p>
      </section>
    </div>
  )
}

export default Layout