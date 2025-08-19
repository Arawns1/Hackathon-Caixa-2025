import { Component } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-animation-player',
  imports: [],
  templateUrl: './animation-player.component.html',
  styleUrl: './animation-player.component.css',
})
export class AnimationPlayerComponent {
  dotLottie = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('#dotlottie-canvas') as HTMLCanvasElement,
    src: '../../../assets/media/loading.lottie', // replace with your .lottie or .json file URL
  });
}
