// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";
// import { useNavigate } from "react-router-dom";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   console.log("authUser = ", authUser);

//   const messageEndRef = useRef(null);

//   const navigate = useNavigate(); // Add this hook

//   // Redirect to login if authUser is null
//   useEffect(() => {
//     console.log("authUser = ", authUser);
//     if (!authUser) {
//       navigate("/login-page");
//     }
//   }, [authUser, navigate]);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     // subscribeToMessages();
//     if (selectedUser) {
//       subscribeToMessages();
//     }


//     return () => unsubscribeFromMessages();
//   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//           >
//             <div className="chat-bubble relative  my-1 px-3">
//               {/* Text/Image Content */}
//               <div className="px-2">
//                 {message.image && (
//                   <img
//                     src={message.image}
//                     alt="Attachment"
//                     className="sm:max-w-[200px] rounded-md mb-3"
//                   />
//                 )}
//                 {message.text && <p className=" mb-2">{message.text}</p>}
//               </div>

//               {/* Timestamp at Bottom-Right */}
//               <time className="absolute bottom-1 right-2 text-xs opacity-50 pt-2">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//           </div>


//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
// export default ChatContainer;








import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  // Redirect to login if authUser is null
  useEffect(() => {
    if (!authUser) {
      navigate("/login-page");
    }
  }, [authUser, navigate]);

  // Fetch messages and subscribe to new messages
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    // Cleanup on unmount or when selectedUser changes
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble relative my-1 px-3">
              <div className="px-2">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-3"
                  />
                )}
                {message.text && <p className="mb-2">{message.text}</p>}
              </div>
              <time className="absolute bottom-1 right-2 text-xs opacity-50 pt-2">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;