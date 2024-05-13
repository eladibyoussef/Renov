

export default function Pro4() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
              Priorités de RENOVO en matière de sécurité et de qualité
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              RENOVO soumet ses fournisseurs agréés locaux à un processus d'évaluation approfondi, incluant des
              vérifications approfondies des antécédents, une assurance que tous les fournisseurs sont dûment autorisés et
              assurés pour répondre à ses normes rigoureuses. Elle s'assure également que les permis et inspections
              nécessaires sont obtenus pour chaque projet. Enfin, RENOVO s'engage à garantir l'ensemble du travail
              effectué, du début à la fin de tout projet.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg  p-6 shadow-sm bg-slate-100">
              <ShieldCheckIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold text-center">Évaluation approfondie des fournisseurs</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Vérifications approfondies des antécédents et assurance que tous les fournisseurs sont dûment autorisés et
                assurés.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg  p-6 shadow-sm bg-slate-100">
              <ClipboardCheckIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold text-center">Permis et inspections</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                RENOVO s'assure que tous les permis et inspections nécessaires sont obtenus pour chaque projet.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg  p-6 shadow-sm bg-slate-100">
              <CheckIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold text-center">Garantie du travail</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                RENOVO s'engage à garantir l'ensemble du travail effectué, du début à la fin de tout projet.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  function CheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    )
  }
  
  
  function ClipboardCheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    )
  }
  
  
  function ShieldCheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
