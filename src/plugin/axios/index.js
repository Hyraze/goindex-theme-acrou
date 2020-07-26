import axios from "axios";
import store from "@/store";
import notify from "@/components/notification";

// Create axios Instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API ? process.env.VUE_APP_API : "",
  //   timeout: 30000,
});

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // Send request settings cancel token
    config.cancelToken = new axios.CancelToken((cancel) => {
      store.dispatch("acrou/cancelToken/push", cancel);
    });
    return config;
  },
  (error) => {
    // Failed to send
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          error.message = "error.401";
          notify({
            title: "notify.title",
            message: error.message,
            type: "error",
            duration: 5 * 1000,
          });
          break;
        default:
          console.log(error);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default service;
