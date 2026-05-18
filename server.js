const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static((__dirname)));

app.get('/',(req,res)=>{

res.sendFile(path.join(__dirname,'index.html'));

});

app.post('/saveEmployee',(req,res)=>{
console.log(req.body);
const data = req.body;

const sql = `
INSERT INTO employees(
name,
personalIdNo,
designation,
pan,
department,
payFrom,
payTo,
paidDays,
uan,
pfNo,
bankName,
bankAccount,
basicPay,
hra,
transport,
meal,
totalEarnings,
incomeTax,
pfContribution,
profTax,
medical,
sodexo,
totalDeductions,
netPay
)

VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`;

db.query(sql,[

data.name,
data.personalIdNo,
data.designation,
data.pan,
data.department,
data.payFrom,
data.payTo,
data.paidDays,
data.uan,
data.pfNo,
data.bankName,
data.bankAccount,
data.basicPay,
data.hra,
data.transport,
data.meal,
data.totalEarnings,
data.incomeTax,
data.pfContribution,
data.profTax,
data.medical,
data.sodexo,
data.totalDeductions,
data.netPay

],(err,result)=>{

if(err){

console.log(err);
res.send("Error Saving Data");

}else{

res.send("Employee Saved Successfully");

}

});

});
app.listen(3000,()=>{

console.log(
"Server Running On Port 3000"
);

});
app.get('/searchEmployee/:search',(req,res)=>{

const search = req.params.search;

const sql = `
SELECT * FROM employees
WHERE name = ?
OR personalIdNo = ?
`;

db.query(sql,[search,search],(err,result)=>{

if(err){

res.json([]);

}else{

res.json(result);

}

});

});
