import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room  }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message !=='') {
            const __createdTime__ = Date.now();

            // Send the message to the server
            socket.emit('send_message', {
                username,
                room,
                message,
                __createdTime__
            });
            setMessage('');
        }
    };

    return (
        <div className={styles.sendMessageContainer}>
            <input 
                className={styles.messageInput}
                placeholder='Message...'
                onChange={(e) => setMessage(e.target.value)}
                value={message} 
            />
            <button 
                className='btn btn-primary'
                onClick={sendMessage} 
            >
                Send
            </button>
        </div>
    );
};

export default SendMessage;