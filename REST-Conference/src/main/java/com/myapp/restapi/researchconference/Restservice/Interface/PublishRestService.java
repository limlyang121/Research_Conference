package com.myapp.restapi.researchconference.Restservice.Interface;

public interface PublishRestService {
    boolean acceptPaper(int paperID);
    boolean rejectPaper(int paperID);

}
