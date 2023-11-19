import { Component, OnInit,Inject  } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DropdownItem {
  id: number;
  name: string;
}

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
  imageSrc: string | null = null;
  dropdownList: DropdownItem[] = [];
  selectedCategories: any[] = [];
  dropdownSettings: any = {}; 
    
  
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }

  constructor(public productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        public dialogRef: MatDialogRef<EditProductComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
       
       ) { this.form = this.initForm(data);}


       private initForm(data: any): FormGroup {
        // console.log(data)
        this.imageSrc = data.image;
        this.id = data.id;
        return this.formBuilder.group({
          name: [data.name, Validators.required],
          code: [data.code, Validators.required],
          selectedCategories: [data.category],
          description: [data.description],
          imageFile: [data.image]
          // Add other form controls as needed
        });
      }

  ngOnInit(): void {

    
    this.dropdownList = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Jewelry' },
      { id: 3, name: 'Cloths' },
      { id: 4, name: 'Toys' },
      { id: 5, name: 'Mobiles' }
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  get f(){
    return this.form.controls;
  }
    onItemSelect(item: any) {
      this.selectedCategories.push(item);
      // console.log(this.selectedCategories);
      // console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }

  updateProduct(): void{
    const formData = new FormData();
    const categoryArray: any[] =[];

    for (const category of this.selectedCategories) {
      categoryArray.push(category.id);
    }

    formData.append('name', this.form.get('name')?.value);
    formData.append('code', this.form.get('code')?.value);
    formData.append('description', this.form.get('description')?.value);

    if (categoryArray) {
    formData.append('selectedCategories', categoryArray.join(','));
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.update(this.id, formData).subscribe((res:any) => {
      // console.log(res);
      this.dialogRef.close();
    })
  }

}
