import { Component, Input } from '@angular/core';
import { DotLottieWebComponent } from 'ngx-dotlottie-web/src/web';

@Component({
  selector: 'app-animation-player',
  imports: [DotLottieWebComponent],
  templateUrl: './animation-player.component.html',
  styleUrl: './animation-player.component.css',
})
export class AnimationPlayerComponent {
  @Input({ required: true }) src: string;
}
