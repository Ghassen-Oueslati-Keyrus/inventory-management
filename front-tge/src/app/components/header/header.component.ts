import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;
  roles: any;
  constructor(private storageService: StorageService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      console.log(this.roles);
    }
  }
  inscrire() {
    this.isLoggedIn = true;
  }

  deconnexion() {
    this.isLoggedIn = false;
    sessionStorage.removeItem("currentUser");
    this.router.navigate([""]);
  }
  profil() {
    if (sessionStorage.getItem("currentUser")) {
      this.router.navigate(["/profil"])
    }
    else { this.router.navigate(["/profile"]) }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        this.router.navigate([""]).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }
  adminRole() {
    if (this.isLoggedIn && this.roles == 'ROLE_ADMIN') {
      return true
    }
    else return false;
  }
  moderatorRole(){
    if (this.isLoggedIn && (this.roles == 'ROLE_ADMIN' || this.roles == 'ROLE_MODERATOR')){
      return true;
    }
    else return false;
  }
}
