import styles from './LoadingBar.module.css';

const LoadingBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loadingBar}></div>
        </div>
    );
};

export default LoadingBar;
