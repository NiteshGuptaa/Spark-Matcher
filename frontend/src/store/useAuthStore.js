// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";
// import { useSelector } from "react-redux";


// // const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:7777" : "/";
// import { BASE_URL } from "../utils/constants.js";



// // const user = useSelector(store => store.user);

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,
//   onlineUsers: [],
//   socket: null,

//   setAuthUser: (userData) => set({ authUser: userData }),


//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");

//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (error) {
//       console.log("Error in checkAuth:", error);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   // signup: async (data) => {
//   //   set({ isSigningUp: true });
//   //   try {
//   //     const res = await axiosInstance.post("/auth/signup", data);
//   //     set({ authUser: res.data });
//   //     toast.success("Account created successfully")
//   //     get().connectSocket();
//   //   } catch (error) {
//   //     toast.error(error.response.data.message);
//   //   } finally {
//   //     set({ isSigningUp: false });
//   //   }
//   // },

//   // login: async (data) => {
//   //   set({ isLoggingIn: true });
//   //   try {
//   //     const res = await axiosInstance.post("/auth/login", data);
//   //     set({ authUser: res.data });
//   //     toast.success("Logged in successfully");

//   //     get().connectSocket();
//   //   } catch (error) {
//   //     toast.error(error.response.data.message);
//   //   } finally {
//   //     set({ isLoggingIn: false });
//   //   }
//   // },

//   // logout: async () => {
//   //   try {
//   //     await axiosInstance.post("/auth/logout");
//   //     set({ authUser: null });
//   //     toast.success("Logged out successfully");
//   //     get().disconnectSocket();
//   //   } catch (error) {
//   //     toast.error(error.response.data.message);
//   //   }
//   // },

//   // updateProfile: async (data) => {
//   //   set({ isUpdatingProfile: true });
//   //   try {
//   //     const res = await axiosInstance.put("/auth/update-profile", data);
//   //     set({ authUser: res.data });
//   //     toast.success("Profile updated successfully");
//   //   } catch (error) {
//   //     console.log("error in update profile:", error);
//   //     toast.error(error.response.data.message);
//   //   } finally {
//   //     set({ isUpdatingProfile: false });
//   //   }
//   // },

//   connectSocket: () => {
//     const { authUser } = get();
//     console.log("authUser hai ya nai connectSocket() se bol rha= ", authUser)
//     if (!authUser || get().socket?.connected) return;

//     console.log("now socket ko connet kar rah")
//     const socket = io(BASE_URL, {
//       query: {
//         userId: authUser._id,
//       },
//     });
//     console.log("connectSocket() se,  socket = ", socket);
//     socket.connect();
//     console.log("connectSocket() se, socket.connect() is just called")

//     set({ socket: socket });

//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },
//   disconnectSocket: () => {
//     console.log("disconnectSocket () get called")
//     if (get().socket?.connected) get().socket.disconnect();
//   },
// }));














import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Retrieve from localStorage
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  setAuthUser: (userData) => {
    console.log("setAuthUser() se bol rha, userData = ", userData);
    localStorage.setItem("authUser", JSON.stringify(userData)); // Save to localStorage
    set({ authUser: userData });
    console.log(localStorage.getItem("authUser"));
    // console.log("setAuthUser() se bol rha, authUser = ", authUser);
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("checkAuth() se bol rha,  checkAuth res.data = ", res.data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Save to localStorage
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
      localStorage.removeItem("authUser"); // Clear localStorage on error
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log("Connecting socket...");

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket });

    console.log("socket conncted")

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));