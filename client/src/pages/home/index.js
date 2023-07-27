import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('get_rooms', (data) => {
            setRooms((state) => [
                ...state,
                [],
            ])
        })

        
        // Remove Listener
        return () => socket.off('get_rooms');
    }, [socket]);

    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }

        navigate('/chat', { replace: true });
    };

    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>{`Speak-EZ`}</h1>
                <input 
                    className={styles.input} 
                    placeholder='Username' 
                    onChange={(e)=> setUsername(e.target.value)}
                />

                <select 
                    className={styles.input}
                    onChange={(e)=> setRoom(e.target.value)}
                >
                    <option>-- Get a Room --</option>
                    <option value='Froths Den'>Froths Den</option>
                    <option value='The Crapper'>The Crapper</option>
                    {rooms.map((room) => {
                        <option value={room}>{room}</option>
                    })}

                </select>

                <button 
                    className={`btn btn-secondary ${styles.joinBtn}`} 
                    onClick={joinRoom}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default Home;