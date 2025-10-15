"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  avatar: string;
}

interface User {
  id: number;
  username: string;
  rank: string | null;
  xp: number;
  avatar_url: string | null;
}

// interface Invite {
//     id: number;                            // Primary key
//     sender_id: number;                     // References users.id
//     receiver_id: number;                   // References users.id
//     status : "pending" | "accepted" | "rejected"; // Default = 'pending'
// }

interface SentInvite {
  id: number;
  recipient: string;
  status: "pending" | "accepted" | "declined";
  sentAt: string;
}

interface ReceivedInvite {
  id: number;
  sender: string;
  status: "pending" | "accepted" | "declined";
  sentAt: string;
}

const initialFriends: Friend[] = [
  {
    id: 1,
    name: "Alex Morgan",
    username: "alexm",
    online: true,
    lastActive: "Online now",
    avatar: "/profile/default-avatar.svg",
  },
  {
    id: 2,
    name: "Sofia Alvarez",
    username: "sofia.a",
    online: true,
    lastActive: "Online now",
    avatar: "/profile/default-avatar.svg",
  },
  {
    id: 3,
    name: "Jordan Lee",
    username: "jordanlee",
    online: false,
    lastActive: "Last seen 15m ago",
    avatar: "/profile/default-avatar.svg",
  },
  {
    id: 4,
    name: "Maya Patel",
    username: "maya.p",
    online: false,
    lastActive: "Last seen 2h ago",
    avatar: "/profile/default-avatar.svg",
  },
  {
    id: 5,
    name: "Maya Patel",
    username: "maya.p",
    online: false,
    lastActive: "Last seen 2h ago",
    avatar: "/profile/default-avatar.svg",
  },
  {
    id: 6,
    name: "Maya Patel",
    username: "maya.p",
    online: false,
    lastActive: "Last seen 2h ago",
    avatar: "/profile/default-avatar.svg",
  },
  {
    id: 7,
    name: "Maya Patel",
    username: "maya.p",
    online: false,
    lastActive: "Last seen 2h ago",
    avatar: "/profile/default-avatar.svg",
  },
];

const initialSentInvites: SentInvite[] = [
];

const initialReceivedInvites: ReceivedInvite[] = [
];

interface SentInvitesSectionProps {
  invites: SentInvite[];
  onCancelInvite: (inviteId: number) => void;
}

const SentInvitesSection: React.FC<SentInvitesSectionProps> = ({ invites, onCancelInvite }) => (
  <section className={styles.sectionCard}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Invites Sent by You</h2>
    </div>

    {invites.length === 0 ? (
      <div className={styles.emptyState}>
        <strong>No active invites</strong>
        <span>Invite new players and build your team.</span>
      </div>
    ) : (
      <div className={styles.inviteList}>
        {invites.map((invite) => (
          <article key={invite.id} className={styles.inviteItem}>
            <div className={styles.inviteDetails}>
              <span className={styles.friendName}>{invite.recipient}</span>
              <span className={styles.friendMeta}>Sent {invite.sentAt}</span>
              <span className={`${styles.statusPill} ${styles[invite.status]}`}>
                {invite.status}
              </span>
            </div>
            {invite.status === "accepted" ? (
              <div className={styles.inviteActions}>
                <button
                  className={styles.iconButton}
                  type="button"
                  onClick={() => onCancelInvite(invite.id)}
                  aria-label="Remove accepted invite"
                >
                  ✕
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    )}
  </section>
);

interface ReceivedInvitesSectionProps {
  invites: ReceivedInvite[];
  onAcceptInvite: (inviteId: number) => void;
  onDeclineInvite: (inviteId: number) => void;
  onRemoveInvite: (inviteId: number) => void;
}

const ReceivedInvitesSection: React.FC<ReceivedInvitesSectionProps> = ({
  invites,
  onAcceptInvite,
  onDeclineInvite,
  onRemoveInvite,
}) => (
  <section className={styles.sectionCard}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Invites Sent to You</h2>
    </div>

    {invites.length === 0 ? (
      <div className={styles.emptyState}>
        <strong>No new invites</strong>
        <span>Your teammates will appear here when they send an invite.</span>
      </div>
    ) : (
      <div className={styles.inviteList}>
        {invites.map((invite) => (
          <article key={invite.id} className={styles.inviteItem}>
            <div className={styles.inviteDetails}>
              <span className={styles.friendName}>{invite.sender}</span>
              <span className={styles.friendMeta}>Invited you on {invite.sentAt}</span>
              <span className={`${styles.statusPill} ${styles[invite.status]}`}>
                {invite.status}
              </span>
            </div>
            {invite.status === "pending" ? (
              <div className={styles.inviteActions}>
                <button
                  className={`${styles.actionButton} ${styles.acceptButton}`}
                  type="button"
                  onClick={() => onAcceptInvite(invite.id)}
                >
                  Accept
                </button>
                <button
                  className={`${styles.actionButton} ${styles.declineButton}`}
                  type="button"
                  onClick={() => onDeclineInvite(invite.id)}
                >
                  Decline
                </button>
              </div>
            ) : null}
            {invite.status === "accepted" ? (
              <div className={styles.inviteActions}>
                <button
                  className={styles.iconButton}
                  type="button"
                  onClick={() => onRemoveInvite(invite.id)}
                  aria-label="Remove invite"
                >
                  ✕
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    )}
  </section>
);

const FriendsPage: React.FC = () => {
  const [friends] = useState(initialFriends);
  const [sentInvites, setSentInvites] = useState(initialSentInvites);
  const [receivedInvites, setReceivedInvites] = useState(initialReceivedInvites);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteTarget, setInviteTarget] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSentInvites = async () => {      
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/invites/sent", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error((await response.json()).message || "Failed to fetch sent invites");

        const data: SentInvite[] = await response.json();
        setSentInvites(data);
      } catch (error) {
        console.error("Error fetching sent invites:", error);
        setSentInvites([]);
      }
    };
    const fetchReceivedInvites = async () => {
      if (!token) return;
      try {
        const response = await fetch("http://localhost:3001/invites/received", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error((await response.json()).message || "Failed to fetch received invites");

        const data: ReceivedInvite[] = await response.json();
        setReceivedInvites(data);
      } catch (error) {
        console.error("Error fetching Received invites:", error);
        setReceivedInvites([]);
      }
    };
    fetchReceivedInvites();
    fetchSentInvites();
  }, []); // empty dependency array → runs only once on mount
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

  const activeSentInvites = useMemo(
    () => sentInvites.filter((invite) => invite.status !== "declined"),
    [sentInvites]
  );
  const activeReceivedInvites = useMemo(
    () => receivedInvites.filter((invite) => invite.status !== "declined"),
    [receivedInvites]
  );
  const onlineCount = friends.filter((friend) => friend.online).length;
  const invitesReceivedCount = activeReceivedInvites.length;
  const invitesSentCount = activeSentInvites.length;

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
      if (!inviteTarget.trim()) {
        setSearchResults([]); // clear results if nothing entered
      return;
    }
    setIsSearching(true);

    try {
      const response = await fetch(
        `http://localhost:3001/users/search?search=${encodeURIComponent(inviteTarget)}`
      );

      if (!response.ok) throw new Error((await response.json()).message || "Failed to fetch users");
      const data: User[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setSearchResults([]); // clear if error
    } finally {
      setIsSearching(false);
    }
  };

  const handleInvite = async (userId: number, username: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/invites/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver_id: userId }),
      });

      if (!response.ok) throw new Error((await response.json()).message || "Failed to send invite");

      const data = await response.json() as SentInvite;

      // Update local state
      setSentInvites((prev) => [
        ...prev,
        {
          id: data.id ?? prev.length + 1, // or use returned invite ID
          recipient: username,
          status: "pending",
          sentAt: new Date().toLocaleDateString(),
        },
      ]);
      setSearchResults((prev) => prev.filter((result) => result.username !== username));
      setInviteTarget("");
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  const handleCancelSentInvite = (inviteId: number) => {
    setSentInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  const handleAcceptInvite = (inviteId: number) => {
    setReceivedInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? { ...invite, status: "accepted" } : invite
      )
    );
  };

  const handleDeclineInvite = (inviteId: number) => {
    setReceivedInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? { ...invite, status: "declined" } : invite
      )
    );
  };

  const handleRemoveReceivedInvite = (inviteId: number) => {
    setReceivedInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
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
                  <span className={styles.statLabel}>Invites Sent to You</span>
                  <span className={styles.statValue}>{invitesReceivedCount}</span>
                  <span className={styles.tagPill}>Check notifications</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Invites Sent by You</span>
                  <span className={styles.statValue}>{invitesSentCount}</span>
                  <span className={styles.tagPill}>Keep scouting</span>
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
                      <div className={styles.friendAvatar}>
                        <Image
                          src={friend.avatar}
                          alt={`${friend.name}'s avatar`}
                          width={44}
                          height={44}
                          className={styles.friendAvatarImage}
                        />
                        <span
                          className={`${styles.statusDot} ${friend.online ? styles.statusDotOnline : ""}`}
                          aria-hidden
                        />
                      </div>
                      <div className={styles.friendInfo}>
                        <span className={styles.friendName}>{friend.name}</span>
                        <span className={styles.friendUsername}>@{friend.username}</span>
                      </div>
                      <div className={styles.friendStatusBlock}>
                        <span className={styles.friendPill}>
                          {friend.online ? "Online" : "Offline"}
                        </span>
                        <span className={styles.friendLastActive}>{friend.lastActive}</span>
                      </div>
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
                    <article key={result.username} className={styles.inviteItem}>
                      <div className={styles.inviteDetails}>
                        <span className={styles.friendName}>{result.username}</span>
                        <span className={styles.suggestionMeta}>Suggested user</span>
                      </div>
                      <button
                        className={styles.suggestionButton}
                        type="button"
                        onClick={() => handleInvite(result.id, result.username)}
                      >
                        Invite
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <ReceivedInvitesSection
              invites={activeReceivedInvites}
              onAcceptInvite={handleAcceptInvite}
              onDeclineInvite={handleDeclineInvite}
              onRemoveInvite={handleRemoveReceivedInvite}
            />
            <SentInvitesSection invites={activeSentInvites} onCancelInvite={handleCancelSentInvite} />
          </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FriendsPage;