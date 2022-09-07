import { Order } from '@model/order';
import { Product } from '@model/product';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.items)
  product: Product;

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number) {
    this.price = price;
  }

  getOrder(): Order {
    return this.order;
  }

  setOrder(order: Order) {
    this.order = order;
  }

  getProduct(): Product {
    return this.product;
  }

  setProduct(product: Product) {
    this.product = product;
  }
}
