package com.neel.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neel.dao.GaeDao;

public class DeleteTweetServlet  extends HttpServlet {

	private static final long serialVersionUID = 1L;

	GaeDao dao = new GaeDao();
	
	@Override
	@SuppressWarnings("unchecked")
	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");

		Map<String, String[]> params = request.getParameterMap();
		System.out.println("Params : " + params);
		String tweetId = params.get("tweetId")[0];
		dao.deleteTweet(Long.parseLong(tweetId));
	}
}
