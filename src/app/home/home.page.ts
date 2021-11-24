import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  listOfProducts: Product[];
  currProduct: string = "Placeholder";
  currQty: string = "";
  currTotal: number = 0;
  currProductId: string = "";

  constructor(private service: ProductService, private alertController : AlertController) {}

  ngOnInit(){
    this.listOfProducts = this.service.getAllProducts();
  }

  ionViewWillEnter(){
    this.listOfProducts = this.service.getAllProducts();
  }

  selectProduct(id){
    this.currProductId = id;
    this.currProduct = this.listOfProducts[id].name;

    if (this.currProductId != "" && this.currQty != ""){
      this.calculateTotal();
    }
  }

  numClicked(number){
    this.currQty = this.currQty + number;

    if (this.currProductId != "" && this.currQty != ""){
      this.calculateTotal();
    }
  }

  clearQty(){
    this.currQty = "";
    this.currTotal = 0;
  }

  backspace(){
    if (this.currQty != ""){
      this.currQty = this.currQty.slice(0, -1);
      if (this.currQty == ""){
        this.currTotal = 0;
      }
      else if (this.currProductId != "" && this.currQty != ""){
        this.calculateTotal();
      }
    }
  }

  calculateTotal(){
    this.currTotal = this.listOfProducts[this.currProductId].price * parseInt(this.currQty);
  }

  makePurchase(){
    if (this.currProductId == "" || this.currQty == "" || parseInt(this.currQty) == 0){
      this.presentAlert("Missing Input", "Please select an item and enter a quantity.")
    }
    else if (this.listOfProducts[this.currProductId].qty >= parseInt(this.currQty)){
      var newHist = {
        name: this.currProduct,
        qty: parseInt(this.currQty),
        dateOfPurchase: new Date(),
        total: this.currTotal
      }
      //console.log("makePurchase()");
      //console.log(newHist);
      this.service.removeStock(this.currProductId, this.currQty);
      this.service.addHistory(newHist);
      this.presentAlert("Purchase Made", "You have bought " + this.currQty + " " + this.currProduct + " for $" + this.currTotal);
      this.clearQty();
    }
    else{ //Alert not enough in stock
      this.presentAlert("Purchase Failed", "Not enough items in stock.");
    }
  }

  async presentAlert(title:string, msg:string){
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK']
    })
    await alert.present();
  }
}
