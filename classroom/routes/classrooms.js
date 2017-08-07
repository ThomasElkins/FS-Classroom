var express = require('express');
var router = express.Router();

var allData;
// Get data from JSON object
function dataFetch(){
  const fs = require('fs');
    fs.readFile('./classrooms.json', 'utf-8', function(err, data){
      if (err) throw err;
      allData = JSON.parse(data);
    });
};
dataFetch();

//Populate classrooms page

router.get('/', function(req, res, next){
  res.render('classrooms', {title: 'Classes', allData: allData});
});
//Populate students page for a class
router.get('/:id', function(req, res, next){
  var classID = req.params.id;
  var dataPass = allData[classID]["students"];
  res.render('students', {title: "Students", subtitle: "Students", classID: classID, dataPass: dataPass});
});
//Populate individual student page
router.get('/:id/:studentID', function(req, res, next){
  var classID = req.params.id;
  var studentID = req.params.studentID;
  var dataPass = allData[classID]["students"][studentID];
  res.render('student', {title: "Student", subtitle: "Student", classID: classID, studentID: studentID, dataPass: dataPass});
});
//Post grade to student



module.exports = router;
