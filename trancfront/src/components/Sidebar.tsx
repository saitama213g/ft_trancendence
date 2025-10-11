"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Sidebar.module.css";

type SidebarButton = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const iconSize = 24;

const usersIcon = (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" role="img" aria-hidden>
    <path
      fill="currentColor"
      d="M9 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM9 13c2.67 0 5 1.17 5 2.8V18H4v-2.2C4 14.17 6.33 13 9 13zm7.5 5H14v-1.2c0-.74-.27-1.39-.74-1.94.62-.11 1.27-.16 1.94-.16 2.05 0 3.8.9 3.8 2.1V18h-2.5z"
    />
  </svg>
);

const chartIcon = (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" role="img" aria-hidden>
    <path
      fill="currentColor"
      d="M5 18h14v-2H5v2zm0-4h9v-2H5v2zm0-4h5V8H5v2zm0-6v2h14V4H5z"
    />
  </svg>
);

const settingsIcon = (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" role="img" aria-hidden>
    <path
      fill="currentColor"
      d="m11.2 3 1.6.02 1.1 2.43 2.6.76.82 1.54-.95 2.68.95 2.68-.82 1.54-2.6.77-1.1 2.42-1.6.03-1.39-2.45-2.6-.76-.82-1.54.95-2.69-.95-2.67.82-1.55 2.6-.76L11.2 3zm.8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
    />
  </svg>
);

const paletteIcon = (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" role="img" aria-hidden>
    <path
      fill="currentColor"
      d="M12 4c4.4 0 8 2.91 8 6.5 0 1.68-1 3-2.56 3.62-.85.33-1.1 1.09-.78 1.85.24.58.44 1.25.07 1.92-.4.76-1.13 1.11-2.73 1.11H12c-4.4 0-8-2.91-8-6.5C4 6.91 7.6 4 12 4zm-3.2 4.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3.2-.4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3.2 1.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
    />
  </svg>
);

const buttons: SidebarButton[] = [
  { label: "Friends", icon: usersIcon, active: true },
  { label: "Stats", icon: chartIcon },
  { label: "Settings", icon: settingsIcon },
  { label: "Appearance", icon: paletteIcon },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandBadge}>PP</span>
        <span>Ping Pong Hub</span>
      </div>

      <nav className={styles.nav}>
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            className={clsx(styles.navButton, button.active && styles.navButtonActive)}
          >
            <span className={styles.icon} aria-hidden>
              {button.icon}
            </span>
            <span>{button.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>Version 1.0 · All serves counted</div>
    </aside>
  );
}
