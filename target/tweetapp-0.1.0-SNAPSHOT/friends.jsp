<jsp:include page="header.jsp" />

<div class = "friendcontainer">
	<button class="big-button" type="submit" onclick="showFriendList();">Display Friends List</button>
	<button class="big-button" type="submit" onclick="showFriendsTweets();">Friends Tweets</button>
</div>

<div id="friendsList"></div>

<div id="friendsTweets"></div>
		
<jsp:include page="footer.jsp" />