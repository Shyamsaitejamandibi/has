import { cn } from "@/lib/utils";
interface StatusBadgeProps {
  status: "OPEN" | "CLOSED";
  className?: string;
}
const statusConfig = {
  OPEN: "bg-green-100 text-green-600 border-green-300",
  CLOSED: "bg-gray-100 text-gray-600 border-gray-300",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium border animate-fadeIn",
        statusConfig[status],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
