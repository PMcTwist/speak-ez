import styles from './styles.module.css'

const Home = () => {
    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>{`Speak-EZ`}</h1>
                <input className={styles.input} placeholder='Username' />

                <select className={styles.input}>
                    <option>-- Get a Room --</option>
                    <option value='1'>Room 1</option>
                    <option value='2'>Room 2</option>
                </select>

                <button className='btn btn-secondary' id={styles.joinBtn}>Join Room</button>
            </div>
        </div>
    );
};

export default Home;