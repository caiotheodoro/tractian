import styles from '@/app/page.module.css';
export default function Home() {
  return (
    <div className={styles.container}>
        <h1>No Company Selected!</h1>
        <p>Please select a company to view its assets and locations</p>
    </div>
  );
}
