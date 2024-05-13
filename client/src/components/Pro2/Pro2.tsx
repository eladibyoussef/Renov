

export default function Pro2() {
    return (
      <div className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
        <div className="border-t-2 border-gray-300 pt-2">
          <h2 className="text-3xl font-bold sm:text-3xl md:text-3xl mt-4">
             What happens Next?
          </h2>
        </div>
          <div className="grid grid-cols-2 gap-4 mt-8 sm:gap-6 md:gap-8">
            <div className="bg-gray-100 rounded-lg p-6 ">
              <div className="text-2xl font-semibold">1</div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
              Our licensed, local plumber in your area will call you soon to schedule your repair
              appointment.       
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 ">
              <div className="text-2xl font-semibold">2</div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
              During the repair appointment, we will conduct a thorough assessment of your
              plumbing problem, offer solutions, and provide a quote.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 ">
              <div className="text-2xl font-semibold">3</div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
              You can choose to proceed with the repair or decline the repair. Repairs can
              often be performed on the spot unless additional parts are required.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 ">
              <div className="text-2xl font-semibold">4</div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
              After the repair is complete, we will review product and service warranties
              with you.              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }