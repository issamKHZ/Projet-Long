package com.costSimu.Api.Utils;

import java.util.Date;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;



@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	
	@Value("${bezkoder.app.jwtSecret}")
    private String jwtSecret;
	
	@Value("${bezkoder.app.jwtExpirationMs}")
    private int jwtExpirationMs;
	
	//private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
	//private static final String TOKEN_PREFIX = "Bearer";
	
	
	private Key key() {
	    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	 }
	
	public String generateToken(Authentication authentication) {
		String username = authentication.getName();		
		//Date currentDate = new Date();
		//Date expireDate = new Date(currentDate.getTime() + SecurityConstant.JWT_EXPIRATION);
		
		String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
        return token;
	}
	public String getUsernameFromJWT(String token){
		return Jwts.parserBuilder().setSigningKey(key()).build()
	               .parseClaimsJws(token).getBody().getSubject();
	}
	
	public boolean validateToken(String token) {
		 try {			  
		      Jwts.parserBuilder().setSigningKey(key()).build().parse(token);		      
		      return true;
		    } catch (MalformedJwtException e) {
		      logger.error("Invalid JWT token: {}", e.getMessage());
		    } catch (ExpiredJwtException e) {
		      logger.error("JWT token is expired: {}", e.getMessage());
		    } catch (UnsupportedJwtException e) {
		      logger.error("JWT token is unsupported: {}", e.getMessage());
		    } catch (IllegalArgumentException e) {
		      logger.error("JWT claims string is empty: {}", e.getMessage());
		    }

		    return false;
		  
    }
	

    public String extractJwtTokenFromHeader(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

}