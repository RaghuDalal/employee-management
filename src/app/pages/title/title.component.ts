import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  backgroundText = input.required<string>();
  mainText = input.required<string>();
}
