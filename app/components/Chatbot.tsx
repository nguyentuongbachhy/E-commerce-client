import { Bell, Bot, Send, X } from 'lucide-react';
import { marked } from 'marked';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  time: string;
  image_path?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Add welcome message when chat opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        type: 'bot',
        content: `Xin chào! Tôi là trợ lý AI của Tiki. Tôi có thể giúp bạn tìm kiếm sản phẩm, so sánh giá cả, phân tích xu hướng, hoặc đề xuất thời điểm tốt nhất để mua hàng.

Bạn có thể hỏi tôi:
- "Tìm điện thoại Samsung dưới 10 triệu"
- "So sánh sản phẩm số 1 và số 2"
- "Phân tích giá laptop"
- "Khi nào nên mua sản phẩm này?"

Bạn cần giúp đỡ gì hôm nay?`,
        time: getCurrentTime()
      };

      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatBodyRef.current && isOpen) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: inputValue,
      time: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    try {
      // Simulate response delay
      setTimeout(() => {
        setIsTyping(false);

        // Add bot response
        const botResponse: Message = {
          type: 'bot',
          content: `Hiện tại tôi đang trong giai đoạn phát triển nên thông tin có thể chưa đầy đủ. Bạn có thể hỏi thêm về sản phẩm khác không?`,
          time: getCurrentTime()
        };

        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    } catch (error) {
      setIsTyping(false);

      // Handle error
      const errorMessage: Message = {
        type: 'bot',
        content: 'Xin lỗi, đã xảy ra lỗi khi xử lý tin nhắn của bạn. Vui lòng thử lại sau.',
        time: getCurrentTime()
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {/* Chatbot and Notification Icons */}
      <div className="w-full flex flex-col bg-black shadow-[rgba(0,0,0,0.2)_0px_4px_16px_0px] rounded-md">
        <div
          className="p-4 flex flex-col items-center cursor-pointer"
          onClick={toggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={isHovered || isOpen ? "animate-rotate-once" : "animate-wiggle"}>
            <Bot className="w-8 h-8" stroke={isHovered || isOpen ? "cyan" : "white"} />
          </div>
          <p className={`font-bold mt-1 text-sm ${isHovered || isOpen ? "text-cyan-300" : "text-white"}`}>Chatbot</p>
        </div>

        <div className="w-full h-0.5 bg-gray-800" />

        <div className="p-4 flex flex-col items-center cursor-pointer">
          <Bell className="w-8 h-8" stroke="white" />
          <p className="font-bold text-white mt-1 text-sm">Notifications</p>
        </div>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <>
          <div className="fixed right-30 bottom-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col max-h-[80vh]">
              <div className="chat-header space-x-2">
                <Bot width={32} height={32} />
                <h4 className="mb-0 font-bold">Trợ lý AI Phân tích Sản phẩm</h4>
                <div className="ml-auto">
                  <button className="p-1 rounded hover:bg-blue-700 cursor-pointer" onClick={toggleChat}>
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              <div className="chat-body" ref={chatBodyRef}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="markdown-content"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(message.content)
                      }}
                    />
                    {message.image_path && (
                      <img
                        src={message.image_path}
                        alt="Biểu đồ phân tích"
                        className="message-image"
                        onClick={() => window.open(message.image_path, '_blank')}
                      />
                    )}
                    <div className="message-time">
                      <span>{message.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                )}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  id="userInput"
                  placeholder="Nhập tin nhắn của bạn..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
                <button id="sendButton" onClick={handleSendMessage}>
                  <Send />
                </button>
              </div>
            </div>
          </div>
          <div className="fixed right-30 bottom-15 z-51 w-0 h-0
                  border-t-[12px] border-t-transparent
                  border-l-[18px] border-l-black
                  border-b-[12px] border-b-transparent">
          </div>
        </>
      )}

      {/* CSS for animations and chat styles */}
      <style>{`
        @keyframes wiggle {
            0% { transform: rotate(-10deg); }
            25% { transform: rotate(10deg); }
            50% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
            100% { transform: rotate(-10deg); }
        }
        
        @keyframes rotateOnce {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .animate-wiggle {
            animation: wiggle 1.5s ease-in-out infinite;
        }

        .animate-rotate-once {
            animation: rotateOnce 0.7s ease-in-out forwards;
        }

        .chat-header {
          background-color: #1a94ff;
          color: white;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .chat-header img {
          height: 40px;
          margin-right: 15px;
        }

        .chat-body {
          height: 400px;
          overflow-y: auto;
          padding: 20px;
          background-color: #f8f9fa;
        }

        .chat-input {
          padding: 15px 20px;
          background-color: #f1f1f1;
          display: flex;
          align-items: center;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        .chat-input input {
          flex: 1;
          padding: 12px 15px;
          border: none;
          border-radius: 30px;
          margin-right: 10px;
          font-size: 16px;
        }

        .chat-input button {
          background-color: #1a94ff;
          color: white;
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-input button:hover {
          background-color: #0d7ad9;
        }

        .message {
          margin-bottom: 20px;
          max-width: 80%;
        }

        .user-message {
          margin-left: auto;
          background-color: #e3f2fd;
          border-radius: 18px 18px 0 18px;
          padding: 12px 15px;
        }

        .bot-message {
          margin-right: auto;
          background-color: #f1f1f1;
          border-radius: 18px 18px 18px 0;
          padding: 12px 15px;
        }

        .message-image {
          max-width: 100%;
          max-height: 300px;
          margin-top: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .typing-indicator {
          display: flex;
          margin-right: auto;
          background-color: #f1f1f1;
          border-radius: 18px 18px 18px 0;
          padding: 12px 15px;
          width: 70px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #888;
          border-radius: 50%;
          margin: 0 3px;
          animation: typing 1s infinite ease-in-out;
        }

        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .message-time {
          font-size: 12px;
          color: #888;
          margin-top: 5px;
          text-align: right;
        }

        .markdown-content {
          white-space: pre-wrap;
        }

        .markdown-content p {
          margin-bottom: 12px;
        }

        .markdown-content ul,
        .markdown-content ol {
          padding-left: 20px;
          margin-bottom: 12px;
        }

        .markdown-content code {
          background-color: #f7f7f7;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: monospace;
        }

        @media (max-width: 768px) {
          .chat-body {
            height: 350px;
          }

          .message {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;