import { FaShieldAlt, FaClipboardCheck, FaCheck } from 'react-icons/fa';

export default function Pro4() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            RENOVO's Priorities in Safety and Quality
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            RENOVO subjects its approved local suppliers to a thorough evaluation process, including comprehensive background checks, ensuring that all suppliers are duly authorized and insured to meet its rigorous standards. It also ensures that the necessary permits and inspections are obtained for each project. Finally, RENOVO is committed to guaranteeing all work performed, from start to finish on any project.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-sm bg-slate-100">
            <FaShieldAlt className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold text-center">Thorough Supplier Evaluation</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Comprehensive background checks and assurance that all suppliers are duly authorized and insured.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-sm bg-slate-100">
            <FaClipboardCheck className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold text-center">Permits and Inspections</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              RENOVO ensures that all necessary permits and inspections are obtained for each project.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-sm bg-slate-100">
            <FaCheck className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold text-center">Work Guarantee</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              RENOVO is committed to guaranteeing all work performed, from start to finish on any project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
