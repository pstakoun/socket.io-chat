var $window;
var $usernameInput;
var $loginPage;
var $chatPage;
var socket;

var username;
$(document).ready(function(){
		
		$window = $(window);
		$usernameInput = $('.usernameInput'); //Username input field
		$loginPage = $('.login.page'); //Login page
		$chatPage = $('.chat.page'); //chat page
		
		 socket = io();
		 //user enters a message by clicking Send
		 $('form').submit(function(){
			sendMessage();
			return false;
			/*socket.emit('chat message', $('#m').val());
			$('#m').val('');
			return false;*/
		 });
		 //display the message
		 socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(msg));
		 });
		 // Keyboard events

		 $window.keydown(function (event) {
			
			// When the client hits ENTER on their keyboard
			if (event.which === 13) {
			  if(username){ //sends a message with Enter
				sendMessage();
			  } else{ //Login with username
				setUsername();
			  }
			}
		 });
});

// Sets the client's username
  function setUsername () {
    username = $usernameInput.val().trim();

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      //$currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }
  
//Send a chat message
function sendMessage(){
	var message = $('#m').val();
	
	//if its a non empty message then send it
	if(message){
		socket.emit('chat message', message);
		$('#m').val(''); //set the input to empty
	}
}



