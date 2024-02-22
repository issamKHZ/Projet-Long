import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() showMe : boolean = false;
  clique !: string;

  cliquer(section: string) {
    this.clique = section;
  }

}
