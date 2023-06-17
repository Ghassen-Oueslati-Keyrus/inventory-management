import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.css']
})
export class EmailVerifiedComponent {
  code : any;
  enabled : any;
  user:any;
    constructor(private activatedRoute: ActivatedRoute, private authService : AuthService){}
  
    ngOnInit(){
      this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
      this.authService.getUserByVerificationCode(this.code).subscribe({
        next: data =>{
          console.log(data);
          this.user=data;
        }
      }
      );
      console.log(this.user)
    }
    verified(){
      this.authService.getUserByVerificationCode(this.code).subscribe({
        next: data =>{
          console.log(data);
          this.user=data;
        }
      }
      );
      this.authService.verifiedEmail(this.code,this.user).subscribe();
    }
}
