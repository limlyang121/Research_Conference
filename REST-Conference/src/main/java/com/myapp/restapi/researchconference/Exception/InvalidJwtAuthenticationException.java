package com.myapp.restapi.researchconference.Exception;

import javax.naming.AuthenticationException;

public class InvalidJwtAuthenticationException extends AuthenticationException {
    public InvalidJwtAuthenticationException(String explanation) {
        super(explanation);
    }
}
