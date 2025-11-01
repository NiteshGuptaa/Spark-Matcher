import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const ChatHomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-7rem)]">
          
          {/* Desktop Layout */}
          <div className="hidden md:flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden h-full rounded-lg overflow-hidden">
            {selectedUser ? <ChatContainer /> : <Sidebar />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHomePage;
