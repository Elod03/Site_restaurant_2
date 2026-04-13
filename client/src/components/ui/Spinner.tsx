import { cn } from '@/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'border-2 border-accent/30 border-t-accent rounded-full animate-spin',
          sizes[size]
        )}
      />
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-2 border-accent/10 border-b-accent/10 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-display text-gradient mb-2">L'Imperial</h2>
          <p className="text-gray-400 font-sans text-sm tracking-widest">加载中...</p>
        </div>
      </div>
    </div>
  );
}
