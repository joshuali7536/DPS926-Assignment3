import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductHistory } from '../ProductHistory';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historyList: ProductHistory[];
  constructor(private service: ProductService, private router: Router) { }

  ngOnInit() {
    this.historyList = this.service.getHistory();
  }

  navDetails(history:ProductHistory){
    this.service.setActiveHistory(history);
    this.router.navigate(['/history-details']);
  }
}
