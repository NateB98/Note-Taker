const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));

module.exports = function(app) {

  // gathers all notes
  // localhost:2222/api/notes
  app.get('/api/notes', (req, res) => {
    getNotesData()
      .then(notes_data => {
        res.json(notes_data)
      })
      .catch(err => console.log(err));
  });

  // creates a new note
  app.post('/api/notes', (req, res) => {
    getNotesData()
      .then(notes_data => {
        const new_note = req.body;
        const note_id = notes_data.length ? notes_data[notes_data.length - 1].id : 0;
        new_note.id = note_id + 1

        notes_data.push(new_note);

        fs.writeFileSync('./Develop/db/db.json', JSON.stringify(data), function(err) {
          if(err) throw(err);
        });
        res.json(data);
      })
  })

  // Deletes a note
  app.delete('/api/notes', (req, res) => {
    getNotesData()
      .then(notes => {
        const id = req.body.id;
        const obj = notes.find(note => note.id === id);
        const index = notes.indexOf(obj);

        notes.splice(index, 1);

        fs.writeFileSync('./Develop/db/db.json', JSON.stringify(data));
        res.json(data)
      });
  });
}