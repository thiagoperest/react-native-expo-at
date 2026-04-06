import * as SQLite from 'expo-sqlite';

let dbPromise = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('movies.db').then(async (database) => {
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS favorite_movies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          movie_id INTEGER NOT NULL UNIQUE,
          title TEXT NOT NULL,
          poster_url TEXT NOT NULL
        );
      `);
      return database;
    });
  }
  return dbPromise;
}

export async function initializeDb() {
  await getDb();
}

export async function addFavorite(movie) {
  const db = await getDb();
  await db.runAsync(
    'INSERT OR IGNORE INTO favorite_movies (movie_id, title, poster_url) VALUES (?, ?, ?)',
    [movie.id, movie.title, `https://picsum.photos/seed/${movie.id}/60/60`]
  );
}

export async function removeFavorite(movieId) {
  const db = await getDb();
  await db.runAsync(
    'DELETE FROM favorite_movies WHERE movie_id = ?',
    [movieId]
  );
}

export async function isFavorite(movieId) {
  const db = await getDb();
  const result = await db.getFirstAsync(
    'SELECT id FROM favorite_movies WHERE movie_id = ?',
    [movieId]
  );
  return !!result;
}

export async function getFavorites() {
  const db = await getDb();
  return await db.getAllAsync(
    'SELECT * FROM favorite_movies ORDER BY id DESC'
  );
}
