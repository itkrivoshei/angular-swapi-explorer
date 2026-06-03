import { Component, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-root",
  imports: [RouterModule, MatIconModule],
  templateUrl: "./app.component.html",
  standalone: true,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
  protected readonly title = "Star Wars Explorer";
  protected isPlaying = false;

  private readonly audio?: HTMLAudioElement;

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio("assets/star-wars-theme.mp3");
      this.audio.volume = 0.4;
      this.audio.preload = "metadata";
    }
  }

  ngOnDestroy(): void {
    this.audio?.pause();
  }

  protected toggleMusic(): void {
    if (!this.audio) {
      return;
    }

    if (this.audio.paused) {
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(() => {
          this.isPlaying = false;
        });

      return;
    }

    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
}
