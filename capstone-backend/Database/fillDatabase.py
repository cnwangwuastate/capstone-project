import csv
import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS plans (planID TEXT PRIMARY KEY, overallSQFT INTEGER, lengthFt INTEGER, lengthIn INTEGER, widthFt INTEGER, widthIn INTEGER, heightFt INTEGER, heightIn INTEGER, floors INTEGER NOT NULL DEFAULT 1)")
cursor.execute("CREATE TABLE IF NOT EXISTS Users (userID TEXT PRIMARY KEY, email TEXT UNIQUE, passwordHash TEXT)")

def parse_and_insert(line):
    planID, overallSQFT, length, width, height, floors = line
    # Parsing length
    length_parts = length.split("'")
    lengthFt = int(length_parts[0])
    if len(length_parts) > 1:
        lengthIn = int(length_parts[1].split('"')[0])  # Extract inches
    else:
        lengthIn = 0
    
    # Parsing width
    width_parts = width.split("'")
    widthFt = int(width_parts[0])
    if len(width_parts) > 1:
        widthIn = int(width_parts[1].split('"')[0])  # Extract inches
    else:
        widthIn = 0
    
    # Parsing height
    height_parts = height.split("'")
    heightFt = int(height_parts[0])
    if len(height_parts) > 1:
        heightIn = int(height_parts[1].split('"')[0])  # Extract inches
    else:
        heightIn = 0
    
    cursor.execute('''INSERT INTO plans (planID, overallSQFT, lengthFt, lengthIn, widthFt, widthIn, heightFt, heightIn, floors)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);''', (planID, int(overallSQFT), lengthFt, lengthIn, widthFt, widthIn, heightFt, heightIn, int(floors)))

with open('dataSeed.csv') as csvfile:
    csv_reader = csv.reader(csvfile)
    for row in csv_reader:
        parse_and_insert(row)

conn.commit()
conn.close()
