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
  expanded?: boolean;
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
      name: '各式甜品',
      expanded: false,
      items: [
        {name: '椰子冻', price: 10},
        {name: '椰青面条饱饱碗', price: 9},
        {name: '奥利奥鲜奶麻薯', price: 6},
        {name: '玛格丽特饼干', price: 7}
      ]
    },
    {
      name: '盒子蛋糕',
      expanded: false,
      items: [
        {name: '奥利奥海盐盒子', price: 10},
        {name: '芋泥麻薯盒子', price: 11},
        {name: '醇香栗子盒子', price: 11},
        {name: '芒果血糯米盒子', price: 10},
        {name: '奶香玉米盒子', price: 9},
        {name: '草莓酱多多盒子', price: 10},
        {name: '芒果酱多多盒子', price: 10}
      ]
    }
  ];

  cartItems: Item[] = [];
  discount = 0.85;
  expandedCategory: Category | null = null;

  expandCategory(category: Category) {
    if (this.expandedCategory && this.expandedCategory !== category) {
      this.expandedCategory.expanded = false;
    }
    category.expanded = true;
    this.expandedCategory = category;
  }

  collapseCategory(category: Category) {
    category.expanded = false;
    this.expandedCategory = null;
  }

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
