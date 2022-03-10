import React from "react";
import { Link } from "react-router-dom";
import statistics from "../../assets/images/statistics.svg";
import screenshotH1 from "../../assets/images/screenshotH1.png";

const Main = () => {
  return (
    <div>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column bg-dark text-light p-5">
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={statistics}
                className="d-block mx-lg-auto img-fluid"
                alt="main pic"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3 text-start">
                Achieve Your Goals
              </h1>
              <p className="lead text-start">
                With Iron Money, take charge of your spending with our
                easy-to-use expense tracking tools. Create a budget, add
                transactions, and view your spending habits.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link
                  to="/signup"
                  className="text-decoration-none text-light btn btn-success btn-lg px-4 me-md-2"
                >
                  Sign up
                </Link>
                <a
                  href="#learn"
                  className="text-decoration-none text-light btn btn-secondary btn-lg px-4"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 py-5">
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col" id="learn">
            <div className="feature-icon">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5em"
                  height="5em"
                  fill="white"
                  className="bi bi-journal-text bg-success bg-gradient p-3 rounded float-start"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                </svg>
              </div>
              <h2 className="text-start py-3">Budget</h2>
              <p className="text-start">
                Use our budget creation guide to help you get started. Set
                individual targets for several of the most common budget
                categories.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="feature-icon">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5em"
                  height="5em"
                  fill="white"
                  className="bi bi-journal-text bg-success bg-gradient p-3 rounded float-start"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                  />
                  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                </svg>
              </div>
              <h2 className="text-start py-3">Track</h2>
              <p className="text-start">
                Adding transaction details is quick and easy. Track your
                spending categories and keep track of your budget in real time.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="feature-icon">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5em"
                  height="5em"
                  fill="white"
                  className="bi bi-journal-text bg-success bg-gradient p-3 rounded float-start"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z" />
                </svg>
              </div>
              <h2 className="text-start py-3">At-A-Glance</h2>
              <p className="text-start">
                Stay on top of your goals with at-a-glance views of income,
                expenses, recent transaction history, and progress towards your
                goals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="cover-container py-3 bg-dark text-light">
        <div className="row container col-xxl-8 mx-auto p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-5 fw-bold lh-1 mb-3 text-start">
              Border hero with cropped image and shadows
            </h1>
            <p className="lead text-start">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                to="/signup"
                className="text-decoration-none text-light btn btn-success btn-lg px-4 me-md-2"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img
              className="rounded-lg-3"
              src={screenshotH1}
              alt="example budget"
              width="720"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
