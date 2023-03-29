package com.myapp.restapi.researchconference.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
public class ExceptionHandling extends Exception{
    private int status;
    private String message;
    private long timeStamp;

    public ExceptionHandling(String message) {
        this.message = message;
    }
}
