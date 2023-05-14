import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
    <nav className="bg-white border-gray-200  dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center">
          {/* <img
            src="https://cdn2.downdetector.com/static/uploads/logo/Dankmemer_logo.png"
            className="h-8 mr-3"
            alt="FunnyHub"
          /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HealthConnect
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 hover-underline-animation "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover-underline-animation "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover-underline-animation "
              >
                Services
              </a>
            </li>

            <li>
              {!isAuthenticated ? (
                <a
                  onClick={() => loginWithRedirect()}
                  href=""
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover-underline-animation   dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover-underline-animation "
                >
                  Login
                </a>
              ) : (
                <a
                  onClick={() => logout()}
                  href=""
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover-underline-animation   dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover-underline-animation "
                >
                  Logout
                </a>
              )}
            </li>
            <li>
              {isAuthenticated && (
                <div className="flex  gap-4 ">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.picture}
                    alt={user.name}
                  />
                  <p class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover-underline-animation  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover-underline-animation ">
                    {" "}
                    {user.name}{" "}
                  </p>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
     {/* <div>
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
         </div>
       </div>
     </section>
   </div> */}
    </div>
  );
};

export default Navbar;