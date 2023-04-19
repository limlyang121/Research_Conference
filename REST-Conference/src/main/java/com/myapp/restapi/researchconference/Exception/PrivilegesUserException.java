package com.myapp.restapi.researchconference.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PrivilegesUserException extends RuntimeException{
    public PrivilegesUserException(String message) {
        super(message);
    }
}
