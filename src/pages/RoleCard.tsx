interface RoleCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const RoleCard = ({ title, description, onClick }: RoleCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer rounded-2xl p-8 sm:p-10
        bg-gradient-to-br from-slate-800/70 to-slate-900/70
        backdrop-blur-lg
        border border-white/10
        shadow-lg
        transition-all duration-300
        hover:-translate-y-2 hover:scale-105
        hover:shadow-2xl
      "
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-4">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default RoleCard;
