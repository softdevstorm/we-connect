import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

@Component({
    selector: "app-campaign-contacts",
    templateUrl: "./campaigncontacts.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignContactsComponent implements OnInit, AfterViewInit {
    data: any;

    private profile: object = {
        name: "Anna Strong",
        job: "Chief Financial Officer",
        img: "assets/app/media/img/users/user1.jpg",
        university: "Harvard University",
        city: "New York"
    };

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.dataService.getData().subscribe(
            data => {
                this.data = data;
            },
            error => {}
        );

        var datatable = (<any>$("#json_data")).mDatatable({
            // datasource definition
            data: {
                type: "remote",
                source: {
                    read: {
                        url: "./json/data.json",
                        method: "GET"
                    }
                },
                pageSize: 10
            },

            // layout definition
            layout: {
                theme: "default", // datatable theme
                class: "we_connect_table", // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            // columns definition
            columns: [
                {
                    field: "img",
                    title: "Logo",
                    width: 50,
                    sortable: false,
                    template: function(row) {
                        return (
                            '<img src="' + row.img + '" class="profile-img" data-id="' + row.id + '"/>'
                        );
                    }
                },
                {
                    field: "name",
                    title: "Name",
                    width: 240,
                    sortable: false,
                    template: function(row) {
                        return (
                            '<span class="m-widget3__username">' +
                            row.name +
                            '</span><br>\
									<span class="m-widget3__time">' +
                            row.job +
                            "</span>"
                        );
                    }
                },
                {
                    field: "status",
                    title: "Status",
                    sortable: false,
                    width: 60,
                    template: function(row) {
                        return (
                            '<a href="javascript:;" class="m-portlet__nav-link m-portlet__nav-link--icon m-portlet__nav-link--icon-xl m-dropdown__toggle">' +
                            row.status +
                            "</a>"
                        );
                    }
                }
            ]
        });

        let that = this;
        jQuery(document)
            .off("click", ".profile-img")
            .on("click", ".profile-img", function() {
                let id = $(this).attr("data-id");
                that.profile = that.data.find(x => x.id == id);
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-campaign-contacts", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
