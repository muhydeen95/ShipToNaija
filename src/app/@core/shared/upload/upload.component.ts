import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiResponse, Notification } from '@core/interfaces';
import { HelperService } from '@core/services/helper.service';
import { NotificationService } from '@core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uniqueUploadElementId: number = 0;
  fileUploadProgress: number = 0;
  isUploading: boolean = false;
  isUploadingFailed: boolean = false;

  private subscription: Subscription = new Subscription();

  @Input() files: UploadedFile[] = [];
  @Input() canUpload: boolean = true;
  @Input() question: any;
  @Input() showLabel: boolean = true;

  @Output() filesEvent: EventEmitter<UploadedFile[]> = new EventEmitter<
    UploadedFile[]
  >();

  constructor(
    private notificationService: NotificationService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.uniqueUploadElementId = Math.floor(
      Math.random() * (100000 - 2000 + 1) + 2000
    );
  }

  upload(files: File[]): void {
    this.isUploading = true;
    this.isUploadingFailed = true;

    this.subscription.add(
      this.helperService.upload(files).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const res: ApiResponse<UploadedFile[]> = event.body;

            this.isUploading = false;
            this.isUploadingFailed = false;

            this.files = res.data;
            this.filesEvent.emit(res.data);
          }
        },
        error: (_) => {
          this.isUploading = false;
          this.isUploadingFailed = true;
        },
      })
    );
  }

  handleFileInput(event: Event): void {
    const files = (event.target as HTMLInputElement)?.files as FileList;

    if (!this.canUpload) {
      const notification: Notification = {
        state: 'warning',
        message: 'Uploading not allowed.',
      };

      this.notificationService.openNotification(
        notification,
        'saw-notification-warning'
      );
      return;
    }

    const filesToUpload: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      const fileSizeInMb = file!.size / (1024 * 1024);
      if (file && fileSizeInMb > this.question.maximumFileSize) {
        const notification: Notification = {
          state: 'warning',
          message: 'File too large.',
        };

        this.notificationService.openNotification(
          notification,
          'saw-notification-warning'
        );

        continue;
      }

      const typeArray = file!.type.split('/');
      const fileExtension = typeArray[1];

      fileExtension;
      // console.log(fileExtension, this.question.fileType);

      // if (file && !this.question.fileType.includes(file.type)) {
      //   console.error('File type not allowed.');
      //   continue;
      // }

      if (this.files.length >= this.question.maximumFileNumber) {
        const notification: Notification = {
          state: 'warning',
          message: 'Maximum number of files exceeded.',
        };

        this.notificationService.openNotification(
          notification,
          'saw-notification-warning'
        );

        break;
      }

      filesToUpload.push(file as File);
    }

    this.upload(filesToUpload);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.filesEvent.emit(this.files);
  }

  openFileInNewTab(file: any | null) {
    // Open the file URL in a new tab
    console.log(file);
    window.open(file!, '_blank');
  }
}

export interface UploadedFile {
  fileName: string;
  originalName: string;
  path: string;
}
