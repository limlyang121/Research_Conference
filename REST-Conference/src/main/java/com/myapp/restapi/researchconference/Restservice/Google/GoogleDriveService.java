package com.myapp.restapi.researchconference.Restservice.Google;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Objects;
import java.util.UUID;

@Service
public class GoogleDriveService {
    private static final String APPLICATION_NAME = "google-drive-demo";
    private static final String SERVICE_ACCOUNT_EMAIL = "service-account@valencia-384403.iam.gserviceaccount.com";
    private static final String SERVICE_ACCOUNT_JSON_FILE_PATH = "classpath:/serviceAccount.json";

    private final HttpTransport httpTransport;
    private final JsonFactory jsonFactory;
    private final Drive drive;


    @Autowired
    public GoogleDriveService(HttpTransport httpTransport, JsonFactory jsonFactory) throws GeneralSecurityException, IOException {
        this.httpTransport = httpTransport;
        this.jsonFactory = jsonFactory;
        this.drive = getDriveService();
    }

    private Drive getDriveService() throws GeneralSecurityException, IOException {
        GoogleCredential credential = GoogleCredential.fromStream(Objects.requireNonNull(getClass().getResourceAsStream("/serviceAccount.json")))
                .createScoped(Collections.singleton(DriveScopes.DRIVE_FILE));
        return new Drive.Builder(httpTransport, jsonFactory, credential)
                .setHttpRequestInitializer(credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private java.io.File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        java.io.File file = new java.io.File(multipartFile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return file;
    }

    public boolean isAuthenticated() {
        try {
            Drive drive = getDriveService();
            drive.about().get().setFields("kind,user").execute();
            return true;
        } catch (IOException | GeneralSecurityException e) {
            return false;
        }
    }


    public String uploadFile(MultipartFile multipartFile, String folderId) throws IOException {
        java.io.File myFile = convertMultipartFileToFile(multipartFile);
        System.out.println("File exists: " + myFile.exists());

        File fileMetadata = new File();
        fileMetadata.setName(myFile.getName());
        if (folderId != null) {
            fileMetadata.setParents(Collections.singletonList(folderId));
        }

        FileContent mediaContent = new FileContent(null, myFile);
        File uploadedFile = drive.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();
        return uploadedFile.getId();
    }

    public String createRandomFolder() throws IOException {
        String folderName = "MyFolder" + UUID.randomUUID().toString();
        File fileMetadata = new File();
        fileMetadata.setName(folderName);
        fileMetadata.setMimeType("application/vnd.google-apps.folder");
        File folder = drive.files().create(fileMetadata).setFields("id").execute();
        return folder.getId();
    }
}
