export const getFormattedDate = (dateTime: string) => {
  const formattedDate = new Date(dateTime).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export const getFormattedTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
};
