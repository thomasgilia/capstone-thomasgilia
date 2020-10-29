const Note = require("../db").Note;
const Client = require("../db").Client;

exports.viewNote = async (req, res) => {
  try {
    let noteId = req.params.id;
    let resources = await Note.findByPk(noteId);
    res.json(resources);
  } catch (error) {
    console.log("HERE'S THE ERROR IN VIEWNOTE" + error);
  }
}

exports.newNote = async (req, res) => {
  try {
    let clientId = req.body.clientId
    let reqBodyObj = req.body.input;
    let newNote = await Note.create(reqBodyObj);
    let noteId = newNote.id;
    // //----------begin add client functionality
    const thisClient = await Client.findByPk(clientId);
    const clientNotes = await thisClient.getNotes();
    let noteIdArray = [noteId];
    for (let note of clientNotes) {
      noteIdArray.push(note.id);
    };
    //--set/reset all notes to that client
    await thisClient.setNotes(noteIdArray);
    const updatedClientNotes = await thisClient.getNotes(); 
    console.log(updatedClientNotes)
    res.json(clientId)
  } catch (error) {
    console.log("HERE'S THE ERROR IN NEWNOTE: " + error);
  }
};

exports.updateNote = async (req, res) => {
  try {
    let noteId = req.body.id;
    console.log(req.body.input)
    let reqBodyObj = req.body.input;
    await Note.upsert(reqBodyObj);
    res.json("note was updated")
  } catch (error) {
    console.log("HERE'S THE ERROR IN UPDATENOTE: " + error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const obsoleteNote = await Note.findByPk(noteId);
    let title = obsoleteNote.title;
    if (!obsoleteNote) {
      res.status(404).send();
      return;
    }
    await obsoleteNote.destroy();
    console.log(`Note "${title}" was deleted`);
    res.json("note was deleted");
  } catch (error) {
    console.log("HERE'S THE ERROR IN DELETENOTE: " + error);
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    let notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.log("HERE/'S THE ERROR " + error);
  }
};