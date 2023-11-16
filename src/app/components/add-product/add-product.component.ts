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
  product = {
    name: '',
    code: '',
    selectedCategories:'',
    category:'',
    image: '',
    description: ''
  };
  submitted = false;


  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }



  constructor(private productService: ProductService) {}

  categories: string[] = ['Author', 'Multiselect', 'Accordions', 'Radio Buttons', 'Search Boxes', 'Tables'];





  saveProduct(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('code', this.product.code);
    formData.append('category',this.product.selectedCategories);
    formData.append('description', this.product.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.productService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }
}
