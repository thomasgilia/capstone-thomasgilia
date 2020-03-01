const Note = require("../db").Note;
const Doc = require("../db").Doc;
const Client = require("../db").Client;
const User = require("../db").User;

//Many(Notes)-To-Many(Docs)//
exports.associateDocsToNote = async (req, res) => {
  try {
    console.log(req.body);
    let { noteId, docId } = req.body; //example request body is { noteId: 1, docId:[2,3] }  note can't be array
    //but docs can because many notes
    console.log("this is docID: " + docId + ", this is noteID: " + noteId);

    //associating the docs to the note:
    const existingNote = await Note.findByPk(noteId);
    await existingNote.addDocs(docId); //addDocs to add array of mult docs, addDoc to add one doc not in array

    //to get all of the docs associated with that particular note:
    //(like a one to many via fk except it is smart enough to know that it has to go through join table to access Doc)
    const updatedNote = await Note.findByPk(noteId, { include: [Doc] });
    res.send(updatedNote);
  } catch (error) {
    console.log("HERE'S THE ERROR" + error);
  }
};

exports.associateNotesToDoc = async (req, res) => {
  try {
    const { noteId, docId } = req.body;
    const existingDoc = await Doc.findByPk(docId);
    await existingDoc.addNotes(noteId);
    const updatedDoc = await Doc.findByPk(docId, { include: [Note] });
    res.send(updatedDoc);
  } catch (error) {
    console.log("HERE/'S THE ERROR" + error);
  }
};

//Many(Clients)-To-Many(Users)//
exports.associateClientsToUser = async (req, res) => {
  try {
    const { uClientId, userId } = req.body;
    const existingUser = await User.findByPk(userId);
    await existingUser.addClients(uClientId);
    const updatedUser = await User.findByPk(userId, { include: [Client] });
    res.send(updatedUser);
  } catch (error) {
    console.log("HERE'S THE ERROR" + error);
  }
};

exports.associateUsersToClient = async (req, res) => {
  try {
    const { uClientId, userId } = req.body;
    const existingClient = await User.findByPk(userId);
    await existingClient.addUser(userId);
    const updatedClient = await Client.findByPk(uClientId, { include: [User] });
    res.send(updatedClient);
  } catch (error) {
    console.log("HERE'S THE ERROR" + error);
  }
};

//--One(Client)-To-Many(Notes)--//
exports.associateClientToNote = async (req, res) => {
    try {
      const clientId = req.body.clientId;
      const noteId = req.body.noteId;
      const existingClient = await Client.findByPk(clientId);
      await existingClient.setNotes(noteId);
      let newNote = await existingClient.getNotes(clientId);
      let checkClientOnNote = [newNote[0].clientId];
      res.send("Note " + noteId + " is now associated with client " + checkClientOnNote);
    } catch (error) {
      console.log("HERE'S THE ERROR: " + error);
    }
  };


//---FOR LATER---//
//later can think about combining these. Thoughts:
//grab input from form in browser - the 'source' would be a single id and the 'targets' would be an array so can use
//sourceInstance.addTargets(targetId);  problem may be for a single target, it wont like the addTargets being a single
//value in array? may need to have an if based on array length
//anyway, then there could be just one export function like this roughly:
//exports.associateTargetsToSource =....
//targetsIds = [brought in variable name]
//sourceId = [brought in variable name]

//   once associate existing client to existing note, can add feature to deal with new note etc
//   const noteId = req.params.id;
//   if (note){
//     const existingNote = await Note.findByPk(noteId);
//   }
//   else if (!note){
//             const note = req.body;

//             let clientId = await req.body;