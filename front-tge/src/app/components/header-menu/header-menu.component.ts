import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {


  categories: any;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories);
  }
  displayCategory(id: any) {
    this.router.navigate(["list/" + id]).then(() => {
      window.location.reload();
    });
  }
}
