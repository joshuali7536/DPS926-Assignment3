import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage implements OnInit {
  product: Product = {
    id: "",
    name: "",
    price: null,
    qty: null
  }

  constructor(private service: ProductService, private alertController : AlertController, private router: Router) { }

  ngOnInit() {
  }

  // addProduct(){
  //   this.product.id = this.service.getNewID();
  //   this.service.addProduct(this.product);

  //   this.presentAlert("Product Added", this.product.name + "(" + this.product.qty + ") added. Price: $" + this.product.price);
  // }

  addProduct(form: NgForm){
    if (form.valid){
      this.product.id = this.service.getNewID();
      this.product.name = form.value.name;
      this.product.price = form.value.price;
      this.product.qty = Math.trunc(form.value.quantity);

      this.service.addProduct(this.product);

      this.presentAlert("Product Added", this.product.name + "(" + this.product.qty + ") added. Price: $" + this.product.price);
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
