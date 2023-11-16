import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormsModule,FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit{

  selectedFile:  File | null = null;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', Validators.required),
      selectedCategories: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });
  }


  get f(){
    return this.form.controls;
  }

  // product = {
  //   name: '',
  //   code: '',
  //   selectedCategories:'',
  //   category:'',
  //   image: '',
  //   description: ''
  // };


  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }



  constructor(private productService: ProductService) {}

  categories: string[] = ['Author', 'Multiselect', 'Accordions', 'Radio Buttons', 'Search Boxes', 'Tables'];





  saveProduct(): void {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('code', this.form.get('code')?.value);
    formData.append('category', this.form.get('selectedCategories')?.value);
    formData.append('description', this.form.get('description')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.productService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }
}
