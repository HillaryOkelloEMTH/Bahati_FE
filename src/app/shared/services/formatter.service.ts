import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class FormatterService {
  formatTime(datetime: string): string {
    // Convert from "2025-08-01 10:07:56.0" to "2025-08-01T10:07:56"
  const localString = datetime.replace(' ', 'T').replace(/\.\d+$/, '');
  return localString;
  }

}
