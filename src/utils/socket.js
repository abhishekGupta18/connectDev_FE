import io from "socket.io-client";
import { baseURL } from "./constant";

export const createSocketConnection = () => {
  if (location.hostname == "localhost") {
    return io(baseURL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
