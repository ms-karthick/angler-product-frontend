import { Component,HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  dataAll: any[]=[];
  page=1;
  loading = false;
 

  constructor(private dialog: MatDialog, private productServices: ProductService) {}

  ngOnInit() {
   this.loadData();
      
  }


  openAddProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      panelClass: 'center-dialog',
      // height: '400px',
       width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataAll=[];
      this.loadData();
    });

  }

    openEditProduct(productId: number): void {

      this.productServices.get(productId).subscribe(productData => {
        const dialogRef = this.dialog.open(EditProductComponent, {
          width: '500px',
          data: productData
        });

        dialogRef.afterClosed().subscribe(result => {
          this.dataAll=[];
          this.loadData();
        });
      });
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const totalHeight = event.target.documentElement.scrollHeight;
    const scrolledHeight = event.target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
// console.log(windowHeight);
    if (scrolledHeight + windowHeight >= totalHeight) {
      this.page++;
      this.loadData();
    }
  }

  loadData(): void {
    this.productServices.getAll(this.page).subscribe((data) => {
      this.dataAll = [ ...this.dataAll, ...data];
      this.loading = false;
      // console.log(data);
    },
    error => {
      console.log(error);
    });
  }

}

