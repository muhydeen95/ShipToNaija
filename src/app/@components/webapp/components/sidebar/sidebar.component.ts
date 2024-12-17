import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  openMore: boolean = true;
  openMore2: boolean = true;

  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;

  constructor( 
    private router: Router,
    public sidebarService: SidebarService
  ) {}

  ngOnInit(): void {}

  toggleMore(): void {
    this.openMore = !this.openMore;
  }

  onLogOut() {

    this.router.navigate(['/'])
  }
}
