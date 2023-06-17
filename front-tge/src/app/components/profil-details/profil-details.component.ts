import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.css']
})
export class ProfilDetailsComponent {
  currentUser: any;
  passwords: any;
  currentPassword: any;
  newPassword: any;
  confirmationPassword: any;
  changePasswordForm: any;
  afficherFormulaire: boolean = false;
  profileForm: any;
  usernameExists: boolean = false;
  constructor(private storageService: StorageService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser);
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.minLength(4), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      Username: ['', [Validators.minLength(8), Validators.required]]
    })

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(8), Validators.required]],
      confirmationPassword: ['', [Validators.required]]
    }
      , {
        validator: ConfirmPasswordValidator("newPassword", "confirmationPassword")
      });
  }
  changePassword(form: any) {
    let passwords = {
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      username: this.currentUser.username
    }
    if (!this.changePasswordForm.invalid) {
      this.authService.changePassword(passwords).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Mot de passe changé avec succées',
            showConfirmButton: true,
            timer: 5000
          })
        },
        (error: any) => {
          Swal.fire({
            title: 'Oops !',
            text: 'Mot de passe incorrect !',
            icon: 'error',
            confirmButtonText: 'Retour',
            confirmButtonColor: 'Red',
          });
        }
      )
    }
    else {
      Swal.fire({
        title: 'Oops !',
        text: 'Vérifier votre nouveau mot de passe! ',
        icon: 'error',
        confirmButtonText: 'Retour',
        confirmButtonColor: 'Red',
      });
    }
  }

  errorUsernameCancel() {
    this.usernameExists = false;
  }
  usernameVerification() {
    this.authService.getUserByUsername(this.currentUser.username).subscribe(
      data => {
        if (data) {
          this.usernameExists = true;
          console.log(data);
        }
      })
  }
  changeProfile() {
    let data = {
      id: this.currentUser.id,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      username: this.currentUser.username
    }
    if (this.profileForm.invalid ||  this.usernameExists)
    {
      Swal.fire({
        title: 'Oops !',
        text: 'Veuillez vérifier tous les champs',
        icon: 'error',
        confirmButtonText: 'Retour',
        confirmButtonColor: 'Red',
      });
    }
    else{
    this.authService.changeProfile(data).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Données modifié avec succées',
          showConfirmButton: true,
        })
        this.storageService.saveUser(this.currentUser);
      },
      (error: any) => {
        Swal.fire({
          title: 'Oops !',
          text: 'Probléme au serveur',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
    )}
  }
}
