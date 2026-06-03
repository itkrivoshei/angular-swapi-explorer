import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { SwapiService } from "./services/swapi.service";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SwapiService],
})
export class CoreModule {}
