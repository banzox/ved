export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative">
        {/* Animated outer ring */}
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Center pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
