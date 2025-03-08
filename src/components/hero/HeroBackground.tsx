
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <div className="absolute right-0 top-1/3 w-1/3 h-1/3 rounded-full bg-primary/20 filter blur-3xl"></div>
      <div className="absolute left-1/4 bottom-1/4 w-1/4 h-1/4 rounded-full bg-primary/10 filter blur-2xl"></div>
    </div>
  );
};

export default HeroBackground;
