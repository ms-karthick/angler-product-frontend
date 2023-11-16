import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  product: Product = {
    name: '',
    code: '',
    category:'',
    image: '',
    description: ''
  };
  submitted = false;

  constructor(private productServices: ProductService) {}

  saveProduct(): void {
    const data = {
      name: this.product.name,
      code: this.product.code,
      category: this.product.category,
      image: this.product.image,
      description: this.product.description
    };

    this.productServices.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }
}
