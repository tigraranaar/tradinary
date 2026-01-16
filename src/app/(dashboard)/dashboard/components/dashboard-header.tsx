export function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text pb-2 text-4xl font-bold text-transparent">
        Trading Signals Dashboard
      </h1>
      <p className="text-white/60">{"Select your trading pair and timeframe to analyze"}</p>
    </div>
  );
}
