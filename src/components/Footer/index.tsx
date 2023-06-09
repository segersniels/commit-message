import Link from 'next/link';
import styles from './Footer.module.css';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={styles.container}>
      <Link
        href="https://github.com/segersniels/commit-message"
        target="_blank"
      >
        <FaGithub className={styles.icon} />
      </Link>
    </div>
  );
};

export default Footer;
