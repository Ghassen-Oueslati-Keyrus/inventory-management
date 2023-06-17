import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { DevisService } from 'src/app/services/devis.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devis-form',
  templateUrl: './devis-form.component.html',
  styleUrls: ['./devis-form.component.css']
})
export class DevisFormComponent {
  devis: any = {
    entreprise: "",
    number: "",
    preference: "",
    country: "",
    details: "",
    codePostal: "",
    user: {
      id: 0
    }
  };
  devisForm: any;
  constructor(private fb: FormBuilder, private storageService: StorageService, private devisService: DevisService) { }

  ngOnInit() {
    this.devis.user.id = this.storageService.getUser().id;
    this.devisForm = this.fb.group({
      entreprise: ['', [Validators.required]],
      number: ['', [Validators.required]],
      preference: ['', [Validators.required]],
      country: ['', [Validators.required]],
      details: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
    })
  }
  addDevis() {
    if (this.devisForm.invalid || this.devisForm == null) {
      Swal.fire({
        title: 'Oops !',
        text: 'Veuillez remplir tous le champs',
        icon: 'error',
        confirmButtonText: 'Retour',
        confirmButtonColor: 'Red',
      });
    }
    else {
      this.devisService.createDevis(this.devis).subscribe(
        data => Swal.fire({
          icon: 'success',
          title: 'Devis ajouté avec succès !',
          text: 'Merci pour votre demande de devis. Nous vous contacterons dans les plus brefs délais.',
          showConfirmButton: true,
          timer: 8000
        })
      );
      this.devisForm.reset()
    }
  }
}
