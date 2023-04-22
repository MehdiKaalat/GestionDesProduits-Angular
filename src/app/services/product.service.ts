import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { pageProduct, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;
  constructor() {
    this.products = [
      {id : UUID.UUID(), name: "Computer", price : 6500, promotion: true},
      {id : UUID.UUID(), name: "Printer", price : 1200, promotion: false},
      {id : UUID.UUID(), name: "Smart Phone", price : 1400, promotion: true}
    ];
    for (let i=0; i<10 ; i++){
      this.products.push({id : UUID.UUID(), name: "Computer", price : 6500, promotion: true});
      this.products.push({id : UUID.UUID(), name: "Printer", price : 1200, promotion: false});
      this.products.push({id : UUID.UUID(), name: "Smart Phone", price : 1400, promotion: true});
    }
  }
  // Get Products
  public getAllProducts(): Observable<Product[]>{
    return of(this.products);
  }
  // Get page products
  public getPageProducts(page : number, size : number): Observable<pageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
    if (this.products.length % size != 0)
      totalPages++;
    let pageProducts = this.products.slice(index, index+size);
    return of({page:page,  size:size, totalPages:totalPages, products:pageProducts});
  }
  // Delete Product
  public deleteProduct(id: string): Observable<boolean>{
    this.products = this.products.filter(p=>p.id != id);
    return of(true);
  }
  // Set Promotion
  public setPromotion(id : string) : Observable<boolean>{
    let product = this.products.find(p=>p.id == id);
    if (product  != undefined){
      product.promotion = !product.promotion;
      return of(true);
    }
    else return throwError(()=> new Error("Product not found"))
    
  }
  // Search
  public searchProducts(keyword : string, page : number, size: number) : Observable<pageProduct>{
    let result = this.products.filter(p=> p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length/size);
    if (this.products.length % size != 0)
      totalPages++;
    let pageProducts = result.slice(index, index+size);
    return of({page:page,  size:size, totalPages:totalPages, products:pageProducts});
  }
}
