const { connection } = require('../db');

const router = require('express').Router()

router.post("/addcourse", (req,res)=>{
    const {course, fees, duration} = req.body ;
    const sql = `CREATE TABLE IF NOT EXISTS course (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course VARCHAR(255) NOT NULL,
        fees VARCHAR(255) NOT NULL,
        duration VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
    
    connection.query(sql , function(err){
        if(err){throw err}
        const check = "SELECT * FROM course WHERE course = ? ";

        connection.query(check,[course],function(err,response){
          if (err) { throw err}
    
          if(response.length > 0){
            res.json({message : " course Already Exists"})
          }else{
            const insertData = "INSERT INTO course (course , fees , duration) VALUES (?,?,?)";
            
            connection.query(insertData,[course,fees,duration],function(err){
              if(err){throw err}
              res.send({success : "Course Added Successfull"})
            })
          }
        })
        })
 })

 router.get('/getcourse', (req,res)=>{
  const sql = "SELECT * FROM course";

  connection.query(sql,function(err,result){
    if(err) {throw err}

    if(result){
      res.json(result)
    }else{
      res.json({message : "There is no Course"})
    }
  })
 })

 router.put('/updatecourse', (req,res)=>{
  const {course, fees, duration, id} = req.body ;

  const sql = "UPDATE course SET course = ? , fees = ? , duration = ? WHERE id = ?";

  const response = "SELECT * FROM course WHERE id = ?"

  connection.query(sql, [course,fees,duration, id],function(err,result){
    if(err) {throw err}

    if(result){
      connection.query(response,[id],function(err,result){
        if (err) {throw err}

        if(result){
          res.json(result[0])
        }
      })
    }else{
      res.json({message : "Update not succesfully"})
    }
  })
 })

 router.delete('/deletecourse', (req, res) => {
  const { id } = req.body;
  console.log(id)

  const deleteSql = "DELETE FROM course WHERE id = ?";
  const selectSql = "SELECT * FROM course WHERE id = ?";

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
          res.status(404).json({ error: "Course Not Found"});
      }
  });
});




 module.exports = router;