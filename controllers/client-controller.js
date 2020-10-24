const Client = require("../db").Client;
const axios = require("axios");

exports.viewClient = async (req, res) => {
  try {
    let clientId = req.params.id;
    let thisClient = await Client.findByPk(clientId);
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(thisClient);
  } catch (error) {
    console.log("HERE'S THE ERROR IN VIEWCLIENT: " + error);
  }
};

exports.viewClientNotes = async (req, res) => {
  try {
    // console.log(req)
    let clientId = req.params.id;
    // let clientId = 1;
    const thisClient = await Client.findByPk(clientId);
    const clientNotes = await thisClient.getNotes();
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(clientNotes)
    res.json(clientNotes);
    //  res.json(clientNotes);
  } catch (error) {
    console.log("HERE'S THE ERROR IN VIEWCLIENTNOTES" + error);
  }
}

exports.getAllClients = async (req, res) => {
  try {
    let allClients = await Client.findAll();
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(allClients);
  } catch (error) {
    console.log("HERE/'S THE ERROR " + error);
  }
};


//-----------------------------------end new note-doc-app code---------------------
exports.newClientPage = (req, res) => {
  res.render('createClient', { existingClient: false });
};

exports.newClient = async (req, res) => {
  try {
    console.log(req.body)
    //always create 'all clients' as client with id 1 if not already created
    let allClientsClient1 = {
      clientName: "General/All Clients", ownedByUser: false, ownedBy: "N/A", keyClient: false,
      reqQuote: false, reqQuoteApproval: false, standardDiscount: 0, revisionLog: ""
    };
    let thisClient;
    let allClients = await Client.findAll();
    if (allClients.length <= 1) {
      await Client.create(allClientsClient1);
      thisClient = await Client.create(req.body);
    } else {
      thisClient = await Client.create(req.body);
    }
    console.log(thisClient)
    // res.header("Access-Control-Allow-Origin", "*");
    // res.json(thisClient)
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    axios.post(`https://api.netlify.com/build_hooks/5f92416876a5163859e835d1`)
    res.json(thisClient)
    // res.redirect("/");      //????????????????????????????????????/
  } catch (error) {
    console.log("HERE'S THE ERROR IN NEWCLIENT: " + error);
  }
};

exports.viewClientOld = async (req, res) => {
  try {
    let clientId = req.params.id;
    let thisClient = await Client.findByPk(clientId);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(thisClient);
  } catch (error) {
    console.log("HERE'S THE ERROR IN VIEWCLIENT: " + error);
  }
};

exports.listClients = async (req, res) => {
  try {
    let allClients = await Client.findAll();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(allClients);
  } catch (error) {
    console.log("HERE'S THE ERROR IN LISTCLIENTS: " + error);
  }
};



// exports.listClients = async (req, res) => {
//   try {
//     let allClients = await Client.findAll();
//     console.log(allClients);
//     console.log("THIS IS THE RES: " + res)
//     // res.render('listClients', { allClients });
//   } catch (error) {
//     console.log("HERE'S THE ERROR IN LISTCLIENTS: " + error);
//   }
// };

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
// exports.listClients = async (req, res, next) => {
//   try {
//     const response = await axios.get('localhost:32772/capstone')
//   // let allClients = await Client.findAll();
//   // let res = await Client.findAll();
//   // console.log(allClients);   //is working, gives promise or obj of exsiting clients
//   console.log("THIS IS THE RES: " + res)    //is an array of arrays of sequlize instance
//   // res.render('listClients', { allClients });
// } catch (error) {
//   console.log("HERE'S THE ERROR IN LISTCLIENTS: " + error);
// }
// }

// //-----------end experimentation code--------------------