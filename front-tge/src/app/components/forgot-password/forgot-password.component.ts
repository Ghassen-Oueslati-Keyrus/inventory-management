import { Component } from '@angular/core';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email:any;

  constructor(private forgotService : ForgotPasswordService){}
  
  
  sendPasswordToken(){
    this.forgotService.saveResetPasswordToken(this.email).subscribe({
      next : data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Veuillez verifié votre email pour changer votre mot de passe ',
          showConfirmButton: false,
          timer: 5000
        });
      },
      error: err => {
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
