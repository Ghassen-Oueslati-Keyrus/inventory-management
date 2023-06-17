import { Component } from '@angular/core';

@Component({
  selector: 'app-tap-to-top',
  templateUrl: './tap-to-top.component.html',
  styleUrls: ['./tap-to-top.component.css']
})
export class TapToTopComponent {

  tapToTop(){
    window.scroll(0, 0);
  }
}
