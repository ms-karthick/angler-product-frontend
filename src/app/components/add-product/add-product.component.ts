import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { FormsModule,FormBuilder,FormGroup, FormControl, Validators,ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialogRef } from '@angular/material/dialog';

interface DropdownItem {
  id: number;
  name: string;
}


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  // standalone: true,
  // imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
})

export class AddProductComponent implements OnInit{
  dropdownList: DropdownItem[] = [];
  selectedCategories: any[] = [];
  dropdownSettings: any = {}; 
  selectedFile:  File | null = null;
  selectedCategoriesArr: any[] =[];
  form!: FormGroup;

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




  onFileSelected(event: any): void {
    const file: FileList = event.target.files;
    const files: File = event.target.files[0];
// console.log(files.size)
    const maxSizeBytes = 2 * 1024 * 1024; // 2 MB in bytes
    const allowedExtensions = ['png', 'jpeg', 'jpg'];
    const fileExtension = files.name.split('.').pop()?.toLowerCase() || '';

    if (files.size > maxSizeBytes) {
      alert("File size exceeds the maximum allowed (2 MB).")
    } 
    else if(allowedExtensions.indexOf(fileExtension) === -1){
      alert("Invalid file extension. Allowed extensions: PNG, JPEG.");
    }
    else{
      this.selectedFile = file.item(0);
    }
  }

  onItemSelect(item: any) {
    this.selectedCategories.push(item);
    // console.log(this.selectedCategories);
    // console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  constructor(private productService: ProductService,
              public dialogRef: MatDialogRef<AddProductComponent>
           ) {}


  saveProduct(): void {
    const formData = new FormData();
    const categoryArray: any[] =[];

    for (const category of this.selectedCategories) {
      categoryArray.push(category.id);
    }

    formData.append('name', this.form.get('name')?.value);
    formData.append('code', this.form.get('code')?.value);
    formData.append('selectedCategories', categoryArray.join(','));
    formData.append('description', this.form.get('description')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.create(formData).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (e) => console.error(e)
    });
  }

}
