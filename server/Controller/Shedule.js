const { connection } = require('../db');

const router = require('express').Router()

router.post("/addshedule", (req,res)=>{
    const {course, date, starttime, endtime, venue} = req.body ;
    const sql = `CREATE TABLE IF NOT EXISTS shedule (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        starttime VARCHAR(255) NOT NULL,
        endtime VARCHAR(255) NOT NULL,
        venue VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
    
    connection.query(sql , function(err){
        if(err){throw err}
            const insertData = "INSERT INTO shedule (course , date , starttime, endtime, venue) VALUES (?,?,?,?,?)";
            
            connection.query(insertData,[course,date,starttime, endtime, venue],function(err){
              if(err){throw err}
              res.send({success : "Shedule Added Successfull"})
            })
        })
 })

 router.get('/getShedule', (req,res)=>{
  const sql = "SELECT * FROM shedule";

  connection.query(sql,function(err,result){
    if(err) {throw err}

    if(result){
      res.json(result)
    }else{
      res.json({message : "There is no shedule"})
    }
  })
 })

 router.put('/updateschedule', (req, res) => {
    const { id, course, date, starttime , endtime, venue } = req.body;
  
    const sql = "UPDATE shedule SET course = ?, date = ?, starttime = ?, endtime = ?, venue = ? WHERE id = ?";
    const response = "SELECT * FROM shedule WHERE id = ?";
  
    connection.query(sql, [course, date, starttime, endtime, venue, id], function(err, result) {
      if (err) {
        throw err;
      }
  
      if (result) {
        connection.query(response, [id], function(err, result) {
          if (err) {
            throw err;
          }
  
          if (result) {
            res.json(result[0]);
          }
        });
      } else {
        res.json({ message: "Update not successful" });
      }
    });
  });
  
 router.delete('/deletesehdule', (req, res) => {
  const { id } = req.body;

  const deleteSql = "DELETE FROM shedule WHERE id = ?";
  const selectSql = "SELECT * FROM shedule WHERE id = ?";

  connection.query(deleteSql, [id], function (err, deleteResult) {
      if (err) {
          throw err;
      }

      if (deleteResult) {
          connection.query(selectSql, [id], function (err, selectResult) {
              if (err) {
                  throw err;
              }
              
              if(selectResult){
                res.json({id:id})
              }

          });
      } else {
          res.status(404).json({ message: "Shedule Not Found"});
      }
  });
});




 module.exports = router;