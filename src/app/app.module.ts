import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, DragDropModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
