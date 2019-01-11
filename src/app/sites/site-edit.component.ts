import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Site } from './site';
import { SiteService } from './site.service';


import { NumberValidators } from '../shared/number-validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
   templateUrl: './site-edit.component.html',
 })

export class SiteEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Site Edit';
  errorMessage: string;
  siteForm: FormGroup;

  categoryOptions = ['Wild Camping', 'Designated Camping'];

  site: Site;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get facilities(): FormArray {
    return <FormArray>this.siteForm.get('facilities');
  }

  constructor(private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private siteService: SiteService
  ) {
//
//     // Defines all of the validation messages for the form.
//     // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: 'Site name is required.',
        minlength: 'Site name must be at least three characters.',
        maxlength: 'Site name cannot exceed 50 characters.'
      },
      category: {
        required: 'A Category is required.'
      },
      location: {
        required: 'A Location is required.'
      },
      shortDescription: {
        required: 'A short description is required.'
      },
      starRating: {
        range: 'Rate the site between 1 (lowest) and 5 (highest).'
      }
    };
//     // Define an instance of the validator for use with this form,
//     // passing in this form's set of validation messages.
     this.genericValidator = new GenericValidator(this.validationMessages);
   }

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: '',
      price: [''],
      starRating: ['', NumberValidators.range(1, 5)],
      facilities: this.fb.array([])
    });

    // Read the site Id from the route parameter
     this.sub = this.route.params.subscribe(
       params => {
         const id = +params['id'];
         this.getSite(id);
       }
     );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.siteForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.siteForm);
    });
  }

  // Add and Delete facility rows.
  addFacility(): void {
    this.facilities.push(new FormControl());
  }

  deleteFacility(index: number): void {
    this.facilities.removeAt(index);
    this.facilities.markAsDirty();
  }

  getSite(id: number): void {
    this.siteService.getSite(id)
      .subscribe(
        (site: Site) => this.displaySite(site),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displaySite(site: Site): void {
    if (this.siteForm) {
      this.siteForm.reset();
    }
    this.site = site;

    if (this.site.id === 0) {
      this.pageTitle = 'Add Site';
    } else {
      this.pageTitle = `Edit Site: ${this.site.name}`;

      // Update the data on the form
      this.siteForm.patchValue({
        name: this.site.name,
        category: this.site.category,
        location: this.site.location,
        shortDescription: this.site.shortDescription,
        description: this.site.description,
        price: this.site.price,
        starRating: this.site.starRating
      });

      this.siteForm.setControl('facilities', this.fb.array(this.site.facilities || []));
    }
}

  deleteSite(): void {
    if (this.site.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the site: ${this.site.name}?`)) {
        this.siteService.deleteSite(this.site.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveSite(): void {
    if (this.siteForm.valid) {
      if (this.siteForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.site, ...this.siteForm.value };

        if (p.id === 0) {
          this.siteService.createSite(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.siteService.updateSite(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.siteForm.reset();
    this.router.navigate(['/sites']);
  }

}


