import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              'w-full bg-primary border-b-2 px-4 py-3 text-white appearance-none cursor-pointer',
              'transition-all duration-300 focus:outline-none',
              error
                ? 'border-error focus:border-error'
                : 'border-gray-600 focus:border-accent',
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
