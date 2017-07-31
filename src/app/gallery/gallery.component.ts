import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations'

import { ImageUploadDialog } from '../components/image-upload/image-upload.dialog';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('itemState', [
      state('active',   style({
        opacity: 1,
      })),
      state('inactive', style({
        opacity: 0,
        display: 'none'
      })),
      transition('inactive => active', animate('700ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class GalleryComponent implements OnInit {

  isLoaded: boolean = false;
  dialogRef: MdDialogRef<ImageUploadDialog>;

  constructor(
      public galleryService: GalleryService,
      public dialog: MdDialog
  ) {
    this.galleryService.reset().subscribe(res => {
      this.galleryService.load(res);
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

  openModal() {
    let config = new MdDialogConfig();
    config.data = {
      galleryImage: null
    };
    config.width = '600px';

    this.dialogRef = this.dialog.open(ImageUploadDialog, config);
  }
}
