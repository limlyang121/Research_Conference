//package com.myapp.restapi.researchconference.Advice;
//
//import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.AfterReturning;
//import org.aspectj.lang.annotation.Aspect;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class Pointcut {
//
//    @org.aspectj.lang.annotation.Pointcut("execution(* com.myapp.restapi.researchconference.DAO.PaperDAOImpl.downloadPaper(..))")
//    public void downloadAndUpload(){}
//
//    @AfterReturning(
//            pointcut = "!downloadAndUpload()",
//            returning = "result"
//    )
//    public void removeData(JoinPoint joinPoint, Paper result){
//        result.setFile(null);
//
//    }
//}
