export default function HeroSection() {
  return (
    <>
      <section className=" herobg">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="lg:mt-0 lg:hidden block  lg:col-span-4 lg:flex">
            <img
              src="circle.png"
              alt="mockup"
              className="App-logo"
            />
          </div>

          <div className="m-auto place-self-center lg:pt-4 lg:col-span-8">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-100">
            Astrological Solutions for a Better Tomorrow
            </h1>
            <p className="max-w-2xl mb-6 font-semibold text-white lg:mb-8 md:text-lg lg:text-xl text-gray-600">
            Personalized Horoscopes, Astrology Readings, and More
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:ring-primary-900"
            >
              Call to Action
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:ring-primary-900"
            >
               Chat Now
            </a>
          </div>


          <div className="lg:mt-0 lg:block hidden  lg:col-span-4 lg:flex">
            <img
              src="circle.png"
              alt="mockup"
              className="App-logo"
            />
          </div>
        </div>
      </section>
    </>
  );
}
