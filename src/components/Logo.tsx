import { Wrench } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
        <Wrench className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold tracking-tight text-white">
        CARs <span className="text-blue-400">IN</span>
      </span>
    </div>
  );
}
