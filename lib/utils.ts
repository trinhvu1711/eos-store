import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (
  pathName: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathName}${queryString}`;
};
