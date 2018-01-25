<jsp:include page="header.jsp" />

<%
String id = request.getParameter("id");
%>

<script type="text/javascript">
	displayTweet(<%=id%>);
</script>

<div id="displaytweet"></div>

<jsp:include page="footer.jsp" />