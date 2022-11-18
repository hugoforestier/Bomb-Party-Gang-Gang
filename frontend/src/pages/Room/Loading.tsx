import React from 'react';
import { useTranslation } from 'react-i18next';
import { SquareLoader } from 'react-spinners';
import styles from './Loading.module.scss';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className={styles.loading}>
      <div className={styles.loaderWrapper}>
        <h1 className={styles.titleBlack}>
          {t('loading')}
        </h1>
        <SquareLoader className={styles.loader} loading />

      </div>
    </div>
  );
}
