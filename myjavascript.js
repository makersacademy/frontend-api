
function GetUsers(){
  document.getElementById("getuserresult").innerHTML = "";
  console.log("inside the function ... calling api");
  // will need to do a GET to https://chitter-backend-api-v2.herokuapp.com/users
  fetch('https://chitter-backend-api-v2.herokuapp.com/users')
  .then(response => response.json())
  .then(listOfData => { 
  // we get back a LIST of userItems so we need to loop through it.
  // we make a new div for each user
  listOfData.forEach( userItem=>
  { 
  let userItemDiv=document.createElement('div');
  userItemDiv.innerHTML = "ID = " + userItem.id + " Handle = " + userItem.handle; 
  document.getElementById("getuserresult").appendChild(userItemDiv); 
  })
  })
  
  }
  
  function GetPeepWithId(){
  console.log("inside GetPeepsWithID")
  userId = document.getElementById("peepsid").value;
  console.log(userId)
  

// api result will look like:
/*
body: "Congrats for successfully requesting the peeps from the Chitter API! This is the first peep :)"
created_at: "2020-03-06T17:16:22.601Z"
id: 1
likes: (4) [{…}, {…}, {…}, {…}]
updated_at: "2020-03-06T17:16:22.601Z"
user: {id: 1, handle: 'edward'}
*/
// likes is an ARRAY and will look like this:
/*
[
{
"user": {
"id": 162,
"handle": "Kristof"
}
},
{
"user": {
"id": 170,
"handle": "amit"
}
},
{
"user": {
"id": 40,
"handle": "maria"
}
},
{
"user": {
"id": 92,
"handle": "Mokk"
}
}
]

*/
fetch('https://chitter-backend-api-v2.herokuapp.com/peeps/'+userId)
.then(data => {
if (!data.ok) {
console.log(data)
errorDiv.innerHTML = "Status = " + data.status + " Staus Text = " + data.statusText; 
document.getElementById("peepIdResult").appendChild(errorDiv); 
throw Error(data.status);
}
return data.json();
})
.then(data => { 
// display user information with all the likes it has
let div=document.createElement('div');
div.innerHTML = data.body + "\n" + "ID = " + data.user.id + " Handle = " + data.user.handle ; 
document.getElementById("peepIdResult").appendChild(div);
let divLikeHeading = document.createElement('div');
divLikeHeading.innerHTML = " Has Liked the following users : "
document.getElementById("peepIdResult").appendChild(divLikeHeading);
// Lsit of likes for a given user so we need to loop through it and add it
data.likes.forEach(likeItemResult => {
let likeItemDiv = document.createElement('div');
likeItemDiv.innerHTML = "User ID = " + likeItemResult.user.id + " User Handle = " + likeItemResult.user.handle 
divLikeHeading.appendChild(likeItemDiv)
})
});
}


function AddUser(){
console.log("inside add user")
handleId = document.getElementById("handleid").value;
password = document.getElementById("passwordid").value;
const dataToSend = {
user: {
handle: handleId,
password:password
}
};
var dataWeAreSending = JSON.stringify(dataToSend)
console.log(dataToSend)
const dataToPost = {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(dataToSend),
};
let errorDiv=document.createElement('div');
fetch("https://chitter-backend-api-v2.herokuapp.com/users", dataToPost)
.then((data) => {
if (!data.ok) {
console.log(data)
errorDiv.innerHTML = "Status = " + data.status + " Staus Text = " + data.statusText; 
document.getElementById("adduserresult").appendChild(errorDiv); 
throw Error(data.status);
}
return data.json();
})
.then((dataResponse) => {
// get the data from the api call
// make a new DIV for this result and add it inside the id of adduserresult as a child
let div=document.createElement('div');
console.log(dataResponse)
div.innerHTML = "ID = " + dataResponse.id + " Handle = " + dataResponse.handle; 
document.getElementById("adduserresult").appendChild(div); 

})
.catch((error) => {
console.log(error);
});

console.log("we are sending this ...")
console.log(dataWeAreSending)
}

myUserSession= "";

function MakeSession(){
handleId = document.getElementById("sessionUserName").value;
password = document.getElementById("sessionPassword").value;
console.log(handleId)
console.log(password)
const dataToSend = {
session: {
handle: handleId,
password:password
}
};

const dataToPost = {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(dataToSend),
};

fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", dataToPost)
.then((data) => {
if (!data.ok) {
throw Error(data.status);
}
return data.json();
})
.then((response) => {
myUserSession = response.session_key;
let div=document.createElement('div');
div.innerHTML = "ID = " + response.user_id + " Session Key = " + response.session_key; 
document.getElementById("addsessionresult").appendChild(div); 

})
.catch((error) => {
console.log(error);
});

}