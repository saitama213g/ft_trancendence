"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import layoutStyles from "../App.module.css";
import styles from "./page.module.css";

interface SwitchOption {
  id: string;
  label: string;
  helper: string;
}

const notificationOptions: SwitchOption[] = [
  {
    id: "match-invites",
    label: "Match invites",
    helper: "Be alerted when a friend challenges you to play",
  },
  {
    id: "tournament-updates",
    label: "Tournament updates",
    helper: "Receive reminders for registered tournaments",
  },
  {
    id: "friend-activity",
    label: "Friend activity",
    helper: "When teammates start or finish a match",
  },
];

const initialToggles: Record<string, boolean> = {
  "match-invites": true,
  "tournament-updates": true,
  "friend-activity": false,
  "club-banner": true,
  "share-history": false,
};

const SettingsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(initialToggles);
  const [clubName, setClubName] = useState("Baseline Breakers");
  const [playStyle, setPlayStyle] = useState("aggressive");
  const [signatureShot, setSignatureShot] = useState("Topspin forehand");
  const [sensitivity, setSensitivity] = useState(65);
  const [matchNotes, setMatchNotes] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncSidebar = (matches: boolean) => {
      setIsSidebarOpen(matches);
    };

    syncSidebar(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => syncSidebar(event.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
      return;
    }

    setIsSidebarOpen((open) => !open);
  };

  const toggleSwitch = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: hook into API mutation.
    // eslint-disable-next-line no-alert
    alert("Settings saved!");
  };

  const handleReset = () => {
    setToggles(initialToggles);
    setClubName("Baseline Breakers");
    setPlayStyle("aggressive");
    setSignatureShot("Topspin forehand");
    setSensitivity(65);
    setMatchNotes("");
  };

  return (
    <div className={layoutStyles.app}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={layoutStyles.main}>
        <Header toggleSidebar={handleToggleSidebar} />
        <div className={styles.wrapper}>
          <nav>
            <Link href="/latestdash" className={styles.backLink}>
              ← Back to Dashboard
            </Link>
          </nav>

          <section className={styles.content}>
            <header className={styles.hero}>
              <div>
                <h1 className={styles.heroTitle}>Match-Ready Settings</h1>
                <p className={styles.heroSubtitle}>
                  Fine-tune your ping pong experience: notifications, play style, and club presence.
                  Everything you need before stepping onto the virtual table.
                </p>
              </div>
              <div className={styles.sectionGrid}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>🏓</span>
                    <h2 className={styles.cardTitle}>Match Prep</h2>
                  </div>
                  <p className={styles.cardDescription}>
                    Set your preferred paddle sensitivity and signature shot so match previews show
                    how you like to play.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>📣</span>
                    <h2 className={styles.cardTitle}>Alerts</h2>
                  </div>
                  <p className={styles.cardDescription}>
                    Choose the match updates to keep your eye on. Stay agile for invites and
                    tournaments.
                  </p>
                </div>
              </div>
            </header>

            <form onSubmit={handleSubmit} className={styles.sectionGrid}>
              <section className={styles.card}>
                <h3 className={styles.groupTitle}>Club Identity</h3>
                <div className={styles.control}>
                  <label htmlFor="clubName">Team / Club name</label>
                  <input
                    id="clubName"
                    className={styles.input}
                    value={clubName}
                    onChange={(event) => setClubName(event.target.value)}
                    placeholder="Your club name"
                  />
                </div>
                <div className={styles.control}>
                  <label htmlFor="playStyle">Preferred play style</label>
                  <select
                    id="playStyle"
                    className={styles.select}
                    value={playStyle}
                    onChange={(event) => setPlayStyle(event.target.value)}
                  >
                    <option value="aggressive">Aggressive attacker</option>
                    <option value="defensive">Defensive wall</option>
                    <option value="all-round">All-round strategist</option>
                    <option value="spin-master">Spin master</option>
                  </select>
                </div>
                <div className={styles.control}>
                  <label htmlFor="signatureShot">Signature trick shot</label>
                  <input
                    id="signatureShot"
                    className={styles.input}
                    value={signatureShot}
                    onChange={(event) => setSignatureShot(event.target.value)}
                    placeholder="E.g. Backhand flick"
                  />
                </div>
              </section>

              <section className={styles.card}>
                <h3 className={styles.groupTitle}>Match Notifications</h3>
                <div className={styles.control}>
                  {notificationOptions.map((option) => (
                    <div key={option.id} className={styles.toggleRow}>
                      <div>
                        <p className={styles.toggleLabel}>{option.label}</p>
                        <p className={styles.toggleHelper}>{option.helper}</p>
                      </div>
                      <button
                        type="button"
                        className={styles.switch}
                        data-on={toggles[option.id]}
                        onClick={() => toggleSwitch(option.id)}
                        aria-pressed={toggles[option.id]}
                      >
                        <span className={styles.switchThumb} aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.card}>
                <h3 className={styles.groupTitle}>Input Sensitivity</h3>
                <div className={styles.control}>
                  <label htmlFor="sensitivity">
                    Paddle sensitivity ({sensitivity}%)
                  </label>
                  <input
                    id="sensitivity"
                    className={styles.input}
                    type="range"
                    min={0}
                    max={100}
                    value={sensitivity}
                    onChange={(event) => setSensitivity(Number(event.target.value))}
                  />
                </div>
                <div className={styles.control}>
                  <label htmlFor="matchNotes">Match notes</label>
                  <textarea
                    id="matchNotes"
                    className={styles.textarea}
                    placeholder="Add quick reminders for upcoming matches"
                    value={matchNotes}
                    onChange={(event) => setMatchNotes(event.target.value)}
                  />
                </div>
              </section>

              <section className={styles.card}>
                <h3 className={styles.groupTitle}>Visibility</h3>
                <div className={styles.control}>
                  <div className={styles.optionRow}>
                    <div>
                      <p className={styles.toggleLabel}>Show club banner</p>
                      <p className={styles.toggleHelper}>Display your club colors on the scoreboard</p>
                    </div>
                    <button
                      type="button"
                      className={styles.switch}
                      data-on={toggles["club-banner"]}
                      onClick={() => toggleSwitch("club-banner")}
                      aria-pressed={toggles["club-banner"]}
                    >
                      <span className={styles.switchThumb} aria-hidden />
                    </button>
                  </div>
                  <div className={styles.optionRow}>
                    <div>
                      <p className={styles.toggleLabel}>Share match history</p>
                      <p className={styles.toggleHelper}>Allow friends to inspect your past matches</p>
                    </div>
                    <button
                      type="button"
                      className={styles.switch}
                      data-on={toggles["share-history"]}
                      onClick={() => toggleSwitch("share-history")}
                      aria-pressed={toggles["share-history"]}
                    >
                      <span className={styles.switchThumb} aria-hidden />
                    </button>
                  </div>
                </div>
              </section>

              <footer className={styles.footerActions}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.secondary}`}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className={`${styles.button} ${styles.primary}`}>
                  Save Changes
                </button>
              </footer>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
