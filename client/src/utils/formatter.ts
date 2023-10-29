import { Dayjs } from "dayjs";

export const getFormattedDate = (dateTime: string) => {
    const formattedDate = new Date(dateTime).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    });
   return formattedDate;
}

export const getFormattedTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    console.log
    return formattedTime;
}

export const getFormattedDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDateTime = date.toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return formattedDateTime;
}


export const getQueredDateTime = (date: Dayjs | null | undefined, time: Dayjs | null | undefined) => {
  const dateStr = date ? date.format('YYYY-MM-DD') : '';
  const timeStr = time ? `T${time.format('HH:mm')}` : '';
  return`${dateStr}${timeStr}`;
}