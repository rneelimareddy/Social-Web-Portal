package com.neel.dao;

public class Tweet {

	String message;
	long createdTime;
	String user;
	int viewed;
	long keyId;
	
	public Tweet(String message, String user){
		this(message, System.currentTimeMillis(), user, 0, (long)-1);
	}
	
	public Tweet(String message, long createdTime, String user, int viewed, long keyId){
		this.message = message;
		this.createdTime = createdTime;
		this.user = user;
		this.viewed = viewed;
		this.keyId = keyId;
	}
	
	public String toString(){
		return new StringBuilder()
				.append("{")
				.append("\"").append("message").append("\":\"").append(message).append("\",")
				.append("\"").append("createdTime").append("\":\"").append(createdTime).append("\",")
				.append("\"").append("user").append("\":\"").append(user).append("\",")
				.append("\"").append("viewed").append("\":\"").append(viewed).append("\",")
				.append("\"").append("keyId").append("\":\"").append(keyId).append("\"")
				.append("}")
				.toString();
	}
	
	public int getViewed(){
		return this.viewed;
	}
}
