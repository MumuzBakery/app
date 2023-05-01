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
        {name: '玛格丽特饼干', price: 7},
        {name: 'DIY蛋糕', price: 20},
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
    },
    {
      name: '提拉米苏',
      expanded: false,
      items: [
        {name: '经典原味提拉米苏', price: 11},
        {name: '厚芋泥提拉米苏', price: 12},
        {name: '香醇栗子提拉米苏', price: 12},
        {name: '抹茶椰椰提拉米苏', price: 11},
        {name: '奥利奥提拉米苏', price: 11}
      ]
    },
    {
      name: '巴斯克蛋糕',
      expanded: false,
      items: [
        {name: '原味巴斯克蛋糕', price: 11},
        {name: '榴莲巴斯克蛋糕', price: 12},
        {name: '抹茶巴斯克蛋糕', price: 11},
        {name: '可可巴斯克蛋糕', price: 11},
        {name: '红茶柠檬巴斯克蛋糕', price: 11}
      ]
    },
    {
      name: '雪媚娘',
      expanded: false,
      items: [
        {name: '奥利奥雪媚娘', price: 10},
        {name: '榴莲雪媚娘', price: 12},
        {name: '芒果雪媚娘', price: 10},
        {name: '草莓雪媚娘', price: 10}
      ]
    },
    {
      name: '千层卷',
      expanded: false,
      items: [
        {name: '榴莲迷你千层卷', price: 10},
        {name: '抹茶迷你千层卷', price: 9},
        {name: '芒果迷你千层卷', price: 9},
        {name: '可可奥奥迷你千层卷', price: 9}
      ]
    },
    {
      name: '肉松系列',
      expanded: false,
      items: [
        {name: '肉松小贝', price: 9},
        {name: '血糯米肉松麻薯', price: 10}
      ]
    },
    {
      name: '雪贝系列',
      expanded: false,
      items: [
        {name: '原味雪域冰酪', price: 9},
        {name: '芋泥雪域冰酪', price: 10},
        {name: '草莓雪域冰酪', price: 9},
        {name: '栗子雪域冰酪', price: 10}
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

  getTotalQuantity(): number {
    var totalquantity = 0;

    this.cartItems.forEach(item => {
      let quantity = 0;
      if (item.quantity) {
        quantity = item.quantity;
      }

      totalquantity += quantity;
    });

    return totalquantity;
  }

  getTotalPrice(): number {
    var totalprice = 0.0;

    this.cartItems.forEach(item => {
      let quantity = 0;
      if (item.quantity) {
        quantity = item.quantity;
      }

      totalprice += item.price * quantity;
    });

    return parseFloat((totalprice * this.discount).toFixed(2));
  }
}
