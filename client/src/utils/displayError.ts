import { AxiosError } from "axios";

export const getErrorMessage = (error: any) => {
  return (
    (((error as AxiosError).response?.data as { message: string })
      ?.message as string) ||
    (error as AxiosError)?.message ||
    "Something went wrong"
  );
};
