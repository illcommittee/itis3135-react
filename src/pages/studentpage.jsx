import { useEffect, useState } from "react";

const API_URL = "https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1";
const MEDIA_BASE = "https://dvonb.xyz";

export default function StudentPage() {
	const [students, setStudents] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	const [showName, setShowName] = useState(true);
	const [showMascot, setShowMascot] = useState(true);
	const [showImage, setShowImage] = useState(true);
	const [showPersonalStatement, setShowPersonalStatement] = useState(true);
	const [showBackgrounds, setShowBackgrounds] = useState(true);
	const [showClasses, setShowClasses] = useState(true);
	const [showExtras, setShowExtras] = useState(true);
	const [showQuote, setShowQuote] = useState(true);
	const [showLinks, setShowLinks] = useState(true);


	useEffect(() => {
		async function loadStudents() {
			try {
				setLoading(true);

				const res = await fetch(API_URL);
				if (!res.ok) throw new Error(`HTTP error ${res.status}`);

				const data = await res.json();
				setStudents(data);
				setFiltered(data);
				setCurrentIndex(0);
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
			const first = s.name.first ?? "";
			const last = s.name.last ?? "";
			const preferred = s.name.preferred ?? "";

			const fullName = `${first} ${last} ${preferred}`.toLowerCase();

			return fullName.includes(term);
		});

		setFiltered(result);
		setCurrentIndex(0);
	}, [search, students]);

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

	const currentStudent =
		filtered.length > 0 ? filtered[currentIndex] : null;

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

			{!loading && !error && (
				<>
					{/* Controls */}
					<section className="students-controls">
						<div className="students-search">
							<label>
								Search by name (first / last):
								<input
									type="search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="e.g. Nathaniel, Gustafson, Nate…"
								/>
							</label>
							<p>
								Found{" "}
								<strong>{filtered.length}</strong>{" "}
								student{filtered.length !== 1 ? "s" : ""}.
							</p>
						</div>

						<fieldset className="students-options">
							<legend>Show fields</legend>

							<label>
								<input
									type="checkbox"
									checked={showName}
									onChange={(e) => setShowName(e.target.checked)}
								/>
								Name
							</label>

							<label>
								<input
									type="checkbox"
									checked={showMascot}
									onChange={(e) => setShowMascot(e.target.checked)}
								/>
								Mascot
							</label>

							<label>
								<input
									type="checkbox"
									checked={showImage}
									onChange={(e) => setShowImage(e.target.checked)}
								/>
								Image
							</label>

							<label>
								<input
									type="checkbox"
									checked={showPersonalStatement}
									onChange={(e) =>
										setShowPersonalStatement(e.target.checked)
									}
								/>
								Personal Statement
							</label>

							<label>
								<input
									type="checkbox"
									checked={showBackgrounds}
									onChange={(e) =>
										setShowBackgrounds(e.target.checked)
									}
								/>
								Backgrounds
							</label>

							<label>
								<input
									type="checkbox"
									checked={showClasses}
									onChange={(e) => setShowClasses(e.target.checked)}
								/>
								Classes
							</label>

							<label>
								<input
									type="checkbox"
									checked={showExtras}
									onChange={(e) => setShowExtras(e.target.checked)}
								/>
								Extra Information
							</label>

							<label>
								<input
									type="checkbox"
									checked={showQuote}
									onChange={(e) => setShowQuote(e.target.checked)}
								/>
								Quote
							</label>

							<label>
								<input
									type="checkbox"
									checked={showLinks}
									onChange={(e) => setShowLinks(e.target.checked)}
								/>
								Links
							</label>
						</fieldset>

						{/* Slideshow controls */}
						<div className="students-nav">
							<button
								type="button"
								onClick={handlePrev}
								disabled={filtered.length === 0}
							>
								← Previous
							</button>

							<span>
								{filtered.length === 0
									? "No students"
									: `${currentIndex + 1} of ${filtered.length}`}
							</span>

							<button
								type="button"
								onClick={handleNext}
								disabled={filtered.length === 0}
							>
								Next →
							</button>
						</div>
					</section>

					{/* Slideshow card */}
					<section className="students-slideshow">
						{!currentStudent && (
							<p>No students match that search.</p>
						)}

						{currentStudent && (
							<StudentCard
								student={currentStudent}
								showName={showName}
								showMascot={showMascot}
								showImage={showImage}
								showPersonalStatement={showPersonalStatement}
								showBackgrounds={showBackgrounds}
								showClasses={showClasses}
								showExtras={showExtras}
								showQuote={showQuote}
								showLinks={showLinks}
							/>
						)}
					</section>
				</>
			)}
		</main>
	);
}

/**
 * Card for a single student, controlled by checkboxes.
 */
function StudentCard({
	student: s,
	showName,
	showMascot,
	showImage,
	showPersonalStatement,
	showBackgrounds,
	showClasses,
	showExtras,
	showQuote,
	showLinks
}) {
	const displayName = s.name.preferred?.trim()
		? `${s.name.preferred} ${s.name.last}`
		: `${s.name.first} ${s.name.last}`;

	return (
		<article className="student-card">
			{/* Name / Mascot */}
			{(showName || showMascot) && (
				<header>
					{showName && <h2>{displayName}</h2>}
					{showName && (
						<p className="student-prefix">NinerNET: {s.prefix}</p>
					)}
					{showMascot && (
						<p className="student-mascot">Mascot: {s.mascot}</p>
					)}
				</header>
			)}

			{/* Photo */}
			{showImage && s.media?.hasImage && (
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

			{/* Backgrounds */}
			{showBackgrounds && (
				<section className="student-backgrounds">
					<h3>Background</h3>
					<p>
						<strong>Personal: </strong>
						{s.backgrounds.personal}
					</p>
					<p>
						<strong>Professional: </strong>
						{s.backgrounds.professional}
					</p>
					<p>
						<strong>Academic: </strong>
						{s.backgrounds.academic}
					</p>
				</section>
			)}

			{/* Classes */}
			{showClasses && s.courses?.length > 0 && (
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
			{showPersonalStatement && s.personalStatement && (
				<section className="student-statement">
					<h3>Personal Statement</h3>
					<p>{s.personalStatement}</p>
				</section>
			)}

			{/* Extra Info: subject, computer/platform, fun fact, additional */}
			{showExtras && (
				<section className="student-extra">
					<h3>Extra Information</h3>

					{s.subject && (
						<p>
							<strong>Subject / Computer Experience: </strong>
							{s.subject}
						</p>
					)}

					{s.platform && (
						<p>
							<strong>Platform: </strong>
							{s.platform.device} running {s.platform.os}
						</p>
					)}

					{s.funFact && (
						<p>
							<strong>Fun fact: </strong>
							{s.funFact}
						</p>
					)}

					{s.additional && (
						<p>
							<strong>Additional: </strong>
							{s.additional}
						</p>
					)}
				</section>
			)}

			{/* Quote */}
			{showQuote && s.quote?.text && (
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

			{/* Links */}
			{showLinks && (
				<section className="student-links">
					<h3>Links</h3>
					<ul>
						{s.links?.charlotte && (
							<li>
								<a
									href={s.links.charlotte}
									target="_blank"
									rel="noreferrer"
								>
									Charlotte web pages
								</a>
							</li>
						)}
						{s.links?.itis3135 && (
							<li>
								<a
									href={s.links.itis3135}
									target="_blank"
									rel="noreferrer"
								>
									ITIS 3135 site
								</a>
							</li>
						)}
						{s.links?.github && (
							<li>
								<a
									href={s.links.github}
									target="_blank"
									rel="noreferrer"
								>
									GitHub
								</a>
							</li>
						)}
						{s.links?.githubio && (
							<li>
								<a
									href={s.links.githubio}
									target="_blank"
									rel="noreferrer"
								>
									GitHub Pages
								</a>
							</li>
						)}
						{s.links?.freecodecamp && (
							<li>
								<a
									href={s.links.freecodecamp}
									target="_blank"
									rel="noreferrer"
								>
									freeCodeCamp
								</a>
							</li>
						)}
						{s.links?.codecademy && (
							<li>
								<a
									href={s.links.codecademy}
									target="_blank"
									rel="noreferrer"
								>
									Codecademy
								</a>
							</li>
						)}
						{s.links?.linkedin && (
							<li>
								<a
									href={s.links.linkedin}
									target="_blank"
									rel="noreferrer"
								>
									LinkedIn
								</a>
							</li>
						)}
					</ul>
				</section>
			)}
		</article>
	);
}