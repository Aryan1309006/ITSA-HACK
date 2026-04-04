import { Link } from 'react-router-dom';

const ScenarioCard = ({ id, title, type, difficulty, description, icon, color, path, index }) => {
  const colorStyles = {
    cyan: 'from-cyan-500 via-blue-500 to-cyan-700',
    purple: 'from-purple-600 via-fuchsia-600 to-purple-700',
    green: 'from-emerald-500 via-teal-500 to-cyan-500',
    pink: 'from-pink-500 via-rose-500 to-fuchsia-500',
  };

  return (
    <Link
      to={path}
      className="group block rounded-[32px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${colorStyles[color] || colorStyles.cyan} text-2xl`}>
            {icon}
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{type}</p>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
          {difficulty}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-300 mb-6">{description}</p>

      <div className="flex items-center justify-between gap-4 text-sm text-cyan-200">
        <span className="font-medium">{index + 1}. Scenario</span>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-100 transition group-hover:bg-cyan-500/20">
          Start
        </span>
      </div>
    </Link>
  );
};

export default ScenarioCard;