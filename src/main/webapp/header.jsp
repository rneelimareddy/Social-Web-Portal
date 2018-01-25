<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<title>TweetApp</title>
<head>
<link rel="stylesheet" href="/css/tweets.css">
</head>
<body>

<%
String method = request.getParameter("method");
if(method == null || method.equals("")){
	method = "tweet";
}
%>

<script>
window.onload=function(){
	document.getElementById('<%=method%>').classList.add('active')
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

</script>
<script src="/js/tweet.js"></script>

<div id="meta-inf">
	<input type="hidden" id="myId" value=""></input>
	<input type="hidden" id="myPic" value=""></input>
   <input type="hidden" id="myName" value=""></input>
</div>

<div class="topnav">
	<a id="tweet" class="" href="tweet.jsp?method=tweet">Tweets</a>
  	<a id="friends" class="" href="friends.jsp?method=friends">Friends</a>
  	<a id="trending" class="" href="trending.jsp?method=trending">Trending</a>
  	<div align ="right">
  		<a id="fb-welcome"></a>
  		<fb:login-button class="login-button" scope="public_profile,email"  autologoutlink="true" perms="" onlogin="checkLoginState();"></fb:login-button>
  	</div>
</div>