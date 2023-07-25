import styles from './styles.module.css'

export default Home = () => {
    return(
        <div className='styles.container'>
            <div className='styles.formContainer'>
                <h1 className='title'>{`Speak-EZ`}</h1>
                <input className='styles.input' placeholder='Username' />

                <select className='{styles.input}'>
                    <option>-- Get a Room --</option>
                    <option value='1'>Room 1</option>
                    <option value='2'>Room 2</option>
                </select>

                <button className='btn btn-secondary'>Join Room</button>
            </div>
        </div>
    );
};