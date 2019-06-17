Chitter = function() {
  this.user_id = null;
  this.username = null;
  this.session_id = null;
}

Chitter.prototype.createFeed = function() {
  $.get('https://chitter-backend-api.herokuapp.com/peeps', function (response) {
    var myHTML = '';
    for (i = 0; i < response.length; i++) {
      var dateData = response[i]['created_at'];
      var date = dateData.substring(0, 10);
      var time = dateData.substring(11, 16);
      myHTML += `<div class="card mt-3">
                  <div class="card-header">
                  <div class="text-center">
                   ${response[i]['user']['handle']}
                  </div>
                  </div>
                <div class="card-body">
                <div class="text-center">
                  <blockquote class="blockquote mb-0">
                   <p>${response[i]['body']}</p>
                   <footer class="blockquote-footer">Posted at ${time}, ${date}</footer>
                  </blockquote>
                </div>
                </div>
                </div>`
    };
    $("#feed").html(myHTML);
  });
};

Chitter.prototype.loginUser = function(handle, password) {
  $this = this
  var Data;
  request = $.ajax({
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: 'https://chitter-backend-api.herokuapp.com/sessions',
    type: 'POST',
    data: `{"session": {"handle":"${handle}", "password":"${password}"}}`,
    success: function (response) {
      Data = response;
      $("#post").removeAttr('hidden');
    },
    statusCode: {
      422: function () {
        $("#loginPasswordAlert").removeAttr('hidden');
      },
      500: function () {
        $("#loginUsernameAlert").removeAttr('hidden');
      },
      201: function () {
        $("#banner-and-nav-logged-in").removeAttr('hidden');
        $("#banner-and-nav-register").attr('hidden', 'true');
        $('#loginModal').modal('toggle');
      },
      error: function (e) {
        alert("Server error - " + e);
      }
    }
  });
  request.done(function(Data){
    $this.username = handle;
    $this.user_id = Data['user_id'];
    $this.session_id = Data['session_key'];
  });  
}

Chitter.prototype.register = function(handle, password) {
  $.ajax({
    url: 'https://chitter-backend-api.herokuapp.com/users',
    contentType: "application/json; charset=utf-8",
    type: 'POST',
    data: `{"user": {"handle":"${handle}", "password":"${password}"}}`,
    dataType: "json",
    statusCode: {
      422: function () {
        $("#registerUsernameAlert").removeAttr('hidden');
      },
      201: function () {
        $('#registerModal').modal('toggle');
        $("#banner-and-nav-logged-in").removeAttr('hidden');
        $("#banner-and-nav-register").attr('hidden', 'true');
      },
      error: function (e) {
        alert("Server error - " + e);
      }
    }
  });
}

Chitter.prototype.post = function(user_id, message, session_key, callback) {
  console.log('At lease we are getting this far')
  $.ajax({
    url: 'https://chitter-backend-api.herokuapp.com/peeps',
    contentType: "application/json; charset=utf-8",
    type: 'POST',
    headers: { "Authorization": `Token token=${session_key}` },
    data: `{"peep": {"user_id":${user_id}, "body":"${message}"}}`,
    dataType: "json",
    statusCode: {
      500: function () {
        alert('Summat went wrong - 500 error')
      },
      201: function () {
        $('#peepModal').modal('toggle');
      },
      error: function (e) {
        alert("Server error - " + e);
      }
    }
  });
  if (typeof callback == "function")
    callback();
}

