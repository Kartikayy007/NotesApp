import React, { useState } from 'react';
import Styles from './ai.module.css';
import axios from 'axios';

function AI() {
  const [chatOpen, setChatOpen] = useState(false);
  const [userMessage, messageUser] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [waiting, setWaiting] = useState(false);

  function toggleChat() {
    setChatOpen(!chatOpen);
  }

  function fixAIResponse(answer) {
    answer = answer.replace(/\*\*/g, '');
    answer = answer.replace(/##/g, '');
    answer = answer.replace(/\*/g, '');
    answer = answer.replace(/^\s*[\r\n]/gm, '');
    answer = answer.replace(/\n{3,}/g, '\n\n');
    return answer.trim();
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!userMessage.trim() || waiting) return;
    setChatHistory([...chatHistory, { who: 'user', text: userMessage }]);
    setWaiting(true);
    try {
      let aiReply = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`,
        method: 'POST',
        data: {
          contents: [
            {
              parts: [
                { text: userMessage }
              ]
            }
          ]
        }
      });
      let aiAnswer = aiReply.data.candidates[0].content.parts[0].text;
      let cleanAnswer = fixAIResponse(aiAnswer);
      setChatHistory([...chatHistory, { who: 'user', text: userMessage }, { who: 'ai', text: cleanAnswer }]);
    } catch (error) {
      setChatHistory([...chatHistory, { who: 'user', text: userMessage }, { who: 'ai', text: "Oops, something went wrong. Try again!" }]);
    } finally {
      setWaiting(false);
      messageUser('');
    }
  }

  function clearMsg() {
    setChatHistory([]);
  }

  return (
    <>
      <button className={Styles.AiButton} onClick={toggleChat}>
        <img src="/assets/AI.svg" alt="AI Chat" />
      </button>
      {chatOpen && (
        <div className={Styles.popup}>
          <div className={Styles.popupContent}>
            <div className={Styles.popupHeader}>
              <img src="/assets/AI.svg" alt="AI Avatar" className={Styles.aiAvatar} />
              <h2>Hey there! What can I do for you?</h2>
              <button className={Styles.closeButton} onClick={toggleChat}>×</button>
            </div>
            <div className={Styles.chatContainer}>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`${Styles.message} ${Styles[msg.who]}`}>
                  {msg.text}
                </div>
              ))}
              {waiting && <div className={Styles.message}>AI is thinking...</div>}
            </div>
            <div className={Styles.actionButtons}>
              <button onClick={clearMsg} className={Styles.actionButton}>Clear Chat</button>
            </div>
            <form onSubmit={sendMessage} className={Styles.inputForm}>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => messageUser(e.target.value)}
                placeholder="Type your message here..."
                className={Styles.input}
              />
              <button type="submit" className={Styles.sendButton} disabled={waiting}>
                {waiting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AI;