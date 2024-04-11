import React from "react";

export default function FeaturesArea() {
  return (
    <section className="pb-5 pt-20 ">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <FeatureCard
              title="Free Shipping"
              description="Free Shipping for orders over $120"
              iconPath={
                <svg
                  className="transition-all ease-in-out hover:scale-110 "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.1228 16.2654L16.2678 3.12036"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M11.0115 18.9054L12.3315 17.5854"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M13.9724 15.9461L16.6014 13.3171"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M2.7614 10.0613L10.0654 2.75729C12.3974 0.425289 13.5634 0.414289 15.8734 2.72429L21.2744 8.12529C23.5844 10.4353 23.5734 11.6013 21.2414 13.9333L13.9374 21.2373C11.6054 23.5693 10.4394 23.5803 8.12939 21.2703L2.7284 15.8693C0.418397 13.5593 0.418397 12.4043 2.7614 10.0613Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1 22.9968H23"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              }
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <FeatureCard
              title="Refund"
              description="Within 30 days for an exchange."
              iconPath={
                <svg
                  className="transition-all ease-in-out hover:scale-110 "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33972 14.5628C8.33972 15.9818 9.42872 17.1258 10.7817 17.1258H13.5427C14.7197 17.1258 15.6767 16.1248 15.6767 14.8928C15.6767 13.5508 15.0937 13.0778 14.2247 12.7698L9.79172 11.2298C8.92272 10.9218 8.33972 10.4488 8.33972 9.10678C8.33972 7.87478 9.29672 6.87378 10.4737 6.87378H13.2347C14.5877 6.87378 15.6767 8.01778 15.6767 9.43678"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 5.40039V18.6004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              }
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <FeatureCard
              title="Support"
              description="24 hours a day, 7 days a week"
              iconPath={
                <svg
                  className="transition-all ease-in-out hover:scale-110 "
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.47 15.83L17.86 18.99C17.96 19.82 17.07 20.4 16.36 19.97L12.17 17.48C11.71 17.48 11.26 17.45 10.82 17.39C11.56 16.52 12 15.42 12 14.23C12 11.39 9.54003 9.09003 6.50003 9.09003C5.34003 9.09003 4.27004 9.42 3.38004 10C3.35004 9.75 3.34003 9.49999 3.34003 9.23999C3.34003 4.68999 7.29003 1 12.17 1C17.05 1 21 4.68999 21 9.23999C21 11.94 19.61 14.33 17.47 15.83Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 14.2298C12 15.4198 11.56 16.5198 10.82 17.3898C9.83001 18.5898 8.26 19.3598 6.5 19.3598L3.89 20.9098C3.45 21.1798 2.89 20.8098 2.95 20.2998L3.2 18.3298C1.86 17.3998 1 15.9098 1 14.2298C1 12.4698 1.94 10.9198 3.38 9.99982C4.27 9.41982 5.34 9.08984 6.5 9.08984C9.54 9.08984 12 11.3898 12 14.2298Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              }
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <FeatureCard
              title="Payment"
              description="Pay with Multiple Credit Cards"
              iconPath={
                <svg
                  className="transition-all ease-in-out hover:scale-110 "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.1228 16.2654L16.2678 3.12036"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.0115 18.9054L12.3315 17.5854"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.9724 15.9461L16.6014 13.3171"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M2.7614 10.0613L10.0654 2.75729C12.3974 0.425289 13.5634 0.414289 15.8734 2.72429L21.2744 8.12529C23.5844 10.4353 23.5734 11.6013 21.2414 13.9333L13.9374 21.2373C11.6054 23.5693 10.4394 23.5803 8.12939 21.2703L2.7284 15.8693C0.418397 13.5593 0.418397 12.4043 2.7614 10.0613Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1 22.9968H23"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  title,
  description,
  iconPath,
}: {
  title: string;
  description: string;
  iconPath: React.ReactNode;
}) => (
  <div className="mb-10 flex items-start">
    <span className="mr-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 text-center leading-[58px] dark:text-white">
      {iconPath}
    </span>

    <div className="dark:text-white">
      <h3 className="mb-1.5 text-lg font-medium ">{title}</h3>
      <p className="text-sm leading-snug">{description}</p>
    </div>
  </div>
);
