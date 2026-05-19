document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll('input').forEach(input => {

        input.addEventListener('input', calc);

    });


    flatpickr("#dateofjoin", {
        dateFormat: "d.m.Y",
        allowInput: true
    });
flatpickr("#payFrom", {

    dateFormat: "d.m.Y",
    allowInput: true,

    onChange: function(selectedDates) {

        let selectedDate = selectedDates[0];

        if(selectedDate){

            let year =
            selectedDate.getFullYear();

            let month =
            selectedDate.getMonth();

            let joiningDay =
            selectedDate.getDate();

            // Last Day Of Month

            let lastDay =
            new Date(year, month + 1, 0);

            let totalDays =
            lastDay.getDate();

            // Leave Days

            let leaveDays =
            parseFloat(document.getElementById('leaveDays').value) || 0;

            // Paid Days Calculation

            function formatDate(date){

                let dd =
                String(date.getDate()).padStart(2,'0');

                let mm =
                String(date.getMonth()+1).padStart(2,'0');

                let yyyy =
                date.getFullYear();

                return `${dd}.${mm}.${yyyy}`;

            }

            // Set Values

            document.getElementById('payTo').value =
            formatDate(lastDay);

            document.getElementById('totalDays').value =
            totalDays;
            updatePaidDays();

        }

    }

});
});
document.getElementById('leaveDays').addEventListener('input', updatePaidDays);
    function updatePaidDays(){

    let payFrom =
    document.getElementById('payFrom').value;

    let joiningDay = 1;
    if(payFrom)
        {

        let parts = payFrom.split(".");

        joiningDay =
        parseInt(parts[0]);
        }

        let beforeJoiningLeaves =
        joiningDay - 1;

        let extraLeaves =
        parseFloat(document.getElementById('leaveDays').value) || 0;

        let totalDays =
        parseFloat(document.getElementById('totalDays').value) || 0;

        let totalLeaves =
        beforeJoiningLeaves + extraLeaves;

        let paidDays =
        totalDays - totalLeaves;

        if (paidDays < 0) {
            paidDays = 0;
        }


        document.getElementById('paidDays').value =
        paidDays;

};

function calc(){
    function set(id,val){

document.getElementById(id).value =
val.toFixed(2);

}

console.log("calc running");

let basic =
parseFloat(document.getElementById('basicPay').value) || 0;

let meal =
parseFloat(document.getElementById('meal').value) || 0;

let transport =
parseFloat(document.getElementById('transport').value) || 0;

let prof =
parseFloat(document.getElementById('profTax').value) || 0;

let medical =
parseFloat(document.getElementById('medical').value) || 0;

let sodexo =
parseFloat(document.getElementById('sodexo').value) || 0;

let totalDays =
parseFloat(document.getElementById('totalDays').value) || 30;

let leaveDays =
parseFloat(document.getElementById('leaveDays').value) || 0;

/* HRA */

let paidDays =
parseFloat(document.getElementById('paidDays').value) || 0;

let proratedBasic =
(basic / totalDays) * paidDays;

let hra =
proratedBasic * 0.5;

/* Total Earnings */

let grossEarnings =
proratedBasic +
hra +
transport +
meal;

/* Per Day Salary */

let perDaySalary =
grossEarnings / totalDays;

/* Leave Deduction */

let leaveDeduction = 0;

/* Paid Days */

updatePaidDays();

/* Final Earnings */

let totalEarnings =
grossEarnings;

/* Tax */

let incomeTax =
totalEarnings * 0.10;

/* PF */

let pfContribution =
proratedBasic * 0.12;

/* Total Deductions */

let totalDeductions =
pfContribution +
prof +
medical +
sodexo +
leaveDeduction;

/* Net Pay */

let netPay =
totalEarnings -
incomeTax -
totalDeductions;

/* Current Period */

set('hra', hra);

set('totalEarnings', totalEarnings);

set('incomeTax', incomeTax);

set('totalTax', incomeTax);

set('pfContribution', pfContribution);

set('leaveDeduction', leaveDeduction);

set('totalDeductions', totalDeductions);

set('netPay', netPay);

/* Year To Date */

set('basicYear', proratedBasic * 12);

set('hraYear', hra * 12);

set('transportYear', transport * 12);

set('mealYear', meal * 12);

set('totalEarningsYear', totalEarnings * 12);

set('incomeTaxYear', incomeTax * 12);

set('totalTaxYear', incomeTax * 12);

set('pfContributionYear', pfContribution * 12);

set('profTaxYear', prof * 12);

set('medicalYear', medical * 12);

set('sodexoYear', sodexo * 12);

set('leaveDeductionYear', leaveDeduction * 12);

set('totalDeductionsYear', totalDeductions * 12);

/* Formula */

set('formulaEarnings', totalEarnings);

set('formulaTax', incomeTax);

set('formulaDeductions', totalDeductions);

/* Net Pay Text */

document.getElementById('netPayText').innerText =
netPay.toFixed(2);

}


function validatePAN(){

     let panInput = document.getElementById("pan");
    let panError = document.getElementById("panError");

    // Convert to uppercase
    panInput.value = panInput.value.toUpperCase();

    // Allow only letters and numbers
    panInput.value = panInput.value.replace(/[^A-Z0-9]/g, '');

    // PAN format validation
    let panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (panInput.value.length === 10) {

        if (!panPattern.test(panInput.value)) {
            panError.innerText = "Invalid PAN Format";
        } else {
            panError.innerText = "";
        }

    } else {
        panError.innerText = "";
    }
}



function setPayDetails(selectedDate){

    if(selectedDate){

        let year =
        selectedDate.getFullYear();

        let month =
        selectedDate.getMonth();

        let firstDay =
        new Date(year, month, 1);

        let lastDay =
        new Date(year, month + 1, 0);

        let totalDays =
        lastDay.getDate();

        function formatDate(date){

            let dd =
            String(date.getDate())
            .padStart(2,'0');

            let mm =
            String(date.getMonth()+1)
            .padStart(2,'0');

            let yy =
            String(date.getFullYear())
            .slice(-2);

            return `${dd}.${mm}.${yy}`;

        }

        document.getElementById('payFrom').value =
        formatDate(firstDay);

        document.getElementById('payTo').value =
        formatDate(lastDay);

        document.getElementById('totalDays').value =
        totalDays;

        let leaveDays =
        parseFloat(document.getElementById('leaveDays').value) || 0;

        updateMonthTitle();

    }

}
function updateMonthTitle(){

    let payFrom =
    document.getElementById('payFrom').value;

    if(payFrom){

        let parts = payFrom.split(".");

        let date = new Date(
            parts[2],
            parts[1]-1,
            parts[0]
        );

        let month =
        date.toLocaleString('default',{
            month:'long'
        }).toUpperCase();

        let year =
        date.getFullYear();

        document.getElementById('monthTitle').innerText =
        `EMPLOYEE PAYSLIP FOR THE MONTH OF ${month} ${year}`;

    }

}
async function saveEmployee(){
    validatePAN();

const employee = {

name:
document.getElementById('name').value,

personalIdNo:
document.getElementById('personalIdNo').value,

designation:
document.getElementById('designation').value,

pan:
document.getElementById('pan').value,

department:
document.getElementById('department').value,

payFrom:
document.getElementById('payFrom').value,

payTo:
document.getElementById('payTo').value,

paidDays:
document.getElementById('paidDays').value,

uan:
document.getElementById('uan').value,

pfNo:
document.getElementById('pfNo').value,

bankName:
document.getElementById('bankName').value,

bankAccount:
document.getElementById('bankAccount').value,

basicPay:
document.getElementById('basicPay').value,

hra:
document.getElementById('hra').value,

transport:
document.getElementById('transport').value,

meal:
document.getElementById('meal').value,

totalEarnings:
document.getElementById('totalEarnings').value,

incomeTax:
document.getElementById('incomeTax').value,

pfContribution:
document.getElementById('pfContribution').value,

profTax:
document.getElementById('profTax').value,

medical:
document.getElementById('medical').value,

sodexo:
document.getElementById('sodexo').value,

totalDeductions:
document.getElementById('totalDeductions').value,

netPay:
document.getElementById('netPay').value

};

const response = await fetch('/saveEmployee',{

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify(employee)

});

const result = await response.text();

alert(result);

}

async function searchEmployeeData(){

let search =
document.getElementById('searchEmployee').value;

const response =
await fetch(`/searchEmployee/${search}`);

const data = await response.json();

if(data.length > 0){
    let emp = data[0];

        document.getElementById('name').value =
        emp.name;

        document.getElementById('personalIdNo').value =
        emp.personalId_no;

        document.getElementById('designation').value =
        emp.designation;

        document.getElementById('pan').value =
        emp.pan;

        document.getElementById('department').value =
        emp.department;

        document.getElementById('dateofjoin').value =
        emp.dateofjoin;

        document.getElementById('payFrom').value =
        emp.pay_from;

        document.getElementById('payTo').value =
        emp.pay_to;

        document.getElementById('paidDays').value =
        emp.paid_days;

        document.getElementById('uan').value =
        emp.uan;

        document.getElementById('pfNo').value =
        emp.pf_no;

        document.getElementById('bankName').value =
        emp.bank_name;

        document.getElementById('bankAccount').value =
        emp.bank_account;

        document.getElementById('basicPay').value =
        emp.basic_pay;

        document.getElementById('transport').value =
        emp.transport;

        document.getElementById('meal').value =
        emp.meal;

        document.getElementById('profTax').value =
        emp.prof_tax;

        document.getElementById('medical').value =
        emp.medical;

        document.getElementById('sodexo').value =
        emp.sodexo;

        calc();
alert("Employee Found");

}
else
{
alert("Employee Not Found");
}

}

function clearForm(){

document.querySelectorAll("input").forEach(input=>{

if(!input.hasAttribute("readonly")){

input.value = "";

}

});
document.getElementById('bankName').selectedIndex = 0;

    // Clear readonly fields

    let readonlyFields = [

        'hra',
        'basicYear',
        'hraYear',
        'mealYear',
        'totalEarnings',
        'totalEarningsYear',
        'incomeTax',
        'incomeTaxYear',
        'totalTax',
        'totalTaxYear',
        'pfContribution',
        'pfContributionYear',
        'profTaxYear',
        'medicalYear',
        'sodexoYear',
        'totalDeductions',
        'totalDeductionsYear',
        'netPay',
        'formulaEarnings',
        'formulaTax',
        'formulaDeductions',
        'payTo',
        'paidDays'

    ];

    readonlyFields.forEach(id=>{

        document.getElementById(id).value = "";

    });
document.getElementById('netPayText').innerText =
"0.00";

}

function formatPFNo(input)
{
input.value = input.value .toUpperCase() 
.replace(/[^A-Z0-9\/\-]/g,''); 
} 
function formatUAN(input)
{ 
input.value = input.value .toUpperCase() 
.replace(/[^A-Z0-9]/g,''); 
}
