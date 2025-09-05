import { type FC, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface WarningProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Warning: FC<WarningProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg ${className}`}>
      <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-yellow-800 dark:text-yellow-200">
        {title && <p className="font-medium">{title}</p>}
        <div className={title ? "text-xs mt-1" : ""}>{children}</div>
      </div>
    </div>
  );
};

Warning.displayName = "Warning";

export default Warning;