
$(document).ready(function () {
  chitter = new Chitter();

  var $bsAlert = $(".alert");

  $bsAlert.on("close.bs.alert", function () {
    $bsAlert.attr('hidden','true');
    return false;
  });

  setTimeout(function () { chitter.createFeed(); }, 10);

  $("#login-form").submit(function (event) {
    event.preventDefault(); 
    var handle = $("input#loginUsername").val();
    var password = $("input#loginPassword").val();
    chitter.loginUser(handle, password);
    $("#userGreeting").replaceWith(`<div class="usergreeting">What\'s on your mind, ${handle}?</div>`);
  });
  
  $("#register-form").submit(function (event) {
    event.preventDefault(); 
    var handle = $("input#registerUsername").val();
    var password = $("input#registerPassword").val();
    chitter.register(handle, password);
    setTimeout(function () { chitter.loginUser(handle, password); }, 10);
  });
  
  $("#peep-form").submit(function (event) {
    console.log('how about here')
    event.preventDefault(); 
    var message = $("textarea#messageText").val();
    chitter.post(chitter.user_id, message, chitter.session_id)
    setTimeout(function () { chitter.createFeed(); }, 10);
  });
  
  $("#logout").click(function () {
    $("#banner-and-nav-logged-in").attr('hidden', 'true');
    $("#banner-and-nav-register").removeAttr('hidden');
    $("#post").attr('hidden', 'true');
    chitter.user_id = null;
    chitter.username = null;
    chitter.session_id = null;
  });
  

      // Leave the following one - it's the whole thing
});

