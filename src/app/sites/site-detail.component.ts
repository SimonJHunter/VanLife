import { Component, OnInit } from '@angular/core';
import {Site} from './site';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteService} from './site.service';

@Component({
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  pageTitle = 'Site Detail';
  errorMessage = '';
  site: Site | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getSite(id);
    }
  }

  private getSite(id: number) {
    this.siteService.getSite(id).subscribe(
      site => this.site = site,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/sites']);
  }


}
