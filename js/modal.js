// Opens modal for users that have not been to site in the last day

// Create modal
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
keyboard: false
})

// Sets cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Checks if cookie exists and shows modal if it does not
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    if (c.indexOf(name) === 0) {
      console.log("don't modal");
    }
    else {
      myModal.show();
    }
  }
}

getCookie("user_testing");
setCookie("user_testing", 1, 1);