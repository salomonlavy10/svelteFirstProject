import sqlite3 from 'better-sqlite3';

const db = sqlite3('chatdatabase.db');

db.exec(`
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    created_at DATETIME DEFAULT (datetime('now', 'localtime'))
    )
    `);

/**
 * @param {unknown} content
 */
export function addMessage(content) {
    const statement = db.prepare('INSERT INTO messages (content) VALUES (?)');
    statement.run(content);
}

export function getMessages(){
    const statement = db.prepare('SELECT * FROM messages ORDER BY created_at DESC');
    return statement.all();
}
