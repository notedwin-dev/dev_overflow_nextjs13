import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${years > 1 ? "years" : "year"} ago`;
  } else if (months > 0) {
    return `${months} ${months > 1 ? "months" : "month"} ago`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks > 1 ? "weeks" : "week"} ago`;
  } else if (days > 1) {
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  } else if (hours > 1) {
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else if (minutes > 1) {
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  } else if (seconds > 1) {
    return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
  } else {
    return "just now";
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    if (num % 1_000_000_000 === 0) {
      return `${(num / 1_000_000_000).toFixed(0)}B`;
    } else if (num % 100_000_000 === 0) {
      return `${(num / 1_000_000_000).toFixed(1)}B`;
    } else {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    }
  } else if (num >= 1_000_000) {
    return num % 1_000_000 === 0
      ? `${(num / 1_000_000).toFixed(0)}M`
      : num % 100_000 === 0
      ? `${(num / 1_000_000).toFixed(1)}M`
      : `${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return num % 1_000 === 0
      ? `${(num / 1_000).toFixed(0)}K`
      : num % 100 === 0
      ? `${(num / 1_000).toFixed(1)}K`
      : `${(num / 1_000).toFixed(2)}K`;
  } else {
    return num.toString();
  }
};
