import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() showMe : boolean = true;
  clique !: string;
  @Output() newItemEvent = new EventEmitter<string>();

  cliquer(section: string) {
    this.clique = section;
    this.newItemEvent.emit(this.clique);
  }

}
