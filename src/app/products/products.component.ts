import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Array<any>;
  constructor() {}
  
  ngOnInit():void {
    this.products = [
      {id : 1, name: "Computer", price : 6500},
      {id : 2, name: "Printer", price : 1200},
      {id : 3, name: "Smart Phone", price : 1400}
    ];
  }
}
