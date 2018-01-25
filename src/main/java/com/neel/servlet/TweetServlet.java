package com.neel.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neel.dao.GaeDao;
import com.neel.dao.Tweet;

public class TweetServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	GaeDao dao = new GaeDao();

	@Override
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");

		Map<String, String[]> params = request.getParameterMap();
		System.out.println("Params : " + params);
		String message = java.net.URLDecoder.decode(params.get("message")[0], "UTF-8");
	
		String id = params.get("uid")[0];
		System.out.println(message);
		Tweet tweet = new Tweet(message, id);
		System.out.println("Tweet : " + tweet);
		long keyId = dao.createTweet(tweet);

		response.getWriter().print("Tweet Added : "+ keyId);
	}

}
