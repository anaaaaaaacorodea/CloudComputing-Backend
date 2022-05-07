const connection = require("./db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

// ------------------------------------------DEFINIRE ENDPOINTURI ----------------------------------------  

//pt testare postman request
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// GET din bd
router.get("/", (req, res) => {
    connection.query("SELECT * FROM messages", (err, results) => {
      if (err) {
        return res.send(err);
      }
  
      return res.json({
        data: results,
      });
    });
  });

//GET by id
router.get("/:id", (req, res) => {
  const {id} = req.params;
  connection.query(`SELECT * FROM messages where entryID =  ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      return res.send(err);
    }

    if (results.length === 0) {
        return res.status(404).send("Message not found.");
    }

    return res.json({
      data: results,
    });
  });
});

// POST in bd
router.post("/", (req, res) => {
  // console.log(req.body);
  // return res.send("Ok");

  const { 
    senderName, 
    senderMail, 
    receiverMail, 
    messageContent 
  } = req.body;
  
  //Bad req error - daca vreun param e null
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    return res.status(400).send("Bad request. Missing parametres.");
  }

  //insert in BD
  const queryString = `INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) VALUES (
  ${mysql.escape(senderName)}, 
  ${mysql.escape(senderMail)}, 
  ${mysql.escape(receiverMail)}, 
  ${mysql.escape(messageContent)}
  )`;
  //escapre => folosit pt securitaet
  
  //test conex la bd
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
  
  //punem si intr-un json
    return res.json({
      data: results,
    });
  });

});

// DELETE by id in bd
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `DELETE FROM messages WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }
      if (results.length === 0) {
          return res.status(404).send("Message not found.");
      }
      return res.json({
          results,
      });
  }
  );
}
);

// UPDATE by id in bd
router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const { senderName, senderMail, receiverMail, messageContent } = req.body;
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(receiverMail)}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }
      if (results.length === 0) {
          return res.status(404).send("Message not found.");
      }
      return res.json({
          results,
      });
  }
  );
}
);
  
module.exports = router;