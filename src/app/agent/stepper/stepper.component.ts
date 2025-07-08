import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  @Input() steps: string[] = [];
  @Input() currentStep: number = 0;
  @Output() stepChanged = new EventEmitter<number>();

  goToStep(index: number): void {
    if (index <= this.currentStep) {
      this.stepChanged.emit(index);
    }
  }
}
