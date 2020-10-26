import { AfterViewInit, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChange') openState = new EventEmitter<boolean>();

  isOpen = false;
  openHeight = 0;

  constructor(
    private plt: Platform,
    private gestureCtrl: GestureController,
    private renderer: Renderer2
  ) { }

  async ngAfterViewInit() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height() / 100) * 70;

    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
        console.log(ev);
        if (ev.deltaY < -this.openHeight) return;
        this.renderer.setStyle(drawer, 'transform', `translateY(${ev.deltaY}px)`);
      },
      onEnd: ev => {
        if (ev.deltaY < -50 && !this.isOpen) {
          this.renderer.setStyle(drawer, 'transition', '.4s ease-out');
          this.renderer.setStyle(drawer, 'transform', `translateY(${-this.openHeight}px)`);
          this.openState.emit(true);
          this.isOpen = true;
        } else if (ev.deltaY > 50 && this.isOpen) {
          this.renderer.setStyle(drawer, 'transition', '.4s ease-out');
          this.renderer.setStyle(drawer, 'transform', '');
          this.openState.emit(false);
          this.isOpen = false;
        }
      }
    });
    gesture.enable(true);
  }

  onToggleDrawer() {
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen);

    if (this.isOpen) {
      this.renderer.setStyle(drawer, 'transition', '.4s ease-out');
      this.renderer.setStyle(drawer, 'transform', '');
      this.isOpen = false;
    } else {
      this.renderer.setStyle(drawer, 'transition', '.4s ease-out');
      this.renderer.setStyle(drawer, 'transform', `translateY(${-this.openHeight}px)`);
      this.isOpen = true;
    }
  }
}
