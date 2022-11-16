import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  name: string,
  author?: string,
  uid: string,
  price: number,
  image?: string,
  stringPrice?: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];

  constructor(private http: HttpClient) {
    this.fillArray(20);
  }

  ProductArray(amount: number): Product[] {
    const output: Product[] = [];

    while (amount > 0) {
      this.getJSON("https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum").subscribe(data => {
        const product: Product = {
          name: (data as any).short_sentence,
          uid: (data as any).uid,
          price: Math.round(((Math.random() * 100) + Number.EPSILON) * 100) / 100
        };

        product.stringPrice = product.price.toFixed(2);

        this.getPicsum(Math.floor(Math.random() * 1085)).subscribe(data => {
          if (data.status === 200) {
            product.image = data.url;
          }
        });

        this.getJSON("https://random-data-api.com/api/users/random_user").subscribe(data => {
          product.author = `${(data as any).first_name} ${(data as any).last_name}`;
        });

        output.push(product);
      });

      amount--;
    }

    return output;
  }

  fillArray(amount: number) {
    while (amount > 0) {
      this.getJSON("https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum").subscribe(data => {
        const product: Product = {
          name: (data as any).short_sentence,
          uid: (data as any).uid,
          price: Math.round(((Math.random() * 100) + Number.EPSILON) * 100) / 100
        };

        product.stringPrice = product.price.toFixed(2);

        this.getPicsum(Math.floor(Math.random() * 1085)).subscribe(data => {
          if (data.status === 200) {
            product.image = data.url;
          }
        });

        this.getJSON("https://random-data-api.com/api/users/random_user").subscribe(data => {
          product.author = `${(data as any).first_name} ${(data as any).last_name}`;
        });

        this.products.push(product);
      });

      amount--;
    }
  }

  private getJSON(url: string): Observable<any> {
    return this.http.get<any>(url, {observe:'body', responseType:'json'});
  }


  private getPicsum(id: number): Observable<any> {
    return this.http.get(`https://picsum.photos/id/${id}/400/300`, { observe: 'response', responseType: 'text' });
  }
}
