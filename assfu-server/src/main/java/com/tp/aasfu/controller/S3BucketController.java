package com.tp.aasfu.controller;

import com.tp.aasfu.service.AmazonS3BucketService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class S3BucketController {

    private AmazonS3BucketService amazonS3BucketService;

    S3BucketController(AmazonS3BucketService amazonS3BucketService) {
        this.amazonS3BucketService = amazonS3BucketService;
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<?> uploadFile(@RequestPart(value = "file") MultipartFile file) {
    	try {
    		String response = this.amazonS3BucketService.uploadFile(file);
    		return new ResponseEntity<>(response, HttpStatus.OK);
    	} catch(Exception e) {
    		e.printStackTrace();
    		return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
    	}
    }

    @PostMapping("/deleteFile")
    public ResponseEntity<?> deleteFile(@RequestBody String fileURL) {
    	try {
    		this.amazonS3BucketService.deleteFileFromBucket(fileURL);
    		return new ResponseEntity<>(null, HttpStatus.OK);
    	} catch(Exception e) {
    		e.printStackTrace();
    		return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
    	}
    }
}