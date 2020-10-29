const Client = require("../db").Client;
const axios = require("axios");

exports.viewClient = async (req, res) => {
  try {
    let clientId = req.params.id;
    let thisClient = await Client.findByPk(clientId);
    res.json(thisClient);
  } catch (error) {
    console.log("HERE'S THE ERROR IN VIEWCLIENT: " + error);
  }
};

exports.viewClientNotes = async (req, res) => {
  try {
    let clientId = req.params.id;
    const thisClient = await Client.findByPk(clientId);
    const clientNotes = await thisClient.getNotes();
    console.log(clientNotes)
    res.json(clientNotes);
  } catch (error) {
    console.log("HERE'S THE ERROR IN VIEWCLIENTNOTES" + error);
  }
}

exports.getAllClients = async (req, res) => {
  try {
    let allClients = await Client.findAll();
    res.json(allClients);
  } catch (error) {
    console.log("HERE/'S THE ERROR " + error);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const obsoleteClient = await Client.findByPk(clientId);
    let name = obsoleteClient.clientName;
    if (!obsoleteClient) {
      res.status(404).send();
      return;
    }
    await obsoleteClient.destroy();
    console.log(`Client "${name}" was deleted`);
    res.json("client was deleted");
  } catch (error) {
    console.log("HERE'S THE ERROR IN DELETECLIENT: " + error);
  }
};


exports.newClient = async (req, res) => {
  try {
    console.log(req.body)
    //always create 'all clients' as client with id 1 if not already created
    let allClientsClient1 = {
      clientName: "General/All Clients", ownedByUser: false, ownedBy: "N/A", keyClient: false,
      reqQuote: false, reqQuoteApproval: false, standardDiscount: 0, revisionLog: "created client"
    };
    let thisClient;
    let allClients = await Client.findAll();
    if (allClients.length <= 1) {
      await Client.create(allClientsClient1);
      thisClient = await Client.create(req.body);
    } else {
      thisClient = await Client.create(req.body);
    }
    axios.post(`https://api.netlify.com/build_hooks/5f92416876a5163859e835d1`)
    res.json("client was created")
  } catch (error) {
    console.log("HERE'S THE ERROR IN NEWCLIENT: " + error);
  }
};