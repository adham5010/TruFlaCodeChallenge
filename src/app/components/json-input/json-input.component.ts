import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "src/app/custome-validators/custom-validators";
import { IType } from "src/app/models/IType";

@Component({
  selector: "app-json-input",
  templateUrl: "./json-input.component.html",
  styleUrls: ["./json-input.component.css"]
})
export class JsonInputComponent implements OnInit {
  jsonForm: FormGroup;
  @Output() editFinished: EventEmitter<any[]> = new EventEmitter<any[]>();
  readonly stringForInvaLidSchema =
    "the elments at index {indexes} are invalid";
  messageToBeDisplayed = "";
  defaultData = `[
    { "type": "label", "value": "sayed" },
    { "type": "text" },
    {
      "type": "dropdown",
      "items": [
        { "text": "sample 1", "value": "sample1" },
        { "text": "sample 2", "value": "sample2" },
        { "text": "sample 3", "value": "sample3" },
        { "text": "sample 4", "value": "sample4" },
        { "text": "sample 5", "value": "sample5" }
      ]
    },
    {
      "type": "radiobutton",
      "items": [
        { "text": "sample 1", "value": "sample1" },
        { "text": "sample 2", "value": "sample2" },
        { "text": "sample 3", "value": "sample3" },
        { "text": "sample 4", "value": "sample4" },
        { "text": "sample 5", "value": "sample5" }
      ]
    },
    { "type": "checkbox", "label": "check 1" },
    { "type": "submit", "value": "Save" },
    { "type": "cancle", "value": "Cancle" }
  ]
  `;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.jsonForm = this.fb.group({
      json: ["", [Validators.required, CustomValidators.isValidJson]]
    });
    this.jsonForm.valueChanges.subscribe(() => {
      const invalidValues = [];
      if (!this.jsonForm.get("json").invalid) {
        let data;
         try {data = JSON.parse(this.jsonForm.get("json").value)}catch{ data = {}};
        const parsedData = data as IType[];
        if (parsedData && parsedData.filter(a => !a.type).length == 0) {
          this.jsonForm.get("json").setErrors(undefined);
        } else if (data && data.length && data[0]) {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (!(element as IType) || !element.type) {
              invalidValues.push(index + 1);
            }
            this.messageToBeDisplayed = this.stringForInvaLidSchema.replace(
              "{indexes}",
              invalidValues.join(",")
            );
          }
          this.jsonForm.get("json").setErrors({ notSchema: true });
        }
        console.log(invalidValues.length);

        if (!invalidValues.length) {
          this.onSubmit();
        }
      }

    });
    this.jsonForm.patchValue({
      json: this.defaultData
    });
  }

  onSubmit() {
    this.editFinished.emit(JSON.parse(this.jsonForm.get("json").value));
  }
}
