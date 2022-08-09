const notes_router = require('express').Router();
const fs = require('fs')
const path = require('path')
const db_path = path.join(__dirname, '../db/db.json')

function getNotesData() {
  return fs.promises.readFile(db_path, 'utf8')
    .then(data => JSON.parse(data));
}

notes_router.get('/notes', (req, res) => {
  getNotesData()
    .then(notes_data => {
      res.json(notes_data)
    })
    .catch(err => console.log(err));
});

module.exports = notes_router;