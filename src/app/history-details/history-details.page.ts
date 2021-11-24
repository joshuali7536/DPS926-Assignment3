import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductHistory } from '../ProductHistory';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {
  private history: ProductHistory;
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.history = this.service.getActiveHistory();
  }

}
