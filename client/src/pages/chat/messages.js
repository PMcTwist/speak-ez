import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket }) => {
    const [messagesRecieved, setMessagesRecieved] = useState([]);

    const messagesColumnRef = useRef(null);

    // Whenever a socket event is fired on the server
    useEffect(() => {
        socket.on('get_message', (data) => {
            setMessagesRecieved((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdTime__: data.__createdTime__,
                },
            ])
        })

        // Remove Listener
        return () => socket.off('get_message');
    }, [socket]);

    function formatDataFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    // Grab the pass 100 messages and sort them by date
    useEffect(() => {
        socket.on('last_100_messages', (last100Messages) => {
            last100Messages = JSON.parse(last100Messages);
            
            // Sort the messages by time created
            last100Messages = sortMessagesByDate(last100Messages);
            setMessagesRecieved((state)  => [...last100Messages, ...state])
        });

        return () => socket.off('last_100_messages');
    }, [socket]);

    // Scroll to the newst message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
        messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    // Sort by date function
    function sortMessagesByDate(messages) {
        return messages.sort(
            (a, b) => parseInt(a.__createdTime__) - (b.__createdTime__)
        );
    }

    // Output the actual component
    return (
        <div className={styles.messageColumn} ref={messagesColumnRef}>
            {messagesRecieved.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div className={styles.msgMetaContainer}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                            {formatDataFromTimestamp(msg.__createdTime__)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    )

};

export default Messages