import { problems } from "@/lib/landing-data";

export function ProblemSection() {
  return (
    <section id="problem" className="ur-section bg-ur-page">
      <div className="ur-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] text-ur-navy sm:text-4xl">
            The Rental Scam Problem
          </h2>
          <p className="mt-3 text-base text-ur-text-secondary">
            Thousands lose money every day to fake agents, fake listings, unsafe
            payments, and broken promises.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <div key={problem.title} className="ur-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ur-primary/10 text-ur-primary">
                <problem.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-ur-navy">{problem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ur-text-secondary">{problem.description}</p>
              <p className="mt-3 text-xs font-semibold text-ur-error">{problem.footnote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
