import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './site-nosuchsite.component.html',
  styleUrls: ['./site-nosuchsite.component.css']
})
export class SiteNosuchsiteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
  }

  onBack(): void {
    this.router.navigate(['/sites']);

  }

}
