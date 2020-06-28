import { Component } from '@angular/core';
import { UploadFileService } from '../services/upload-file.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assfu-client';
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file: string;
  preFilePath = 'https://s3.ap-south-1.amazonaws.com/testtpbucket/';
  uploadedFiles = [];
  constructor(private uploadService: UploadFileService, private https: HttpClient, public matDialog: MatDialog) { }
  viewFile(file) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '450px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'viewFile',
      title: 'Image - ' + file,
      filepath: file,
      actionButtonText: 'Delete',
    };

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
  deleteFile(file) {
    this.uploadService.deleteFileFromStorage(file).subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res['status'] === 200) {
        this.uploadedFiles.splice(this.uploadedFiles.indexOf(file), 1);
      }
    });
  }

  upload() {
    this.progress.percentage = 0;
    const currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(currentFileUpload).subscribe(event => {
      console.log(event, 'Upload');
      if (event.hasOwnProperty('partialText')) {
        this.uploadedFiles.push(currentFileUpload.name);
      }
      this.selectedFiles = undefined;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
