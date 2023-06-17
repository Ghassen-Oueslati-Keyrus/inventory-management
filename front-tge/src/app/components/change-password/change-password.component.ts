import { Component } from '@angular/core';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  user= {} as User;
  token: any;
  passwordForm: any;
  constructor(private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private forgotPassword: ForgotPasswordService,
    private router: Router) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    console.log(this.token);
    this.passwordForm = this.fb.group({
      Mdp: ['', [Validators.minLength(8), Validators.required]],
      mdpConfirmation: ['', [Validators.required]]
    }
      , {
        validator: ConfirmPasswordValidator("Mdp", "mdpConfirmation")
      });
  }
  changePassword(){
    this.user.password = this.passwordForm.value.Mdp;
    this.forgotPassword.resetPassword(this.token,this.user).subscribe({
      next: () =>{
        Swal.fire({
          icon: 'success',
          title: 'Votre mot de passe a été bien modifié.',
          showConfirmButton: false,
          timer: 5000
        });
        this.router.navigate(["login"]);
      }, error: err => {
        Swal.fire({
          title: 'Oops !',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
      
    })
  }
}
