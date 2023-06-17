import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  isLoggedIn = false;
  roles: any = [];
  signupForm: any;
  user = {} as User;
  emailExists: boolean = false;
  usernameExists: boolean = false;
  username: string = "";
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
    /* private header : HeaderComponent */) { }


  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.minLength(4), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      Username: ['', [Validators.minLength(8), Validators.required]],
      Email: ['', [Validators.email, Validators.required]],
      role: ['', [ Validators.required]],
      Mdp: ['', [Validators.minLength(8), Validators.required]],
      mdpConfirmation: ['', [Validators.required]]
    }
      , {
        validator: ConfirmPasswordValidator("Mdp", "mdpConfirmation")
      });
  }
  generateUsername() {
    /*     let randomNumber = + Math.floor(Math.random()*100);
         this.username = this.signupForm.firstName + this.signupForm.lastName.value + randomNumber */
  }
  errorEmailCancel() {
    this.emailExists = false;

  }
  errorUsernameCancel() {
    this.usernameExists = false;
  }
  emailVerification(email: any) {
    this.authService.getUserByEmail(email.target.value).subscribe(
      (data : any) => {
        if (data) {
          this.emailExists = true;
          console.log(data);
        }
      })
  }
  usernameVerification(username: any) {
    this.authService.getUserByUsername(username.target.value).subscribe(
      (data : any) => {
        if (data) {
          this.usernameExists = true;
          console.log(data);
        }
      })
  }
  signup(user: any) {
    if (this.signupForm.invalid || this.emailExists || this.usernameExists) {
      if (this.emailExists) {
        Swal.fire({
          title: 'Oops !',
          text: 'Email déjà utlisé',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
      else if (this.usernameExists) {
        Swal.fire({
          title: 'Oops !',
          text: 'Pseudonyme déjà utlisé',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
      else {
        Swal.fire({
          title: 'Oops !',
          text: 'Champs invalide',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
    }
/* si tous les champs sont valides
 */    else {
   this.roles.push(user.role);
      this.authService.newUser(user.Username, user.firstName, user.lastName,
        user.Email,this.roles, user.Mdp).subscribe({
          next: (data : any) => {
            console.log(user.role);
            Swal.fire({
              icon: 'success',
              title: 'Utilisateur enregistré avec succées avec le pseudonyme : ' + user.Username,
              text: 'Bienvenue ' + user.lastName + ' veuillez verifié votre email : ' + user.Email + 
              ' pour validé votre compte',
              showConfirmButton: true,
              timer: 5000
            }).then(() => {
              this.router.navigate(["/accounts"]);
            });
          },
        })
    }
  }
}
