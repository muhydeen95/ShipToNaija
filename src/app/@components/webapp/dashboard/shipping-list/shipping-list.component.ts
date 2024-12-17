import { Observable, of } from 'rxjs';
import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss'],
})
export class ShippingListComponent implements OnChanges {
  displayedColumns: string[] = [
    'trackingId', 'courier', 'category',
    'date', 'destination', 'weight',
    'cost', 'status', 'action',
  ];

  dataSource: MatTableDataSource<any> | null = null;
  totalRecords!: number;

  @Input() data: any[] | null;
  @Input() isLoading: Observable<boolean> = of(false);

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.data!);

    setTimeout(() => {
      this.dataSource!.sort = this.sort;
    });
  }

  goToSurvey(id: string) {
    this.router.navigate(['/app/surveys/view', id]);
  }
}
