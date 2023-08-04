import Cookies from "js-cookie";

export const useHandleToken = () => {
  const setToken = (jwt: string) => {
    Cookies.set("jwt", jwt);
  };

  const removeToken = () => {
    Cookies.remove("jwt");
  };

  const isTokenSet = () => {
    const jwt = Cookies.get("jwt");

    if (jwt !== undefined) return true;
    return false;
  };

  const getToken = () => {
    return Cookies.get("jwt");
  };

  return { setToken, removeToken, isTokenSet, getToken };
};
