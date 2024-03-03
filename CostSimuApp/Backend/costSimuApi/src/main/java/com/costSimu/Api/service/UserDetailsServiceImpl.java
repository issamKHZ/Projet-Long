package com.costSimu.Api.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.costSimu.Api.repository.UserRepository;
import com.costSimu.Api.model.Role;
import com.costSimu.Api.model.enumerate.RoleEnum;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String appname) throws UsernameNotFoundException {
        com.costSimu.Api.model.User user = userRepository.findByAppname(appname).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        Role role = new Role();
        role.setName(RoleEnum.USER);
        return new User(
        	    user.getAppname(),
        	    user.getPassword(),
        	    mapRolesToAuthorities(new HashSet<>(Collections.singleton(role)))
        	);

    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(Set<Role> set) {
        return set.stream().map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
    }

}