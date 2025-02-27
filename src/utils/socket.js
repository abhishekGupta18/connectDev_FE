import io from "socket.io-client";
import { baseURL } from "./constant";

export const createSocketConnection = () => {
  return io(baseURL);
};
