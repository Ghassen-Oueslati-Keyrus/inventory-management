import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  pseudonyme: any;
  password: any;
  show: boolean = false;
  roles: string[] = [];
  isLoggedIn = false;

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService) { }
  showAndHidePassword() {
    this.show = !this.show
  }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  login() {
    let user: any;
    this.authService.getUserByUsername(this.pseudonyme).subscribe({
      next: data => {
        user = data;
        console.log(user)
        if (user) {
          if (user.enabled) {

            this.authService.login(this.pseudonyme, this.password).subscribe({
              next: data => {
                Swal.fire({
                  icon: 'success',
                  title: 'Bienvenue ' + this.pseudonyme,
                  showConfirmButton: false,
                  timer: 5000
                });
                this.storageService.saveUser(data);
                this.isLoggedIn = true;
                this.roles = this.storageService.getUser().roles;
                this.router.navigate([""]).then(() => {
                  window.location.reload();
                });

              },
              error: err => {
                Swal.fire({
                  title: 'Oops !',
                  text: "Mauvaise combinaison du pseudonyme et mot de passe ",
                  icon: 'error',
                  confirmButtonText: 'Retour',
                  confirmButtonColor: 'Red',
                });
              }
            })
          }
          else {
            Swal.fire({
              title: 'Oops !',
              text: "Veuillez verifié votre email ! ",
              icon: 'error',
              confirmButtonText: 'Retour',
              confirmButtonColor: 'Red',
            });
          }
        }

        else {
          Swal.fire({
            title: 'Oops !',
            text: "Pseudonyme introuvable",
            icon: 'error',
            confirmButtonText: 'Ressayer',
            confirmButtonColor: 'Red',
          });
        }
        /*     this.userService.login(user).subscribe(
              data => {
                if (data) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Bienvenue ',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  sessionStorage.setItem('currentUser', JSON.stringify(data));
                  this.router.navigate([""]).then(()=>{
                    window.location.reload();
                  });
        
                }
                else {
                  Swal.fire({
                    title: 'Oops !',
                    text: 'Login ou Mot de passe eronné',
                    icon: 'error',
                    confirmButtonText: 'Retour',
                    confirmButtonColor: 'Red',
                  });
                }
              }
            ) */
      }
    })
  }

}
