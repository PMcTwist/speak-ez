import styles from './styles.module.css';

// Import our components
import MessagesReceived from './messages';
import SendMessage from './send-message';

const Chat = ({ username, room, socket }) => {
    return (
        <div className={styles.chatContainer}>
            <div>
                <MessagesReceived 
                    socket={socket} 
                />
                <SendMessage 
                    socket={socket} 
                    username={username}
                    room={room}
                />
            </div>
        </div>
    );
};

export default Chat;