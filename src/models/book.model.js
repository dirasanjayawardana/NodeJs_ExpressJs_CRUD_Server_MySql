const db = require("../configs/db.config");

// query untuk CRUD
module.exports = {
    // read or retrieve data
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM books;`, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // save new data
    saveBook: ({ title, desc, author }) => {
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

    // update data
    updateBook: ({ id, title, desc, author }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE books SET title = ?, description = ?, author = ? WHERE id = ?`,
                [title, desc, author, id],
                (err, rows, fields) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    },

    // delete data by id
    deleteBook: ({ id }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE FROM books WHERE id = ?`,
                [id],
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
