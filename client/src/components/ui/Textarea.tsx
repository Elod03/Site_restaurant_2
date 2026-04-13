import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full bg-transparent border-b-2 px-4 py-3 text-white placeholder-gray-500',
            'transition-all duration-300 focus:outline-none resize-none',
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

Textarea.displayName = 'Textarea';

export default Textarea;
