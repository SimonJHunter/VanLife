import {Component, OnInit} from '@angular/core';
import {ISite} from './site';
import {SiteService} from './site.service';

@Component({
  selector: 'app-vl-sites',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSites = this.listFilter ? this.performFilter(this.listFilter) : this.sites;
  }
  pageTitle = 'Van Sites List';
  imageWidth = 50;
  imageMargin = 2;
  imageVisable = true;
  errorMessage: '';

  private _listFilter: string;

  filteredSites: ISite[];
  sites: ISite[] = [];

  constructor(private siteService: SiteService) {
  }

  // function used to toggle image
  toggleImage(): void {
    this.imageVisable = !this.imageVisable;
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List- ' + message;
  }
  ngOnInit(): void {
    this.siteService.getSites().subscribe(
      sites => {
        this.sites = sites;
        this.filteredSites = this.sites;
      },
      error => this.errorMessage = <any>error
    );
  }

  private performFilter(filterBy: string): ISite[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.sites.filter((site: ISite) =>
      site.category.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
