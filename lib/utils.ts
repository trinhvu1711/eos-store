import { ReadonlyURLSearchParams } from "next/navigation";
import { User } from "./type";

export const createUrl = (
  pathName: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathName}${queryString}`;
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUserDetails = (): User | null => {
  const userDetails = localStorage.getItem("userDetails");
  return userDetails ? JSON.parse(userDetails) : null;
};

export const clearUserData = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDetails");
};
