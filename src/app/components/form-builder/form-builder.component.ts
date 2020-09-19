import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-form-builder",
  templateUrl: "./form-builder.component.html",
  styleUrls: ["./form-builder.component.css"]
})
export class FormBuilderComponent implements OnInit {
  @Input() set rowData(data: any[]) {
    this.showResultedObject = false;
    this.formData = data;
    this.updateForm();
  }
  formData: any[];
  form: FormGroup;
  controlsArray;
  showResultedObject = false;
  resultedObject = "";
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  updateForm() {
    this.controlsArray = this.formData
      .filter(
        a => a.type !== "label" && a.type !== "submit" && a.type !== "cancle"
      )
      .reverse();
    let formControls = {};
    this.controlsArray.forEach((element, index) => {
      formControls[`${element.type}_${index}`] = [""];
      element["formControlName"] = `${element.type}_${index}`;
    });
    this.form = this.fb.group(formControls);
  }

  onSubmit() {
    this.resultedObject = JSON.stringify(this.form.value);
    this.showResultedObject = true;;
  }
}
