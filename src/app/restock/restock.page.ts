import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.page.html',
  styleUrls: ['./restock.page.scss'],
})
export class RestockPage implements OnInit {
  listOfProducts: Product[];
  currProductId: string;
  currProduct: string = "Select a Product";
  addQty: number;

  constructor(private service: ProductService, private alertController : AlertController, private nav: NavController) { }

  ngOnInit() {
    this.listOfProducts = this.service.getAllProducts();
  }

  selectProduct(id){
    this.currProductId = id;
    this.currProduct = this.listOfProducts[id].name;
  }

  addStock(){
    if (this.addQty != null && this.addQty > 0 && this.currProductId != null){
      this.service.addStock(this.currProductId, Math.trunc(this.addQty));
      this.presentAlert("Stock added", "Added " + Math.trunc(this.addQty) + " " + this.currProduct);
      this.addQty = null;
    }
    else{
      this.presentAlert("Missing input", "Please select an item and enter a quantity.");
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

  cancel(){
    this.nav.back();
  }
}
