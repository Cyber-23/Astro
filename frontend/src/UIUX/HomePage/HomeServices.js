import React, { useState } from "react";

const HomeServices = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category) => {
    setShowCard(category);
  };

  return (
    <>
      <section className="pt-10 pb-12 lg:pt-[50px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap ">
            <div className="w-full ">
              <div className="mx-auto mb-[60px] max-w-[480px] text-center">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  Our Services
                </span>
                <h2 className="text-dark mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
                  Our Recent Projects
                </h2>
                <p className="text-body-color text-base dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <section class="bg-white">
            <div class="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                <div class="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
                  <a
                    href=""
                    class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                  >
                    <img
                      src="p1.jpg"
                      alt=""
                      class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                      Service 1
                    </h3>
                  </a>
                </div>
                <div class="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
                  <a
                    href=""
                    class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
                  >
                    <img
                      src="p3.jpg"
                      alt=""
                      class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                      Service 1
                    </h3>
                  </a>
                  <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                    <a
                      href=""
                      class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                    >
                      <img
                        src="p2.jpg"
                        alt=""
                        class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                      <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                        Service 1
                      </h3>
                    </a>
                    <a
                      href=""
                      class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                    >
                      <img
                        src="p4.jpg"
                        alt=""
                        class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                      <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                        Service 1
                      </h3>
                    </a>
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
                  <a
                    href=""
                    class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                  >
                    <img
                      src="p5.jpg"
                      alt=""
                      class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                      Service 1
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default HomeServices;
