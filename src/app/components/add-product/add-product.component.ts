import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {

  selectedFile:  File | null = null;


  product : Product = {
    name: '',
    code: '',
    category:'',
    image: '',
    description: ''
  };
  submitted = false;


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }


  constructor(private productService: ProductService) {}
  
  categories: string[] = ['Author', 'Multiselect', 'Accordions', 'Radio Buttons', 'Search Boxes', 'Tables'];
  selectedCategories: string[] = [];




  saveProduct(): void {
    const data = {
      name: this.product.name,
      code: this.product.code,
      category: this.product.category,
      // image: this.selectedFile,
      description: this.product.description
    };

    this.productService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }
}
