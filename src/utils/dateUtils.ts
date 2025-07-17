export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const formatTime = (time: string): string => {
  return time;
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const isDateInRange = (date: string, startDate?: string, endDate?: string): boolean => {
  const targetDate = new Date(date);
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && targetDate < start) return false;
  if (end && targetDate > end) return false;
  return true;
};