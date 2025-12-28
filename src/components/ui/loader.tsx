interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ message, size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div
          className={`animate-spin rounded-full border-b-2 border-primary mx-auto mb-4 ${sizeClasses[size]}`}
        ></div>
        {message && (
          <p className="text-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}
