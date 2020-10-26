import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  backdropVisible = false;

  constructor(
    private changeRef: ChangeDetectorRef
  ) {}

  toggleBackdrop(isVisible: boolean) {
    this.backdropVisible = isVisible;
    this.changeRef.detectChanges();
  }
}
