import { Component, OnInit } from '@angular/core';
import { Dashboard, Notification } from '@core/interfaces';
import { Router } from '@angular/router';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { ShippingList } from '@core/jsons/shipping-list.json';
import { NotificationService } from '@core/services/notification.service';
import { Shipment } from '@core/interfaces/shipment.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardAnalysis: Dashboard;
  hour!: number;

  shippingList: Shipment[] = ShippingList;

  addresses: any[] = [
    {id: 1, title: 'Atlanta Warehouse', address: '3770 Zip Industrial Blvd SE suite d, Atlanta, GA 30354, USA.'},
    {id: 2, title: 'Atlanta Warehouse', address: '3770 Zip Industrial Blvd SE suite d, Atlanta, GA 30354, USA.'},
    // {id: 3, title: 'Atlanta Warehouse', address: '3770 Zip Industrial Blvd SE suite d, Atlanta, GA 30354, USA.'},
  ];

  heatmapData = [
    {
      name: 'Nov',
      series: [
        { name: '1', value: 0 },
        { name: '2', value: 2 },
        { name: '3', value: 4 },
        { name: '4', value: 6 },
        { name: '5', value: 3 },
        { name: '6', value: 1 },
        { name: '7', value: 0 }
      ]
    },
    {
      name: 'Dec',
      series: [
        { name: '1', value: 5 },
        { name: '2', value: 1 },
        { name: '3', value: 3 },
        { name: '4', value: 2 },
        { name: '5', value: 4 },
        { name: '6', value: 6 },
        { name: '7', value: 0 }
      ]
    },
    {
      name: 'Jan',
      series: [
        { name: '1', value: 0 },
        { name: '2', value: 1 },
        { name: '3', value: 4 },
        { name: '4', value: 6 },
        { name: '5', value: 3 },
        { name: '6', value: 2 },
        { name: '7', value: 0 }
      ]
    },
    {
      name: 'Feb',
      series: [
        { name: '1', value: 0 },
        { name: '2', value: 3 },
        { name: '3', value: 2 },
        { name: '4', value: 5 },
        { name: '5', value: 6 },
        { name: '6', value: 1 },
        { name: '7', value: 0 }
      ]
    },
    {
      name: 'Mar',
      series: [
        { name: '1', value: 2 },
        { name: '2', value: 4 },
        { name: '3', value: 6 },
        { name: '4', value: 1 },
        { name: '5', value: 5 },
        { name: '6', value: 0 },
        { name: '7', value: 0 }
      ]
    },
    {
      name: 'Apr',
      series: [
        { name: '1', value: 3 },
        { name: '2', value: 2 },
        { name: '3', value: 0 },
        { name: '4', value: 6 },
        { name: '5', value: 4 },
        { name: '6', value: 1 },
        { name: '7', value: 0 }
      ]
    }
  ];

  multi = [
    {
      "name": "Air",
      "series": [
        { "name": "Air Basic", "value": 30 }, // Ensure 'value' is a number
        { "name": "Air Standard", "value": 70 } // No undefined or invalid values
      ]
    },
    {
      "name": "Ocean",
      "series": [
        { "name": "Ocean Basic", "value": 50 },
        { "name": "Ocean Premium", "value": 50 }
      ]
    }
  ];  

  legendPosition2: LegendPosition = LegendPosition.Right;

  // Updated color scheme with a valid ScaleType for the group property
  colorScheme: Color = {
    domain: ['#5549D2', '#AAA3E7', '#DBD9F5', '#F3F4F6'],
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal // Use a valid value from the ScaleType enum
  };

  legendPosition: LegendPosition = LegendPosition.Below;


  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    // this.getDashboardData();
  }

  createSurvey() {
    
  }

  goToSurveyResponses(id: string) {
    this.router.navigate(['/app/surveys/view', id, 'responses']);
  }

  goToSurvey(id: string) {
    this.router.navigate(['/app/surveys/view', id]);
  }

  copyAddress(address: string) {
    navigator.clipboard.writeText(address);

    const notification: Notification = {
      state: 'success',
      message: `Copied successfully`,
    };

    this.notificationService.openNotification(
      notification,
      'saw-notification-success'
    );
  }

}
