import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {
    const [messagesRecieved, setMessagesRecieved] = useState([]);

    // Whenever a socket event is fired on the server
    useEffect(() => {
        socket.on('get_message', (data) => {
            console.log(data);
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

    // Output the actual component
    return (
        <div className={styles.messageColumn}>
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