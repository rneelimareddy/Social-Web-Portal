package com.neel.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

public class GaeDao {

	//private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	
	//Datastore datastore = DatastoreOptions.newBuilder().setProjectId("fbtweetapp").build().getService();
	
	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	//private final KeyFactory keyFactory = datastore.newKeyFactory().setKind("Tweet");
	
	
	public long createTweet(Tweet tweet){
		Key key = datastore.put(toEntity(tweet));
		return key.getId();
	}
	
	public void incViewed(Tweet tweet) throws EntityNotFoundException{
		Key key = KeyFactory.createKey("tweet", tweet.keyId);
		Entity entity = datastore.get(key);
		entity.setProperty("viewed", tweet.viewed + 1);
		datastore.put(entity);
	}
	
	public List<Tweet> getTweets(String userId){
		List<Tweet> tweets = new ArrayList<>();
		
		Query query = new Query("tweet");
		PreparedQuery preparedQuery = datastore.prepare(query);
		List<Entity> entityList = preparedQuery.asList(FetchOptions.Builder.withDefaults());
		System.out.println(entityList);
		for(Entity entity : entityList){
			System.out.println(entity);
			Tweet tweet = fromEntity(entity);
			System.out.println(tweet);
			if(tweet.user != null && tweet.user.equals(userId)){
				tweets.add(tweet);
			}
		}
		return tweets;
	}
	
	public Tweet getTweet(long keyId) throws EntityNotFoundException{
		Key key = KeyFactory.createKey("tweet", keyId);
		Entity entity = datastore.get(key);
		return fromEntity(entity);
	}
	
	public boolean deleteTweet(long keyId){
		Key key = KeyFactory.createKey("tweet", keyId);
		datastore.delete(key);
		return true;
	}
	
	private Tweet fromEntity(Entity entity){
		return new Tweet((String)entity.getProperty("message"), 
				(Long)entity.getProperty("createdDate"), 
				(String)entity.getProperty("creator"), 
				Integer.parseInt((Long.toString((Long)entity.getProperty("viewed")))), 
				entity.getKey().getId()); 
	}
	
	private Entity toEntity(Tweet tweet){
		System.out.println("Tweet in toEntity : " + tweet);
		Entity entity = new Entity("tweet");
		entity.setProperty("message", tweet.message);
		entity.setProperty("createdDate", tweet.createdTime);
		entity.setProperty("creator", tweet.user);
		entity.setProperty("viewed", tweet.viewed);
		System.out.println("Entity : " + entity);
		return entity;
	}
}
