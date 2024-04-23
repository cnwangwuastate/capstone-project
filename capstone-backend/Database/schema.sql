CREATE TABLE IF NOT EXISTS plans (
    planID TEXT PRIMARY KEY,
    overallSQFT INTEGER NOT NULL,
    lengthFt INTEGER,
    lengthIn INTEGER,
    widthFt INTEGER,
    widthIn INTEGER,
    heightFt INTEGER,
    heightIn INTEGER,
    floors INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Users (
    userID TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    passwordHash TEXT
);