var $window;
var $usernameInput;
var $loginPage;
var $chatPage;
var socket;
$(document).ready(function(){
		
		$window = $(window);
		$usernameInput = $('.usernameInput'); //Username input field
		$loginPage = $('.login.page'); //Login page
		$chatPage = $('.chat.page'); //chat page
		
		 socket = io();
		 //user enters a message
		 $('form').submit(function(){
			socket.emit('chat message', $('#m').val());
			$('#m').val('');
			return false;
		 });
		 //display the message
		 socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(msg));
		 });
		 // Keyboard events

		 $window.keydown(function (event) {
			
			// When the client hits ENTER on their keyboard
			if (event.which === 13) {
			  setUsername();
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