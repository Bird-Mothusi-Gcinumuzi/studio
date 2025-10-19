import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary p-2 rounded-lg">
        <Leaf className="h-5 w-5 text-primary-foreground" />
      </div>
      {!iconOnly && (
         <span className="text-xl font-headline font-bold">Verdant Vista</span>
      )}
    </div>
  );
}
