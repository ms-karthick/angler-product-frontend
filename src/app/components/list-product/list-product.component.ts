import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  data?:  any[];
 

  constructor(private productServices: ProductService) {}

  ngOnInit() {
    this.productServices.getAll().subscribe((data) => {
        this.data = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  }


