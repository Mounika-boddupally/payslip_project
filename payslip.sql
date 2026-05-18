CREATE DATABASE IF NOT EXISTS payslip_db;

USE payslip_db;

CREATE TABLE employees(

id INT PRIMARY KEY AUTO_INCREMENT,

name VARCHAR(100),

personalIdNo VARCHAR(50),

designation VARCHAR(100),

pan VARCHAR(20),

department VARCHAR(100),

payFrom VARCHAR(20),

payTo VARCHAR(20),

paidDays INT,

uan VARCHAR(50),

pfNo VARCHAR(50),

bankName VARCHAR(100),

bankAccount VARCHAR(50),

basicPay DECIMAL(10,2),

hra DECIMAL(10,2),

transport DECIMAL(10,2),

meal DECIMAL(10,2),

totalEarnings DECIMAL(10,2),

incomeTax DECIMAL(10,2),

pfContribution DECIMAL(10,2),

profTax DECIMAL(10,2),

medical DECIMAL(10,2),

sodexo DECIMAL(10,2),

totalDeductions DECIMAL(10,2),

netPay DECIMAL(10,2)

);