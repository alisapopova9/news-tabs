import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() public valueInput: EventEmitter<string> = new EventEmitter();

  public value: string = null;

  constructor() { }

  public ngOnInit(): void {
  }

  public onValueInput(value: string): void {
    this.value = value;
    this.valueInput.emit(this.value);
  }

}
