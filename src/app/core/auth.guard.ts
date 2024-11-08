import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  
  const authData = localStorage.getItem('empManagement-auth');

  if (authData) {
    // Allow access if credentials are present
    return true;
  } else {
    // Redirect to login if credentials are missing
    router.navigate(['/login']);
    return false;
  }
};
