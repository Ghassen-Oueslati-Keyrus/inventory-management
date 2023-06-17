import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  accounts: any = [];
  p: number = 1;
  itemsPerPage: number = 6;
  search: any;
  accountsNumber: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  role(userRole: any) {
    let userType: string;
    switch (userRole) {
      case "ROLE_USER":
        userType = "USER";
        break;
      case "ROLE_ADMIN":
        userType = "ADMIN";
        break;
      case "ROLE_MODERATOR":
        userType = "MODERATOR";
        break;
      default:
        userType = "UNKNOWN";
    }
    return userType;
  }
  Class(role: any) {
    let userType: string;
    switch (role) {
      case "ROLE_USER":
        userType = "text-success";
        break;
      case "ROLE_ADMIN":
        userType = "text-danger";
        break;
      case "ROLE_MODERATOR":
        userType = "text-info";
        break;
      default:
        userType = "";
    }
    return userType;
  }
  getAllUsers() {
    this.userService.getAllUsers()
    .pipe(        
      map((products) => this.searchByKeyWord(products)),
    )
    .subscribe(
      (data) => {
        console.log(data);
        this.accounts = data;
        this.accountsNumber = this.accounts.length
      },
      (err) => {
        console.error(err)
      }
    )
  }

  deleteUser(user: any) {
    Swal.fire({
      title: 'Vous-étes sur de vouloir supprimer ce compte?',
      text: "Vous aurez pas le droit de la récupérer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe();
          Swal.fire(
            'Supprimer!',
            'Le compte'+ user.username +' à était bien supprimer.',
            'success'
          )
          this.getAllUsers();
      }
    }
    )
  }
  searchByKeyWord(users : any) {
    if (!this.search) return users;
    else {
      return users.filter((user :any) =>
      user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
      user.email.toLowerCase().includes(this.search.toLowerCase()) ||
      user.username.toLowerCase().includes(this.search.toLowerCase()) ||
      user.roles[0].name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
}
