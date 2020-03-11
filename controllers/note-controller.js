// TO DO:


const Note = require("../db").Note;
const Doc = require("../db").Doc; //just for associating docs - take out if doesn't work
const Client = require("../db").Client;

//working but replaced with listAllResources
// exports.getAllNotes = async (req, res) => {
//   try {
//     let notes = await Note.findAll();
//     res.json(notes);
//   } catch (error) {
//     console.log("HERE/'S THE ERROR" + error);
//   }
// };

//can combine/but on notedoc page later if want
//works - just brings up the form with a get. then the next function will populate and post to same route
exports.newResource = (req, res) => {
  res.render('createNoteOrDoc', { action: 'notes', buttonText: 'Create Note' });
};
// exports.CreateResource = async (req, res) => {
//   // let resourceType = req.param.resourceType; //have to add to param...
//   let resourceType = "Document"; //temporary
//   if (resourceType == "Document") {
//     res.render("createNoteOrDoc", {
//       action: "NewDoc",
//       buttonText: "Create a new Document",
//     });
//   } else if (resourceType == "NewNote") {
//     //from button on form
//     res.render("createNoteOrDoc", {
//       action: "createResource",
//       buttonText: "Create a new Note",
//     });
//   }
// };

//-----------------think need s/t like this for my fields
// let username = req.body.username;
//   let password = req.body.password;

/* <form action="/update" method="POST">
  First Name: <input type="text" name="firstName" value="{{ student.firstName }}" />
  <br/>
  Last Name: <input type="text" name="lastName" value="{{ student.lastName }}" />
  <br/>
  Phone: <input type="text" name="phone" value="{{ student.phone }}" />
  <br/>
  <input type="hidden" name="id" value="{{ student.id }}" />
  <button class="btn btn-primary" type="submit">Submit</button>
</form> */

// exports.updateStudent = async (req, res) => {
//   req.body.userId = req.user.id;
//   await Student.upsert(req.body);  //  { firstName: "Bob", lastName: "Smith", userId: 2, phone: "555-5555" }
//   res.redirect('/');
// }

exports.newNote = async (req, res) => {
  try {
    let resources = await Note.create(req.body);
    //may not need the below but it resulted in cleaner list view:
    // let thisNote = await Note.create(req.body); //let resources = await Note.upsert(req.body);  this also worked to create note from form
    // let thisNoteObj = thisNote.get({plain: true});   //gives the note (just created) body as an object so can directly access id
    //   // console.log(resources.id); //gives id
    // let id = thisNoteObj.id;
    let clientId = resources.clientId;
    let thisClient = await Client.findByPk(clientId);
    res.render("viewNoteOrDoc", { resourceType: "Note", resources, thisClient });
  } catch (error) {
    console.log("HERE'S THE ERROR" + error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const obsoleteNote = await Note.findByPk(id);
    if (!obsoleteNote) {
      res.status(404).send();
      return;
    }
    await obsoleteNote.destroy();
    res.json(obsoleteNote);
  } catch (error) {
    console.log("HERE/'S THE ERROR" + error);
  }
};

// //need to fix
// exports.updateNote = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const note = req.body.note;
//         const existingNote = await Note.findByPk(id);
//         let docs = await Doc.findAll();
//         await existingNote.setDoc(docs[0])          //referring to the whole instance of a doc here - need to ref
//         // the id of the instance instead? also is it setDocs not docs?

//         // if (!existingNote) {
//         //     res.status(404).send();
//         //     return;
//         // }
//         // const updatedNote = await existingNote.update(note);
//         // res.json(updatedNote);
//     }
//     catch (error) {
//         console.log(error);
//     }
// };

// // await foo.addBars([bars1,bars2])

exports.updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = req.body;
    const existingNote = await Note.findByPk(id);
    if (!existingNote) {
      res.status(404).send();
      return;
    }
    const updatedNote = await existingNote.update(note);
    res.json(updatedNote);
  } catch (error) {
    console.log(error);
  }
};
