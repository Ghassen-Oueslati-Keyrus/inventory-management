import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DevisService } from 'src/app/services/devis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.css']
})
export class ListDevisComponent {
  devis: any = [];
  p: number = 1;
  itemsPerPage: number = 6;
  search: any;
  devisNumber: any;

  constructor(private devisService: DevisService) { }

  ngOnInit() {
    this.getAllDevis();
  }

  getAllDevis() {
    this.devisService.getAllDevis()
    .pipe(        
      map((devis) => this.searchByKeyWord(devis)),
    )
    .subscribe(
      (data) => {
        console.log(data);
        this.devis = data;
        this.devisNumber = this.devis.length
      },
      (err) => {
        console.error(err)
      }
    )
  }

  deleteDevis(devis: any) {
    Swal.fire({
      title: 'Vous-étes sur de vouloir supprimer ce devis ?',
      text: "Vous aurez pas le droit de la récupérer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.devisService.deleteDevis(devis.id).subscribe();
          Swal.fire(
            'Supprimer!',
            'Le devis du '+ devis.user.username +' à était bien supprimer.',
            'success'
          )
      }
      this.getAllDevis();
    }
    )
  }
  searchByKeyWord(devis : any) {
    if (!this.search) return devis;
    else {
      return devis.filter((devis :any) =>
      devis.codePostal.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.country.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.details.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.entreprise.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.preference.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.user.username.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.user.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
      devis.number.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
}
