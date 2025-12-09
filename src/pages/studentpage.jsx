import { useEffect, useState } from "react";

const API_URL = "https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1";
const MEDIA_BASE = "https://dvonb.xyz";

export default function StudentPage() {
	const [students, setStudents] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [showOne, setShowOne] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);


	useEffect(() => {
		async function loadStudents() {
			try {
				setLoading(true);

				const res = await fetch(API_URL);
				if (!res.ok) throw new Error(`HTTP error ${res.status}`);

				const data = await res.json();
				setStudents(data);
				setFiltered(data);
			} catch (err) {
				console.error(err);
				setError("Could not load student data.");
			} finally {
				setLoading(false);
			}
		}

		loadStudents();
	}, []);


	useEffect(() => {
		const term = search.trim().toLowerCase();

		if (!term) {
			setFiltered(students);
			setCurrentIndex(0);
			return;
		}

		const result = students.filter((s) => {
			const fullName = `${s.name.first} ${s.name.middleInitial ?? ""} ${s.name.last} ${s.name.preferred ?? ""}`
				.toLowerCase();

			return (
				fullName.includes(term) ||
				(s.prefix && s.prefix.toLowerCase().includes(term)) ||
				(s.mascot && s.mascot.toLowerCase().includes(term))
			);
		});

		setFiltered(result);
		setCurrentIndex(0);
	}, [search, students]);


	const visibleStudents =
		showOne && filtered.length > 0
			? [filtered[currentIndex]]
			: filtered;

	const handlePrev = () => {
		if (filtered.length === 0) return;

		setCurrentIndex((prev) =>
			prev === 0 ? filtered.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		if (filtered.length === 0) return;

		setCurrentIndex((prev) =>
			prev === filtered.length - 1 ? 0 : prev + 1
		);
	};


	return (
		<main className="students-page">
			<h1>ITIS 3135 – Student Introductions</h1>

			<p>
				Data loaded from{" "}
				<a href={API_URL} target="_blank" rel="noreferrer">
					dvonb.xyz API
				</a>.
			</p>

			{/* Loading & Error states */}
			{loading && <p>Loading students…</p>}
			{error && <p className="error">{error}</p>}

			{/* Main content */}
			{!loading && !error && (
				<>
					{/* Controls */}
					<section className="students-controls">
						<label>
							Search by name, NinerNET, or mascot:
							<input
								type="search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="e.g. Gustafson, ngustaf1, Notorious Gecko…"
							/>
						</label>

						<label className="show-one-toggle">
							<input
								type="checkbox"
								checked={showOne}
								onChange={(e) => setShowOne(e.target.checked)}
							/>
							Show one student at a time
						</label>

						{showOne && filtered.length > 0 && (
							<div className="students-nav">
								<button type="button" onClick={handlePrev}>
									← Previous
								</button>

								<span>
									{currentIndex + 1} of {filtered.length}
								</span>

								<button type="button" onClick={handleNext}>
									Next →
								</button>
							</div>
						)}
					</section>

					{filtered.length === 0 && (
						<p>No students match that search.</p>
					)}

					{/* Student Cards */}
					<section className="students-grid">
						{visibleStudents.map((s) => {
							const displayName = s.name.preferred?.trim()
								? `${s.name.preferred} ${s.name.last}`
								: `${s.name.first} ${s.name.last}`;

							return (
								<article key={s.prefix} className="student-card">
									<header>
										<h2>{displayName}</h2>
										<p className="student-prefix">NinerNET: {s.prefix}</p>
										<p className="student-mascot">Mascot: {s.mascot}</p>
									</header>

									{/* Photo */}
									{s.media?.hasImage && (
										<figure className="student-media">
											<img
												src={`${MEDIA_BASE}${s.media.src}`}
												alt={s.media.caption || `${displayName}'s photo`}
											/>
											{s.media.caption && (
												<figcaption>{s.media.caption}</figcaption>
											)}
										</figure>
									)}

									{/* Background Sections */}
									<section className="student-backgrounds">
										<h3>Background</h3>
										<p><strong>Personal: </strong>{s.backgrounds.personal}</p>
										<p><strong>Professional: </strong>{s.backgrounds.professional}</p>
										<p><strong>Academic: </strong>{s.backgrounds.academic}</p>
									</section>

									{/* Courses */}
									{s.courses?.length > 0 && (
										<section className="student-courses">
											<h3>Current Courses</h3>
											<ul>
												{s.courses.map((c) => (
													<li key={c.code}>
														<strong>{c.code}</strong> — {c.name}
													</li>
												))}
											</ul>
										</section>
									)}

									{/* Personal Statement */}
									{s.personalStatement && (
										<section className="student-statement">
											<h3>Personal Statement</h3>
											<p>{s.personalStatement}</p>
										</section>
									)}

									{/* Quote */}
									{s.quote?.text && (
										<section className="student-quote">
											<h3>Favorite Quote</h3>
											<blockquote>
												“{s.quote.text}”
												{s.quote.author && (
													<footer>— {s.quote.author}</footer>
												)}
											</blockquote>
										</section>
									)}

									{/* Fun Fact */}
									{s.funFact && (
										<p className="student-fun-fact">
											<strong>Fun fact: </strong>{s.funFact}
										</p>
									)}

									{/* Links */}
									<section className="student-links">
										<h3>Links</h3>
										<ul>
											{s.links?.charlotte && (
												<li><a href={s.links.charlotte} target="_blank" rel="noreferrer">Charlotte web pages</a></li>
											)}
											{s.links?.itis3135 && (
												<li><a href={s.links.itis3135} target="_blank" rel="noreferrer">ITIS 3135 site</a></li>
											)}
											{s.links?.github && (
												<li><a href={s.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
											)}
											{s.links?.githubio && (
												<li><a href={s.links.githubio} target="_blank" rel="noreferrer">GitHub Pages</a></li>
											)}
											{s.links?.freecodecamp && (
												<li><a href={s.links.freecodecamp} target="_blank" rel="noreferrer">freeCodeCamp</a></li>
											)}
											{s.links?.codecademy && (
												<li><a href={s.links.codecademy} target="_blank" rel="noreferrer">Codecademy</a></li>
											)}
											{s.links?.linkedin && (
												<li><a href={s.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
											)}
										</ul>
									</section>
								</article>
							);
						})}
					</section>
				</>
			)}
		</main>
	);
}
