import { Component } from '@angular/core';

export interface Item {
  name: string;
  price: number;
  quantity?: number;
  note?: string;
}

export interface Category {
  name: string;
  items: Item[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mmz-bakery';

  categories: Category[] = [
    {
      name: 'Cakes',
      items: [
        {name: 'Chocolate Cake', price: 10},
        {name: 'Carrot Cake', price: 12},
        {name: 'Red Velvet Cake', price: 15}
      ]
    },
    {
      name: 'Pastries',
      items: [
        {name: 'Croissant', price: 3},
        {name: 'Danish', price: 3.5},
        {name: 'Turnover', price: 4}
      ]
    }
  ];

  cartItems: Item[] = [];
  discount = 0.85;

  addItem(item: Item) {
    let existingItem = this.cartItems.find(i => i.name === item.name);
    if (!existingItem) {
      this.cartItems.push({...item, quantity: 1, note: ""});
    }

    this.cartItems = this.cartItems.slice();
  }

  removeItem(item: Item) {
    let index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartItems = this.cartItems.slice();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      let quantity = 0;
      if (item.quantity) {
        quantity = item.quantity;
      }
      return parseFloat(((total + item.price * quantity) * this.discount).toFixed(2));
    }, 0);
  }
}
