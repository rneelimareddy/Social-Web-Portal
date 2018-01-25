<jsp:include page="header.jsp" />

<div id="status"></div>

<!--  <div id="status"></div> -->
<div class ="container" align ="center">
	<div id="info"></div>
		<table>
			<tr><td><textarea class ="textarea" placeholder="Enter Message to Tweet" id="message" rows ="12" cols="50"></textarea></td>	
			<td><button class= "small-button" type="submit" onclick="createTweet();">Post Tweet</button><br><br>
			<button class= "small-button" type="submit" onclick="showMyTweets();">Display Tweets</button><br><br></td>
		</tr></table>
</div>
<div id="myTweets"></div>

<jsp:include page="footer.jsp" />