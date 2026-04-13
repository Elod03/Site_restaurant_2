import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full bg-transparent border-b-2 px-4 py-3 text-white placeholder-gray-500',
            'transition-all duration-300 focus:outline-none',
            error
              ? 'border-error focus:border-error'
              : 'border-gray-600 focus:border-accent',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
