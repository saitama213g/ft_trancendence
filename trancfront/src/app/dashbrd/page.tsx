import type { CSSProperties, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

const layoutStyle: CSSProperties = {
	display: "flex",
	flexDirection: "row",
	gap: "1.5rem",
	minHeight: "100vh",
	padding: "2.5rem",
	background: "var(--background)",
	color: "var(--foreground)",
};

const mainStyle: CSSProperties = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
};

const cardStyle: CSSProperties = {
	background: "rgba(23, 23, 23, 0.05)",
	borderRadius: "20px",
	padding: "1.5rem",
	boxShadow: "0 16px 48px rgba(15, 23, 42, 0.12)",
};

const headingStyle: CSSProperties = {
	fontSize: "1.6rem",
	fontWeight: 700,
	marginBottom: "0.75rem",
};

const paragraphStyle: CSSProperties = {
	lineHeight: 1.6,
	maxWidth: "640px",
};

function Card({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section style={cardStyle}>
			<h2 style={headingStyle}>{title}</h2>
			<div style={paragraphStyle}>{children}</div>
		</section>
	);
}

export default function DashboardPage() {
	return (
		<main style={layoutStyle}>
			<Sidebar />
			<div style={mainStyle}>
				<Card title="Quick Overview">
					Welcome back to your dashboard. Choose an option on the left to manage
					friends, review your latest match statistics, or fine-tune your game
					settings.
				</Card>
				<Card title="Action Items">
					<ul style={{ listStyle: "disc", marginLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
						<li>Review your weekly win ratio trends.</li>
						<li>Customize the arena theme before the next tournament.</li>
						<li>Invite a friend to a friendly rally session.</li>
					</ul>
				</Card>
			</div>
		</main>
	);
}
