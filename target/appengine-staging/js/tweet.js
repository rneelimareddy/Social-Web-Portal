function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      testAPI();
    } else if (response.status === 'not_authorized') {
    	document.getElementById('status').innerHTML = 'Please log ' +
    	'into this app.';
    	} else {
    	document.getElementById('status').innerHTML = 'Please log ' +
    	'into Facebook.';
    	window.location.reload();
    	}
   }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
window.fbAsyncInit = function() {
FB.init({
       appId : '146596119301882',
       xfbml : true,
       version : 'v2.11'
    }); 

function onLogin(response) {
       if (response.status == 'connected') {
              FB.api('/me?fields=first_name,id,picture', function(data) {
                     var welcomeBlock = document.getElementById('fb-welcome');
                     welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
                     
                     document.getElementById('myId').value = data.id;
                     document.getElementById('myName').value = data.first_name;
                     document.getElementById('myPic').value = data.picture.data.url;

                     var url = document.URL;
                     if(url.includes('trending')){
                    	 setTimeout(function(){
                    		 showAllTrendingTweets();
                    	 },1000);
                     }
               });
       }
       else {
               var welcomeBlock = document.getElementById('fb-welcome');
              welcomeBlock.innerHTML = 'Cant get data ' + response.status + '!'};
}
	
FB.getLoginStatus(function(response) {
     if (response.status == 'connected') {
              onLogin(response);
     } else {
          FB.login(function(response) { 
        	  onLogin(response);
        	  } , {scope: 'user_friends, email'});
     }
}); 
};

   
function testAPI() {
	console.log('Welcome! Fetching your information.... ');
	FB.api('/me', function(response) {
	console.log('Successful login for: ' + response.name);
	//document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
	});
	}

//---------------------------------------------------------------------------

function createTweet() {
 console.log('Posting a message to user feed.... '); 
 FB.login(function(){
       var typed_text = document.getElementById("message").value;
       if(typed_text == '') {
    	   document.getElementById('info').innerHTML = 'Please Enter your message. Message cannot be Blank!';
    	   return;
       }
        document.getElementById('message').value = '';
        FB.api('/me/feed', 'post', {message: typed_text});
        var id = document.getElementById('myId').value;
        
        var xhttp = new XMLHttpRequest();
	    xhttp.open("POST", "/tweet?message=" + encodeURIComponent(typed_text) + "&uid="+id, true);
	    xhttp.onreadystatechange = function() { 
	        if (xhttp.readyState == 4 && xhttp.status == 200){
	        	var response = xhttp.responseText;
	        	console.log("response : " + response);
	        	document.getElementById('info').innerHTML = 'Thanks for posting the message.';
	        }
	    }
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
        
   }, {scope: 'publish_actions'});
 
}

function showAllTrendingTweets(){

	var id = document.getElementById('myId').value;
	var myPic = document.getElementById('myPic').value;
	var myName = document.getElementById('myName').value;
	

	getFriends(function(friends){
		var friendStr = id;
		var friendMap = {};
		friendMap[id] = {
			"name" : myName,
			"pic" : myPic
		}
		for(var j=0; j < friends.length; j++){
			friendStr += ',' + friends[j].id;
			friendMap[friends[j].id] = {
					"name" : friends[j].name,
					"pic" : friends[j].picture.data.url
			}
		}
		var callback = function(tweets){
		    	var html = '<table>';
				for(var j=0; j < tweets.length; j++){
					var epoch = tweets[j].createdTime;
					html += '<tr>' +
							'<td><img src="' + friendMap[tweets[j].user].pic + '"/>'+ '<br>' 
							+ friendMap[tweets[j].user].name + '</td>' + 
							'<td>' + "Tweet :" + tweets[j].message + '<br><br>' + 
							"Viewed " + tweets[j].viewed + " times" + '<br><br>' +  
							"Created at :" + getTime(epoch) + '</td>' +
							'</tr>';
				}
				 html += '</table>';
				 document.getElementById("myTweets").innerHTML = html;
		}
	     
		getTweets(friendStr, true, callback);
	    
	});

}

function showMyTweets(sort){
	
	var id = document.getElementById('myId').value;

	var callback = function(tweets){
		var html = '';
		for(var j=0; j < tweets.length; j++){
			var epoch = tweets[j].createdTime;
			
			html += '<table id="tweets"><tr>' +
						'<td> Tweet :' + '<br><br>' +  'Viewed ' + " " + tweets[j].viewed + " " + 'times' + '</td>' +
						'<td>' + tweets[j].message + '<br><br>' + 'Created at :' + getTime(epoch) + '</td>' +
						'<td><button type="submit" class="delete-button" id="' + tweets[j].keyId + '" onclick="deleteMyTweet(this);">Delete</button></td>'+
						'<td><button type="submit" class="share-friend" id="' + tweets[j].keyId + '" onclick="sendMessage(this.id);">Share to Friend</button></td>'+
						'<td><button type="submit" class="share-feed" id="' + tweets[j].keyId + '" onclick="shareMessagetoFeed(this.id);">Share to Feed</button></td>'+
					'</tr></table>';
		}
		 //document.getElementById("output").innerHTML = 'My Tweets';
		 document.getElementById("myTweets").innerHTML = html;
	}
	
	getTweets(id, sort, callback);
}

function getTime(time){
	var date = new Date(+time);

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	return month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
}

function deleteMyTweet(button){
	var id = button.id;
	var callback = function(response){
		document.getElementById('info').innerHTML = 'Tweet succesfullly Deleted..!';
		showMyTweets();
	};
	
	deleteTweet(id, callback);
	
}

function sendMessage(uid) {
	checkLoginState();
	FB.ui({
		method: 'send', link: 'https://fbtweetapp.appspot.com/displaytweet.jsp?id='+uid
	});
}

function shareMessagetoFeed(uid) {
	FB.ui({
		method: 'share', href: 'https://fbtweetapp.appspot.com/displaytweet.jsp?id='+uid
	});
}

function displayTweet(tweetId){
	var callback = function(response){
		var tweet = JSON.parse(response);
		var epoch = tweet.createdTime;
		var html = '';
		html += '<table><tr>' + 
					'<td> Tweet :' + '<br><br>' + 'Viewed ' + tweet.viewed + ' times' + '</td>' + 
					'<td>' + tweet.message + '<br><br>' + 'Created at :' + getTime(epoch) + '</td>' +
				//'</tr>' + 
				//'<tr>'+
				//	'<td> Viewed ' + tweet.viewed + ' times</td>' +  
				//	'<td> Created at :' + getTime(epoch) + '</td>' +
				'</tr></table>';
		 document.getElementById("displaytweet").innerHTML = html;
	}; 
	getTweet(tweetId, callback);
}

//---------------------------------------------------------

function showFriendList(){
	console.log('Getting friend list.... '); 
	document.getElementById("friendsTweets").innerHTML = '';
	getFriends(function(friends){
		 var html = '<table>';
			for(var j=0; j < friends.length; j++){
				html += '<tr>' + '<td><img src="' + friends[j].picture.data.url + '"/>' + '</td>' + 
				'<td>' + friends[j].name + '</td>' +
				'</tr>';
			}
			 html += '</table>';
			 document.getElementById("friendsList").innerHTML = html ;
	 });
}


function showFriendsTweets(){
	console.log('Getting friend tweets.... ');
	document.getElementById("friendsList").innerHTML = '';
	getFriends(function(friends){
		var friendStr = '';
		var friendMap = {};
		for(var j=0; j < friends.length; j++){
			if(j == 0){
				friendStr += friends[j].id;
			}else{
				friendStr += ',' + friends[j].id;
			}
			friendMap[friends[j].id] = {
					"name" : friends[j].name,
					"pic" : friends[j].picture.data.url
			}
		}
		var callback = function(tweets){
		    	var html = '<table>';
				for(var j=0; j < tweets.length; j++){
					var epoch = tweets[j].createdTime;
					html += '<tr>' +
							'<td><img src="' + friendMap[tweets[j].user].pic + '"/>'+ '<br>' 
							+ friendMap[tweets[j].user].name + '</td>' + 
							'<td>' + "Tweet :" + tweets[j].message + '<br><br>' + 
							"Viewed " + tweets[j].viewed + " times" + '<br><br>' +  
							"Created at :" + getTime(epoch) + '</td>' +
							'</tr>';
				}
				 html += '</table>';
				 document.getElementById("friendsTweets").innerHTML = html;
		}
	     
		getTweets(friendStr, false, callback);
	    
	});
}


function getTweets(uids, sort, callback){
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/gettweet?uids="+uids+'&sort='+sort, true);
    xhttp.onreadystatechange = function() { 
        if (xhttp.readyState == 4 && xhttp.status == 200){
        	var response = xhttp.responseText;
        	console.log("response : " + response);
	    	var tweets = JSON.parse(response);
	    	callback(tweets);
        }
    }
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function deleteTweet(tweetId, callback){
	var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/deletetweet?tweetId="+tweetId, true);
    xhttp.onreadystatechange = function() { 
        if (xhttp.readyState == 4 && xhttp.status == 200){
        	var response = xhttp.responseText;
        	console.log("response : " + response);
	    	callback(response);
        }
    }
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function getTweet(tweetId, callback){
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/displaytweet?tweetId="+tweetId, true);
    xhttp.onreadystatechange = function() { 
        if (xhttp.readyState == 4 && xhttp.status == 200){
        	var response = xhttp.responseText;
        	console.log("response : " + response);
	    	callback(response);
        }
    }
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function getFriends(callback){
	var friends = [];
	 var getNextPage = function(response){
		 var data = response.data
		 for(var i=0; i < data.length; i++){
			 friends.push(data[i]);
		 }
		 if(response.paging !== undefined && response.paging.next !== undefined){
			 var next = response.paging.next;
			 FB.api(next, getNextPage);
		 }else{
			 callback(friends);
		 }
	 };
	 FB.api('/me', function(response) {
		 	console.log(JSON.stringify(response));
			FB.api('/' + response.id + '/friends?fields=id,name,picture&limit=5', getNextPage);
	 });
}