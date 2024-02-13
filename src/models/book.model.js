const db = require("../configs/db.config");

// query untuk CRUD
module.exports = {
  // read or retrieve data
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM books;`, (err, rows, fields) => {
        if (err) reject(err);
        console.log(rows);
        resolve(rows);
      });
    });
  },

  saveBook: ({title, desc, author}) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO books (title, description, author) VALUES (?, ?, ?)`,
        [title, desc, author],
        (err, rows, fields) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },
};

// //=== menggunakan async await
// const db = require("../configs/db.config");

// // query untuk CRUD
// module.exports = {
//   // read or retrieve data
//   findAll: async () => {
//     try {
//       const queryResult = await db.query(`SELECT * FROM books;`);
//       console.log(queryResult);
//       return queryResult;
//     } catch (error) {
//       throw error;
//     }
//   },
// };
