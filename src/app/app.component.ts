import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'emp-management';

  constructor(private router: Router){

  }

  ngOnInit(): void {
    // Check if the 'empManagement-auth' data is in local storage
    const authData = localStorage.getItem('empManagement-auth');
    if (authData) {
      this.router.navigate(['/home']);
    }
  }
}
