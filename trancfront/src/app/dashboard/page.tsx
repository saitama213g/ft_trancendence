"use client";
import React, { useState } from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import './dashboard.css';

// Dummy data for demonstration
const userInfoInit = {
	username: 'pongmaster',
	email: 'pongmaster@email.com',
	level: 7,
	avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=pongmaster',
};

const games = [
	{ id: 1, opponent: 'player1', score: '11-7', result: 'Win', date: '2025-10-10' },
	{ id: 2, opponent: 'player2', score: '8-11', result: 'Lose', date: '2025-10-09' },
	{ id: 3, opponent: 'player3', score: '11-9', result: 'Win', date: '2025-10-08' },
];

const scoresData = [
	{ date: '10/01', score: 7 },
	{ date: '10/03', score: 11 },
	{ date: '10/05', score: 9 },
	{ date: '10/07', score: 11 },
	{ date: '10/09', score: 8 },
	{ date: '10/10', score: 11 },
];

const timeSpentData = [
	{ date: '10/01', minutes: 15 },
	{ date: '10/03', minutes: 22 },
	{ date: '10/05', minutes: 18 },
	{ date: '10/07', minutes: 25 },
	{ date: '10/09', minutes: 20 },
	{ date: '10/10', minutes: 30 },
];

const levelData = [
	{ date: '10/01', level: 5 },
	{ date: '10/03', level: 6 },
	{ date: '10/07', level: 7 },
	{ date: '10/10', level: 7 },
];

const friends = [
	{ id: 1, name: 'player1', status: 'Friend' },
	{ id: 2, name: 'player2', status: 'Blocked' },
	{ id: 3, name: 'player3', status: 'Pending' },
];

const tournaments = [
	{ id: 1, name: 'Autumn Cup', position: 'Quarterfinals' },
	{ id: 2, name: 'Spring Open', position: 'Winner' },
];

export default function DashboardPage() {
	const [userInfo, setUserInfo] = useState(userInfoInit);
	const [editMode, setEditMode] = useState(false);
	const [editForm, setEditForm] = useState(userInfoInit);

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditForm({ ...editForm, [e.target.name]: e.target.value });
	};

	const handleEditSave = () => {
		setUserInfo(editForm);
		setEditMode(false);
	};

	return (
		<div className="dashboard-container">
			<h1>Ping Pong Dashboard</h1>
			<div className="dashboard-sections">
				{/* User Info Section */}
				<section className="section" style={{ maxWidth: 350 }}>
					<div className="section-title">Your Info</div>
					<img src={userInfo.avatar} alt="avatar" style={{ width: 80, borderRadius: '50%', marginBottom: 16 }} />
					{editMode ? (
						<div>
							<input name="username" value={editForm.username} onChange={handleEditChange} />
							<input name="email" value={editForm.email} onChange={handleEditChange} />
							<input name="level" type="number" value={editForm.level} onChange={handleEditChange} />
							<button className="edit-btn" onClick={handleEditSave}>Save</button>
						</div>
					) : (
						<div>
							<div><b>Username:</b> {userInfo.username}</div>
							<div><b>Email:</b> {userInfo.email}</div>
							<div><b>Level:</b> {userInfo.level}</div>
							<button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
						</div>
					)}
				</section>

				{/* Latest Games Section */}
				<section className="section">
					<div className="section-title">Latest Games</div>
					<ul className="games-list">
						{games.map(game => (
							<li key={game.id}>
								<b>{game.date}</b> vs <b>{game.opponent}</b> — <span>{game.score}</span> <span style={{ color: game.result === 'Win' ? 'green' : 'red' }}>{game.result}</span>
							</li>
						))}
					</ul>
				</section>

				{/* Stats Section */}
				<section className="section" style={{ flex: 2 }}>
					<div className="section-title">Your Stats</div>
					<div className="stats-graphs">
						<div className="stats-graphs-row">
							<div style={{ flex: 1 }}>
								<div style={{ fontWeight: 500, marginBottom: 8 }}>Scores</div>
								<ResponsiveContainer width="100%" height={120}>
									<LineChart data={scoresData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="date" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="score" stroke="#8884d8" />
									</LineChart>
								</ResponsiveContainer>
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontWeight: 500, marginBottom: 8 }}>Time Spent (min)</div>
								<ResponsiveContainer width="100%" height={120}>
									<BarChart data={timeSpentData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="date" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Bar dataKey="minutes" fill="#82ca9d" />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
						<div className="stats-graphs-row">
							<div style={{ flex: 1 }}>
								<div style={{ fontWeight: 500, marginBottom: 8 }}>Level Progress</div>
								<ResponsiveContainer width="100%" height={120}>
									<LineChart data={levelData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="date" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="level" stroke="#ffc658" />
									</LineChart>
								</ResponsiveContainer>
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontWeight: 500, marginBottom: 8 }}>Wins / Loses</div>
								<div className="stats-summary">
									<div className="stats-summary-item">
										<div>Wins</div>
										<div style={{ fontSize: 24, color: 'green' }}>{games.filter(g => g.result === 'Win').length}</div>
									</div>
									<div className="stats-summary-item">
										<div>Loses</div>
										<div style={{ fontSize: 24, color: 'red' }}>{games.filter(g => g.result === 'Lose').length}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div className="dashboard-sections">
				{/* Relationship Management Section */}
				<section className="section">
					<div className="section-title">Manage Relationships</div>
					<ul className="friends-list">
						{friends.map(friend => (
							<li key={friend.id}>
								{friend.name} — <span>{friend.status}</span>
								<button className="edit-btn" style={{ marginLeft: 8 }}>Manage</button>
							</li>
						))}
					</ul>
				</section>

				{/* Tournaments Section */}
				<section className="section">
					<div className="section-title">Your Tournaments</div>
					<ul className="tournaments-list">
						{tournaments.map(t => (
							<li key={t.id}>
								<b>{t.name}</b> — <span>{t.position}</span>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
}
