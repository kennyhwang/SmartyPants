import { Component } from '@angular/core';
import { Address } from '../../model/address';
import { HomeService } from './home.service';
import { SmartyStreetResponse, SmartyStreetComponents, SmartyStreetMetadata, SmartyStreetAnalysis } from '../../model/smartyStreetResponse';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [HomeService],
    styleUrls: [
        '../../shared/styles.less',
        './home.component.less'
    ]
})
export class HomeComponent {
    public model: Address = new Address();
    public results: SmartyStreetResponse[] = [];
    public submitted: boolean = false;

    constructor(private homeService: HomeService) { }

    reset() {
        this.model = new Address();
        this.results = [];
        this.submitted = false;
    }

    submit() {
        //console.log(this.model);

        this.homeService.getAddress(this.model).subscribe(result => {
            this.submitted = true;
            this.results = result.json() as SmartyStreetResponse[];
        }, error => console.error(error));
    }
}
