CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);
INSERT INTO songs (id, song_title, notes)
VALUES (
		1,
		'Ode to Joy (Dubstep Remix)',
		'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'
	),
	(
		2,
		'Moonlight Sonata (Techno Remix)',
		'C#4 D#4 E4 F#4 G#4 A#4 B4 C#5 D#5 E5 F#5 G#5 A#5 B5 C#6 D#6 E6 F#6 G#6 A#6 B6 C#7 D#7'
	),
	(
		3,
		'Für Elise (House Remix)',
		'E5 D#5 E5 D#5 E5 B4 D5 C5 A4 A4 C5 E4 A4 B4 E4 G#4 B4 C5'
	),
	(
		4,
		'Bohemian Rhapsody (Disco Remix)',
		'Bb4 Bb4 Bb4 Bb4 Bb4 Bb4 Bb4 Bb4 Bb4 C5 D5 Eb5 F5 F5 F5 F5 G5 G5 G5 G5 G5 G5 G5 G5 A5 Bb5 Bb5 Bb5 Bb5 Bb5 Bb5 Bb5 Bb5 Bb5 Bb5 C6 D6 Eb6 F6 F6 F6 F6 G6 G6 G6 G6 G6 G6 G6 G6 A6 Bb6 Bb6 Bb6 Bb6 Bb6 Bb6 Bb6 Bb6 Bb6 Bb6 C7'
	),
	(
		5,
		'Stairway to Heaven (Reggae Remix)',
		'D4 D4 F4 G4 G4 A4 A4 Bb4 Bb4 A4 G4 G4 D4 D4 F4 G4 G4 A4 A4 Bb4 Bb4 A4 G4 G4 D4 D4 F4 G4 G4 A4 A4 Bb4 Bb4 A4 G4 G4 D4 D4 F4 G4 G4 A4 A4 Bb4 Bb4 A4 G4 G4 D4 D4 F4 G4 G4 A4 A4 Bb4 Bb4 A4 G4 G4'
	),
	(
		6,
		'The Entertainer (Hip-Hop Remix)',
		'D4 D4 D4 D4 E4 G4 D5 G4 E4 C4 E4 A4 D5 D4 D4 D4 D4 E4 G4 D5 G4 E4 C4 E4 A4 D5 Bb4 Bb4 Bb4 Bb4 C5 E5 Bb5 E5 C5 A4 C5 F5 Bb5 Bb4 Bb4 Bb4 Bb4 C5 E5 Bb5 E5 C5 A4 C5 F5 Bb5 D5 D5 D5 D5 F5 A5 D6 F5 C5 F5 Bb5 E5 G5 C6 F5 A5 D6 F5 C5 F5 Bb5 E5 G5 C6 F5 C6'
	);