import fs from 'fs';
import path from 'path';

export const checkDatabaseExists = () =>
  fs.existsSync(path.join(__dirname, 'db', 'database.db'));
