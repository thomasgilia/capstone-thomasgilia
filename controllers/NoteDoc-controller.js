const Note = require("../db").Note;
const Doc = require("../db").Doc;

exports.listAllResources = async (req, res) => {
  try {
    let { resourceType } = req.body;
    let isNote;
    if (resourceType === "Note") {
      let resources = await Note.findAll();
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // res.json({ resourceType: "Note", resources, isNote: true }); //need to pass resource type?
      res.json(resources)
    } else if (resourceType === "Document") {
      let resources = await Doc.findAll();
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // res.json({ resourceType: "Note", resources, isNote: true }); //need to pass resource type?
      res.json(resources)
    } else { res.redirect('/'); }
  } catch (error) {
    console.log("HERE'S THE ERROR: " + error);
  }
};

//-----------------------------------------new Note-Doc-App hookup------------------
exports.getAllResources = async (req, res) => {
  try {
    let { resourceType } = req.body;
    if (resourceType === "Note") {
      let resources = await Note.findAll();
      res.render("listNotesOrDocs", { resourceType: "Note", resources, isNote: true });
    } else if (resourceType === "Document") {
      let resources = await Doc.findAll();
      res.render("listNotesOrDocs", { resourceType: "Document", resources });
    } else { res.redirect('/'); }
  } catch (error) {
    console.log("HERE'S THE ERROR: " + error);
  }
};

