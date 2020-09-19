import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { JsonInputComponent } from "./components/json-input/json-input.component";
import { FormBuilderComponent } from './components/form-builder/form-builder.component';

@NgModule({
  declarations: [AppComponent, JsonInputComponent, FormBuilderComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
