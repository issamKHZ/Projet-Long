package com.costSimu.Api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.costSimu.Api.Utils.JwtResponse;
import com.costSimu.Api.model.User;
import com.costSimu.Api.service.AuthService;
import com.costSimu.Api.Utils.*;

import jakarta.servlet.http.HttpServletRequest;


@CrossOrigin(origins = "*")
@RestController	// This means that this class is a Controller
@RequestMapping(path="/auth")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@PostMapping(path="/register") // Map ONLY POST Requests
	public @ResponseBody String addNewStudent (
			@RequestParam String appName, 		 
			@RequestParam String mdp) {		
			
			String output = authService.register(appName, mdp);
			return output;
	}
	
	@PostMapping(path="/login")
	public @ResponseBody ResponseEntity<JwtResponse> login(@RequestParam String appName, 
									  @RequestParam String mdp) {
		ResponseEntity<JwtResponse> output;		
		output = this.authService.login(appName, mdp);		
		return output;
	}
}
