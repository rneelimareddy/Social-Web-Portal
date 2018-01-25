package com.neel.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neel.dao.GaeDao;
import com.neel.dao.Tweet;

public class GetTweetServlet  extends HttpServlet {

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
			String uids = params.get("uids")[0];
			String[] ids = uids.split(",");
			boolean sort = false;
			if(params.get("sort") != null && params.get("sort").length != 0){
				sort = Boolean.getBoolean(params.get("sort")[0]);
			}
			List<Tweet> tweets = new ArrayList<>();
			System.out.println("tweets : " + tweets);
			for(String id: ids){
				tweets.addAll(dao.getTweets(id));
			}
			System.out.println("tweets : " + tweets);
			for(Tweet tweet : tweets){
				dao.incViewed(tweet);
			}
			Collections.sort(tweets, new CustomComparator());
			
			response.getWriter().print(tweets);
		}catch(Exception e){
			System.out.println("Exception occured while getting tweets ..!" + e.getMessage());
		}
	}
}

class CustomComparator implements Comparator<Tweet> {
    @Override
    public int compare(Tweet o1, Tweet o2) {
        return ((Integer)o2.getViewed()).compareTo(o1.getViewed());
    }
}
