import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  selectedFile:  File | null = null;
  id!: number;
  product!: Product;
  form!: FormGroup;
    
  
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }

  constructor(public productService: ProductService,
     private route: ActivatedRoute,
      private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.get(this.id).subscribe((data: Product)=>{
      this.product = data;
    }); 
      
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

  updateProduct(){
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('code', this.form.get('code')?.value);
    formData.append('category', this.form.get('selectedCategories')?.value);
    formData.append('description', this.form.get('description')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.update(this.id, formData).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('product');
    })
  }

}
