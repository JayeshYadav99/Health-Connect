import React from "react";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url('')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome to HealthConnect
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          HealthConnect is a comprehensive web application that leverages AI, MongoDB Atlas, GitHub, and the Microsoft Cloud to create a platform for community health engagement and education. It aims to provide personalized health recommendations, research collaboration tools, and educational resources to improve access to healthcare and promote well-being.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              to="/Main"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Lets Connect
            </Link>
            <Link
              to="/Github"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Lets Collaborate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;