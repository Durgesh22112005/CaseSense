import React from "react";

interface StatusBadgeProps {
  status: "Pending" | "Under Process" | "Disposed" | "Transferred" | "Escalated" | string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-300";
      case "Under Process":
        return "bg-blue-50 text-blue-800 border-blue-300";
      case "Disposed":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "Transferred":
        return "bg-purple-50 text-purple-800 border-purple-300";
      case "Escalated":
        return "bg-red-50 text-red-800 border-red-300 font-semibold";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getDotColor = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-500";
      case "Under Process":
        return "bg-blue-600";
      case "Disposed":
        return "bg-emerald-600";
      case "Transferred":
        return "bg-purple-600";
      case "Escalated":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border ${pad} font-medium tracking-wide ${getBadgeStyle()}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${getDotColor()}`} />
      {status}
    </span>
  );
};
