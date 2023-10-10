import axios from "axios";
import { useRouter } from "vue-router";
const Api = axios.create({
  baseURL: process.env.API_URL,
});
let device_id = localStorage.getItem("MachineId");
if (!device_id) {
  device_id = crypto.randomUUID();
  localStorage.setItem("MachineId", device_id);
}
const errorHandler = async (error: any) => {
  const router = useRouter();
  // const { logout } = useAuthStore();
  if (error.response) {
    const data = error.response.data;
    if (data.code === -102 || data.code === -4300 || data.code === -1003) {
      // await logout();
      window.location.reload();
      return;
    }
  }
  return Promise.reject(error);
};

Api.interceptors.request.use(async (config: any) => {
  // const { token, firebaseToken } = useAuthStore();
  // const accessToken = token;
  const device_info = {
    // firebase_token: firebaseToken,
    device_id: device_id,
    platform: "web",
  };
  // if (token) {
  //   config.headers["access-token"] = accessToken;
  // }
  config.headers["device-info"] = JSON.stringify(device_info);

  return config;
}, errorHandler);
Api.interceptors.response.use(function (response) {
  return response;
}, errorHandler);
export default Api;
