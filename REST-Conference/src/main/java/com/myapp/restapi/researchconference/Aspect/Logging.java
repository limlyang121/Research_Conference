package com.myapp.restapi.researchconference.Aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Logging {
    @Before("execution(* com.myapp.restapi.researchconference.*.*(..))")
    public void logMethodCall(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getName();

        System.out.println("Method  : " + methodName + "Called on " + className);

    }
}
