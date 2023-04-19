package com.myapp.restapi.researchconference.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class CustomErrorHandling  {
    @ExceptionHandler
    @ResponseBody
    public final ResponseEntity<ExceptionHandling> handleUserNotFoundException(UserNotFoundException ex) {
        ExceptionHandling errorResponse = new ExceptionHandling(ex.getMessage());
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    @ResponseBody
    public final ResponseEntity<ExceptionHandling> PrivilegesUsers(PrivilegesUserException ex) {
        ExceptionHandling errorResponse = new ExceptionHandling(ex.getMessage());
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionHandling> handleAllExceptions(Exception ex) {
        ExceptionHandling errorResponse = new ExceptionHandling(ex.getMessage());
        errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
