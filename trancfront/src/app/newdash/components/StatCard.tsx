import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    progress?: number;
    progressLabel?: string;
    footerText1?: string;
    footerText2?: string;
    isRivalsCard?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, progress, progressLabel, footerText1, footerText2, isRivalsCard = false }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                {icon}
            </div>
            <div>
                <p className={styles.value}>{value}</p>
            </div>
            <div className={styles.progressSection}>
                {progress !== undefined && progressLabel && (
                    <>
                        <div className={styles.progressMeta}>
                            <span>{progressLabel}</span>
                            <span>{progress}%</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </>
                )}
                {isRivalsCard && (
                     <div className={styles.footerText}>
                        {footerText1 && <p>{footerText1}</p>}
                        {footerText2 && <p className={styles.footerHighlight}>{footerText2}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
