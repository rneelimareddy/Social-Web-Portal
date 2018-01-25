package com.neel.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neel.dao.GaeDao;
import com.neel.dao.Tweet;

public class DisplayTweetServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	GaeDao dao = new GaeDao();
	
	@Override
	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try{
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
	
			Map<String, String[]> params = request.getParameterMap();
			System.out.println("Params : " + params);
			String id = params.get("tweetId")[0];
			Tweet tweet = dao.getTweet(Long.parseLong(id));
			System.out.println("tweets : " + tweet);
			dao.incViewed(tweet);
			
			response.getWriter().print(tweet);
			
		}catch(Exception e){
			System.out.println("Exception occured while getting tweets ..!" + e.getMessage());
		}
	}

}
