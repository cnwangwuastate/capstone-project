CREATE TABLE IF NOT EXISTS plans (
    planID TEXT PRIMARY KEY,
    overallSQFT INTEGER NOT NULL,
    length INTEGER,
    width INTEGER,
    height INTEGER,
    floors INTEGER NOT NULL DEFAULT 1,
    buildingType TEXT,
    bathrooms INTEGER DEFAULT 1
    specialFeatures TEXT
);

CREATE TABLE IF NOT EXISTS Users (
    userID TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL

);