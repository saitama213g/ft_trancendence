"use client";

import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import layoutStyles from "../App.module.css";
import styles from "./ProfilePage.module.css";

interface ProfileFormState {
  displayName: string;
  username: string;
  fullName: string;
  bio: string;
  country: string;
  joinDate: string;
  avatarFile?: File;
  avatarPreview: string;
}

const PROFILE_TEMPLATE: ProfileFormState = {
  displayName: "AceBreaker",
  username: "ace.breaker",
  fullName: "Jordan Winters",
  bio: "Competitive paddle player focused on strategic baseline play.",
  country: "US",
  joinDate: "2023-04-12",
  avatarPreview: "/profile/default-avatar.svg",
};

const createInitialProfile = (): ProfileFormState => ({ ...PROFILE_TEMPLATE, avatarFile: undefined });

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "BR", name: "Brazil" },
];

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileFormState>(() => createInitialProfile());
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const joinDateLabel = useMemo(() => {
    const date = new Date(profile.joinDate);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [profile.joinDate]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({
      ...prev,
      avatarFile: file,
      avatarPreview: previewUrl,
    }));
  };

  const handleReset = () => {
    if (profile.avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(profile.avatarPreview);
    }
    setProfile(createInitialProfile());
  };

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

  useEffect(() => {
    if (!profile.avatarFile || !profile.avatarPreview.startsWith("blob:")) {
      return;
    }

    const objectUrl = profile.avatarPreview;
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [profile.avatarFile, profile.avatarPreview]);

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
      return;
    }

    setIsSidebarOpen((open) => !open);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    // Simulate network delay; replace with real API call or mutation.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSaving(false);
    // eslint-disable-next-line no-alert
    alert("Profile information updated!");
  };

  return (
    <div className={layoutStyles.app}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={layoutStyles.main}>
        <Header toggleSidebar={handleToggleSidebar} />
        <div className={styles.wrapper}>
          <nav>
            <Link href="/latestdash" aria-label="Back to dashboard" className={styles.backLink}>
              ← Back to Dashboard
            </Link>
          </nav>

          <section className={styles.card}>
            <div className={styles.profileSummary}>
              <div className={styles.avatarWrapper}>
                <img
                  src={profile.avatarPreview}
                  alt={`${profile.displayName} profile picture`}
                  className={styles.avatarPreview}
                />
                <label htmlFor="avatar" className={styles.uploadLabel}>
                  Change
                  <input
                    id="avatar"
                    className={styles.uploadInput}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <div className={styles.summaryText}>
                <p className={styles.displayName}>{profile.displayName}</p>
                <p className={styles.username}>@{profile.username}</p>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Join Date</span>
                  <time dateTime={profile.joinDate}>{joinDateLabel}</time>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Location</span>
                  <span>
                    {profile.country
                      ? countries.find((c) => c.code === profile.country)?.name ?? ""
                      : "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Display Name / Username
            <input
              className={styles.input}
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleInputChange}
              required
            />
            <span className={styles.helper}>
              This will be shown to other players across the platform.
            </span>
          </label>

          <label className={styles.label}>
            Handle (used for login)
            <input
              className={styles.input}
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              required
            />
            <span className={styles.helper}>
              Only lower-case letters, numbers, dot and underscore are allowed.
            </span>
          </label>

          <label className={`${styles.label} ${styles.formFull}`}>
            Full Name (optional)
            <input
              className={styles.input}
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              placeholder="Add your full name"
            />
          </label>

          <label className={`${styles.label} ${styles.formFull}`}>
            Bio
            <textarea
              className={styles.textarea}
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              maxLength={280}
              placeholder="Share a short description about yourself"
            />
            <span className={styles.helper}>
              {profile.bio.length} / 280 characters
            </span>
          </label>

          <label className={styles.label}>
            Country / Location
            <select
              className={styles.select}
              name="country"
              value={profile.country}
              onChange={handleInputChange}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.label}>
            Member Since
            <div className={styles.readOnlyField}>{joinDateLabel}</div>
            <input type="hidden" name="joinDate" value={profile.joinDate} />
          </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.buttonSecondary}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className={styles.buttonPrimary} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
