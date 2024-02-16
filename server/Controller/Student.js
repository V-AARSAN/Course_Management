const { connection } = require('../db');

const router = require('express').Router()

router.post("/addstudent", (req,res)=>{
    const { studentName, gender, age, email, course, joinedDate, fees, username , password  } = req.body ;
    const sql = `CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        age INT(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL,
        joined_date VARCHAR(255) NOT NULL,
        fees VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    connection.query(sql, function(err) {
        if(err) { throw err }

        const checkStudent = "SELECT * FROM students WHERE student_name = ?";
        const checkEmail = "SELECT * FROM students WHERE email = ?";

        connection.query(checkStudent, [studentName], function(err, studentResponse) {
            if (err) { throw err }

            if (studentResponse.length > 0) {
                res.json({ message: "Student already exists" });
            } else {
                connection.query(checkEmail, [email], function(err, emailResponse) {
                    if (err) { throw err }

                    if (emailResponse.length > 0) {
                        res.json({ message: "Email already exists" });
                    } else {
                        const insertData = "INSERT INTO students (student_name, gender, age, email, course, joined_date, fees, username , password) VALUES (?,?,?,?,?,?,?,?,?)";

                        connection.query(insertData, [studentName, gender, age, email, course, joinedDate, fees, username , password], function(err) {
                            if (err) { throw err }
                            res.send({ success: "Student added successfully" });
                        });
                    }
                });
            }
        });
    });
});



 router.get('/getstudent', (req,res)=>{
    const sql = "SELECT * FROM students";

    connection.query(sql,function(err,result){
        if(err) {throw err}

        if(result){
        res.json(result)
        }else{
        res.json({message : "There is no student data"})
        }
    })
 })

 router.put('/updatestudent', (req,res)=>{
    const { id , studentName, gender, age, email, course, joinedDate, fees } = req.body ;

    const sql = "UPDATE students SET student_name = ? , gender = ? , age = ?, email = ? , course = ? , joined_date = ? , fees = ? WHERE id = ?";

    const response = "SELECT * FROM students WHERE id = ?"

    connection.query(sql, [ studentName, gender, age, email, course, joinedDate, fees , id ],function(err,result){
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

 router.delete('/deletestudent', (req, res) => {
  const { id } = req.body;
  console.log(id)

  const deleteSql = "DELETE FROM students WHERE id = ?";
  const selectSql = "SELECT * FROM students WHERE id = ?";

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