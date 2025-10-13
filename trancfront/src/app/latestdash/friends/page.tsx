"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import layoutStyles from "../App.module.css";
import styles from "./page.module.css";

interface Friend {
  id: number;
  name: string;
  username: string;
  online: boolean;
  lastActive: string;
}

interface Invite {
  id: number;
  recipient: string;
  status: "pending" | "accepted" | "declined";
  sentAt: string;
}

const initialFriends: Friend[] = [
  { id: 1, name: "Alex Morgan", username: "alexm", online: true, lastActive: "Online now" },
  { id: 2, name: "Sofia Alvarez", username: "sofia.a", online: true, lastActive: "Online now" },
  { id: 3, name: "Jordan Lee", username: "jordanlee", online: false, lastActive: "Last seen 15m ago" },
  { id: 4, name: "Maya Patel", username: "maya.p", online: false, lastActive: "Last seen 2h ago" },
  { id: 5, name: "Maya Patel", username: "maya.p", online: false, lastActive: "Last seen 2h ago" },
  { id: 6, name: "Maya Patel", username: "maya.p", online: false, lastActive: "Last seen 2h ago" },
  { id: 7, name: "Maya Patel", username: "maya.p", online: false, lastActive: "Last seen 2h ago" },
];

const initialInvites: Invite[] = [
  { id: 1, recipient: "Kei Tanaka", status: "pending", sentAt: "Oct 10, 2025" },
  { id: 2, recipient: "Lucas Chen", status: "accepted", sentAt: "Oct 08, 2025" },
  { id: 3, recipient: "Priya Singh", status: "declined", sentAt: "Oct 05, 2025" },
];

const FriendsPage: React.FC = () => {
  const [friends] = useState(initialFriends);
  const [invites, setInvites] = useState(initialInvites);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteTarget, setInviteTarget] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sortedFriends = useMemo(() => {
    return [...friends].sort((a, b) => Number(b.online) - Number(a.online));
  }, [friends]);

  const filteredFriends = useMemo(() => {
    if (!searchTerm) {
      return sortedFriends;
    }
    return sortedFriends.filter((friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedFriends, searchTerm]);

  const activeInvites = useMemo(
    () => invites.filter((invite) => invite.status !== "declined"),
    [invites]
  );
  const onlineCount = friends.filter((friend) => friend.online).length;
  const pendingCount = invites.filter((invite) => invite.status === "pending").length;
  const acceptedCount = invites.filter((invite) => invite.status === "accepted").length;

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

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    // Simulate API call for user search.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSearching(false);

    const results = inviteTarget
      ? [inviteTarget, `${inviteTarget}_01`, `${inviteTarget}_pro`]
      : [];

    setSearchResults(results);
  };

  const handleInvite = (username: string) => {
    setInvites((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        recipient: username,
        status: "pending",
        sentAt: new Date().toLocaleDateString(),
      },
    ]);
    setSearchResults((prev) => prev.filter((result) => result !== username));
    setInviteTarget("");
  };

  const handleRemoveInvite = (inviteId: number) => {
    setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
      return;
    }

    setIsSidebarOpen((open) => !open);
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
            <div className={styles.hero}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Your Squad Hub</h1>
                <p className={styles.heroSubtitle}>
                  Track which teammates are online, send fresh invites, and grow your roster.
                  Stay connected and ready for the next match.
                </p>
                <div className={styles.heroActions}>
                  <form className={styles.searchBar} onSubmit={handleSearch}>
                    <input
                      className={styles.searchInput}
                      type="text"
                      placeholder="Search for a player username to invite"
                      value={inviteTarget}
                      onChange={(event) => setInviteTarget(event.target.value)}
                    />
                    <button className={styles.searchButton} type="submit" disabled={isSearching}>
                      {isSearching ? "Searching..." : "Find Players"}
                    </button>
                  </form>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>⚡ Active community</span>
                    <span className={styles.badge}>🤝 Invite-only matches</span>
                  </div>
                </div>
              </div>
              <div className={styles.summaryStats}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Friends</span>
                  <span className={styles.statValue}>{friends.length}</span>
                  <span className={styles.tagPill}>+2 this week</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Online Now</span>
                  <span className={styles.statValue}>{onlineCount}</span>
                  <span className={styles.tagPill}>Stay ready</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Pending Invites</span>
                  <span className={styles.statValue}>{pendingCount}</span>
                  <span className={styles.tagPill}>Awaiting reply</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Accepted Invites</span>
                  <span className={styles.statValue}>{acceptedCount}</span>
                  <span className={styles.tagPill}>Ready to play</span>
                </div>
              </div>
            </div>

            <div className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Friends</h2>
                <input
                  className={styles.friendFilter}
                  type="search"
                  placeholder="Filter by name or handle"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              {filteredFriends.length === 0 ? (
                <div className={styles.emptyState}>
                  <strong>No friends found</strong>
                  <span>Try adjusting your filter or invite new friends.</span>
                </div>
              ) : (
                <div className={styles.friendList}>
                  {filteredFriends.map((friend) => (
                    <article key={friend.id} className={styles.friendItem}>
                      <div className={styles.statusIndicator}>
                        <span
                          className={`${styles.friendStatus} ${friend.online ? styles.online : ""}`}
                          aria-hidden
                        />
                        <span className={styles.friendPill}>
                          {friend.online ? "Online" : "Offline"}
                        </span>
                      </div>
                      <div className={styles.friendInfo}>
                        <span className={styles.friendName}>{friend.name}</span>
                        <span className={styles.friendMeta}>@{friend.username}</span>
                      </div>
                      <span className={styles.friendMeta}>{friend.lastActive}</span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className={styles.rightColumn}>
            {searchResults.length > 0 && (
              <section className={`${styles.sectionCard} ${styles.suggestions}`} aria-live="polite">
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Invite Suggestions</h2>
                </div>
                <div className={styles.inviteList}>
                  {searchResults.map((result) => (
                    <article key={result} className={styles.inviteItem}>
                      <div className={styles.inviteDetails}>
                        <span className={styles.friendName}>{result}</span>
                        <span className={styles.suggestionMeta}>Suggested user</span>
                      </div>
                      <button
                        className={styles.suggestionButton}
                        type="button"
                        onClick={() => handleInvite(result)}
                      >
                        Invite
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Sent Invites</h2>
              </div>

              {activeInvites.length === 0 ? (
                <div className={styles.emptyState}>
                  <strong>No active invites</strong>
                  <span>Invite new players and build your team.</span>
                </div>
              ) : (
                <div className={styles.inviteList}>
                  {activeInvites.map((invite) => (
                    <article key={invite.id} className={styles.inviteItem}>
                      <div className={styles.inviteDetails}>
                        <span className={styles.friendName}>{invite.recipient}</span>
                        <span className={styles.friendMeta}>Sent {invite.sentAt}</span>
                        <span className={`${styles.statusPill} ${styles[invite.status]}`}>
                          {invite.status}
                        </span>
                      </div>
                      <div className={styles.inviteActions}>
                        <button
                          className={styles.iconButton}
                          type="button"
                          onClick={() => handleRemoveInvite(invite.id)}
                          aria-label="Cancel invite"
                        >
                          ✕
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FriendsPage;
