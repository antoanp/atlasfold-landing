import { cn } from '@/lib/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors rounded-full';

  const variants = {
    primary: 'bg-cta text-white hover:bg-cta/90',
    secondary: 'bg-white text-text-primary border border-gray-200 hover:bg-gray-50',
    outline: 'border border-gray-200 text-text-primary hover:bg-gray-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
