const router = require("express").Router();
const noteController = require("../controllers/note-controller");
const clientController = require("../controllers/client-controller");

router
  .route("/getAllClients")
  .get(clientController.getAllClients)

router
  .route("/getAllNotes")
  .get(noteController.getAllNotes)

router
  .route("/clients/client:id")
  .get(clientController.viewClient);

router
  .route("/notes/client:id")
  .get(clientController.viewClientNotes)
  .post(noteController.newNote);

router
  .route("/notes/note:id")
  .get(noteController.viewNote);

router
  .route("/delete/note:id")
  .get(noteController.deleteNote)

router
  .route("/delete/client:id")
  .get(clientController.deleteClient)

router.route("/edit/Note:id")
  .post(noteController.updateNote);

router
  .route("/clients")
  .post(clientController.newClient)

module.exports = router;