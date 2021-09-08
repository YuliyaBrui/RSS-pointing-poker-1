import React from 'react';
import styles from './Footer.module.scss';

export function FooterPoker(): JSX.Element {
  return (
    <footer>
      <div className={styles.footer_container}>
        <a
          className={styles.github}
          href="https://github.com/asyalu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Egor Fadin
        </a>
        <a
          className={styles.github}
          href="https://github.com/YuliyaBrui"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yuliya Brui
        </a>
        <a
          className={styles.github}
          href="https://github.com/anutaguzova"
          target="_blank"
          rel="noopener noreferrer"
        >
          Anna Guzova
        </a>
        <a
          className={styles.rss}
          href="https://rs.school/js/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.rss_year}>&apos;21</span>
        </a>
      </div>
    </footer>
  );
}
