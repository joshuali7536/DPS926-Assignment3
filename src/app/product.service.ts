import { Injectable } from '@angular/core';
import { Product } from './Product';
import { ProductHistory } from './ProductHistory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [{
    id: '0',
    name: 'Shirt',
    price: 12.99,
    qty: 23
  },
  {
    id: '1',
    name: 'Jeans',
    price: 23.99,
    qty: 15
  }];
  private history: ProductHistory[] = [];
  private histDet: ProductHistory = {
    name: "",
    qty: 0,
    dateOfPurchase: null,
    total: 0
  };

  constructor() { }

  getAllProducts(){
    return [...this.products];
  }
  getProductById(productId){
    return {...this.products.find(product => {return product.id === productId;})}
  }
  getHistory(){
    return [...this.history];
  }
  setActiveHistory(hist: ProductHistory){
    this.histDet = hist;
  }
  getActiveHistory(){
    return this.histDet;
  }
  addProduct(product){
    this.products.push(product);
  }
  purchaseProduct(productId, purchaseQty){
    this.products[productId].qty = this.products[productId].qty - purchaseQty;
  }
  addStock(prodId, adjQty){
    this.products[prodId].qty = this.products[prodId].qty + adjQty;
  }
  removeStock(prodId, adjQty){
    this.products[prodId].qty = this.products[prodId].qty - adjQty;
  }
  addHistory(prodHist:ProductHistory){
    //console.log("addHistory()");
    //console.log(prodHist);
    this.history.push(prodHist);
  }
  getNewID(){
    return (this.products.length).toString();
  }
}
