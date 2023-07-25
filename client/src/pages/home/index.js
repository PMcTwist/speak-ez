import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();

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
                    <option value='1'>Room 1</option>
                    <option value='2'>Room 2</option>
                </select>

                <button 
                    className='btn btn-secondary' 
                    id={styles.joinBtn}
                    onClick={joinRoom}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default Home;