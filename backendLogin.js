//backendLogin
const existMembers = [
    {username : 'admin', password : 'password' },
];

//function to validate the username and password
function validateLogin(username, password) {
    for(let i = 0; i < existMembers.length; i++) {
        if(existMembers[i].username === username) {
            if(existMembers[i].password === password) {
                return {isValid : true, meesage : 'Login Successful'};
            } else {
                return {isValid : false, message : 'Login Failed'};
            }
        } 
    }
    return {isValid : false, mesasge : 'User not found'};
} 

//create an admin account
const registeredMembersDetails = [    //used to store the register users details
    {name : 'name', birthday : 'birthday', address : 'address'},
]; 

//function to register a new user
function registerMember(username, password, name, birthday, address) {
    for (let i = 0; i < existMembers.length; i++) {
        if (existMembers[i].username === username) {
          return {isSuccess : false, message : 'Username already taken' };
        }
    }

    const newMemberDetails = {name, birthday, address,};  //upload the user details 
    registeredMembersDetails.push(newMemberDetails);
    
    const newMember = {username, password};   //upload the user list
    existMembers.push(newMember);

    return {isSuccess : true, message : 'User registered succesfully'};
}

//export member details as pdf
const PDFDOcs = require('pdfkit');
const fs = require('fs');

//create PDF Document 
const docs = new PDFDOcs();     
docs.pipe(fs.createWriteStream('member_details.pdf'));

const commonFontSize = 12;
docs.fontSize(commonFontSize);

const member_Template = (member) => [
    'Name: ' + member.name,
    'Birthday: ' + member.birthday,
    'Address: ' + member.address,
    '',         //empty line
];

registeredMembersDetails.forEach((member) => {
        member_Template(member).forEach((line) => docs.text(line));
    }
);

docs.end();