package com.costSimu.Api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.costSimu.Api.Utils.JwtResponse;
import com.costSimu.Api.Utils.JwtUtils;
import com.costSimu.Api.model.Role;
import com.costSimu.Api.model.User;
import com.costSimu.Api.model.enumerate.RoleEnum;
import com.costSimu.Api.repository.RoleRepository;
import com.costSimu.Api.repository.UserRepository;

import java.util.*;

@Service
public class AuthService {

	@Autowired 
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
    PasswordEncoder encoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;
	
	public String register(String appName, String Password) {
		
		if (this.userRepo.existsByAppname(appName)) {
			return "this app already registred";
		} else {
			User user = new User();
			
			Set<Role> appRoles = new HashSet<>();
			//Role role = new Role();
			//role.setName(RoleEnum.USER);
			//appRoles.add(role);
			
			user.setAppname(appName);
			String mdp = encoder.encode(Password);
			System.out.println("mdp is : " + mdp);
			user.setPassword(mdp);
			user.setPrice(0);							
			user.setRoles(appRoles);
			
			userRepo.save(user);
			return "saved";
		}
	}
	
	public ResponseEntity<JwtResponse> login(String appname, String mdp) {		
		Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
        		appname,
                mdp));		
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateToken(authentication);          
        return new ResponseEntity<JwtResponse>(new JwtResponse(token, appname), HttpStatus.OK);
		
	}
	
}
