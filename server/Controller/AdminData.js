const { connection } = require('../db');

const router = require('express').Router()

router.post("/createadmin", (req,res)=>{
    const {name, email, password} = req.body ;
  
    const check = "SELECT * FROM admin WHERE email = ? ";

    connection.query(check,[email],function(err,response){
      if (err) { throw err}

      if(response.length > 0){
        res.json({message : " Email Already Exists"})
      }else{
        const sql = `CREATE TABLE IF NOT EXISTS admin (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`;
      
          const insertData = "INSERT INTO admin (name , email , password) VALUES (?,?,?)";
          
          connection.query(sql , function(err){
            if(err){throw err}
          })
          
          connection.query(insertData,[name,email,password],function(err){
            if(err){throw err}
            res.send({success : "Register Added Successfull"})
          })
      }
    })

   
 })

 router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const verifyQuery = "SELECT * FROM admin WHERE email = ? AND password = ?";
    
  connection.query(verifyQuery, [email, password], function(err, results) {
      if (err) {
          console.error("Error in sign-in query:", err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
      }

      if (results.length > 0) {
        res.json({ id: results[0].id, success: true });
      } else {
          res.json({ message: "Invalid credentials" });
      }
  });
});

router.post("/studentsignin", (req, res) => {
  const { email, password } = req.body;

  const verifyQuery = "SELECT * FROM students WHERE email = ? AND password = ?";
    
  connection.query(verifyQuery, [email, password], function(err, results) {
      if (err) {
          console.error("Error in sign-in query:", err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
      }

      if (results.length > 0) {
          res.json({id:results[0].id ,student: true });
      } else {
          res.json({ message: "Invalid credentials" });
      }
  });
});

router.get('/getadmin', (req,res)=>{
  const sql = "SELECT * FROM admin";

  connection.query(sql,function(err,result){
    if(err) {throw err}

    if(result){
      res.json(result)
    }else{
      res.json({message : "There is no Course"})
    }
  })
 })

 module.exports = router;