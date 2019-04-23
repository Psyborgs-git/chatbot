var $messages = $('.messages-content'),
    d, h, m,
    i = 0,
    dictonary='';

$(window).load(function() {
  $messages.mCustomScrollbar();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    chatAjax(msg,dictonary);
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function buildHTML(type,message) {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);
}



// Harshad's Code
function chatAjax(s) {
    $.ajax({
           type: "GET",
           dataType: "json",
           url: 'http://localhost:5005/conversations/Jae/respond',
        data: {
            q : s
        },
        type: 'GET',
        success: function(response) {
//            console.log(dictonary);

          jsons = response;
          for (let json of jsons){
          reply = json["text"]
          console.log(reply)
          button = json["button"]

          if (button){
          buildHTML('them', reply + button )}
          else{
          buildHTML('them', reply )};
}
           ;
        },
        error: function(error) {
            console.log(error);
            buildHTML('them', 'I am sleeping,Please wake me up after sometime.');
        }
    });
}
