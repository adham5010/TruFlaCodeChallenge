import { FormControl } from "@angular/forms";

export class CustomValidators {
  static isValidJson(control: FormControl) {
    try {
      if (control.value && control.value.length) {
        JSON.parse(control.value);
        return null;
      }
    } catch (error) {
      return { notJson: true };
    }
  }
}
