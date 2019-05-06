package edu.sjsu.cmpe275.openhack.service;



import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.openhack.model.User;
import edu.sjsu.cmpe275.openhack.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Autowired
	private EntityManager entityManager;
	
	
	
	public User getUser(Long id) {
		return userRepository.findOne(id);
	}
	
	public void addUser(User user) {
		userRepository.save(user);
	}

	
	public User getProfile(String eid) {
		User user = null;
	    Query query = entityManager.createQuery("from User as u WHERE u.email=:email");
	    query.setParameter("email",eid);
	    System.out.println(query.getParameterValue("email"));
	    try {
	    	user =  (User) query.getSingleResult();
	    } catch (Exception e) {
	        System.out.println("Here! Inside get profile");
	    }
	 return user;
	}
	
	public User getProfileByScreenName(String screenName) {

		User user = null;
	    Query query = entityManager.createQuery("from User as u WHERE u.screenName=:name");
	    query.setParameter("name",screenName);
	    System.out.println(query.getParameterValue("name"));
	    try {
	    	user =  (User) query.getSingleResult();
	    } catch (Exception e) {
	        System.out.println("Here! Inside get profile");
	    }
	 return user;
	}



public User updateProfile(User user) {

	System.out.println("Inside update profile service");
	System.out.println(user);
    userRepository.save(user);
    return user;
}
}