import { Component, OnInit } from '@angular/core';
import {ISite} from './site';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  pageTitle = 'Site Detail';
  site: ISite;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.site = {
      "siteId": 2,
      "name": "Three Lochs View",
      "category": "Designated Camping",
      "location": "Trossachs",
      "shortDescription": "11km of wilderness parking",
      "price": 2.99,
      "starRating": 4.2,
      "facilities": "A, B, F, G, K",
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/293868/van16.png"
    }
  }

  onBack(): void {
    this.router.navigate(['/sites']);
  }

}
