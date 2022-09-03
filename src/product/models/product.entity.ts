import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: string;

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  };

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  };

  setDescription(description: string) {
    this.description = description;
  }

  getDescription(): string {
    return this.description;
  };

  setImage(image: string) {
    this.image = image;
  }

  getImage(): string {
    return this.image;
  };

  setPrice(price: string) {
    this.price = price;
  }

  getPrice(): string {
    return this.price;
  };
}