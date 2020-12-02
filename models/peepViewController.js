import PeepView from './peepView.js';

const peepView = new PeepView()

async function allPeeps() {
  try {
    const result = await fetch(
      "https://chitter-backend-api-v2.herokuapp.com/peeps"
    );
    const data = await result.json()
    peepView.makeHTML(data)
  } catch (e) {
    console.log(e)
    return null;
  }
};

async function singlePeep(id) {
  try {
    const result = await fetch(
      `https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`
    );
    const data = await result.json()
    peepView.singlePeepHTML(data)
  } catch(e) {
    console.log(e)
    return null;
  }
};

async function newPeep(user_id, session_key, body) {
  try {
    const result = await fetch(
      "https://chitter-backend-api-v2.herokuapp.com/peeps", {
      method: 'POST',
      body: JSON.stringify({peep: {user_id: `${user_id}`, body:`${body}`}}),
      dataType: 'json',
      headers: {
        'Authorization': `${session_key}`,
        'Content-Type': 'application/json'
      }
    });
    const response = await result.json()
    allPeeps()
  } catch (e) {
    console.log(e)
    return null;
  }
}

window.addEventListener("hashchange", function(){
  let extension = window.location.hash.split('#')
  let id = extension[1].split("/")[1]
  singlePeep(id)
});

function postPeep(){
  let postPeeo = document.getElementById("post-peep")
  if(!postPeep) return;
  postPeep.addEventListener('submit', function(event){
    event.preventDefault();
    let body = event.srcElement[0].value
    let password = event.srcElement[1].value
    signUp(handle, password)
  })
}

allPeeps()


export { allPeeps }
export { singlePeep }
export { postPeep }