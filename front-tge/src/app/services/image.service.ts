import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../interfaces/file-handle';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const productPhotos: any[] = product.photos;

    const productPhotosToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productPhotos.length; i++) {
      const photosFileData = productPhotos[i];
      const imageBlob = this.dataURItoBlob(photosFileData.data, photosFileData.contentType);
      const photoFile = new File([imageBlob], photosFileData.name, { type: photosFileData.contentType });
      const finalFileHandle: FileHandle = {
        file: photoFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(photoFile))
      };
      productPhotosToFileHandle.push(finalFileHandle);
    }

    product.photos = productPhotosToFileHandle;

    return product;

  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
