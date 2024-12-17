import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @ViewChild('searchQuery') searchQueryElement!: ElementRef;
  @Input() header: string = '';
  @Input() SubHeader: string = '';
  @Input() btnName: string = '';
  @Output() btnAction = new EventEmitter();
  @Output() filterAction = new EventEmitter();
  @Output() searchAction = new EventEmitter();
  @Output() sortAction = new EventEmitter();
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  @Input() viewCalendar: boolean = true;
  @Input() canFilter: boolean = false;
  public searchString: string = '';

  currentDate: Date = new Date();
  formattedDate: string = '';

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() { 
    this.updateFormattedDate();

  }

  changeMonth(step: number): void {
    const currentMonth = this.currentDate.getMonth();
    this.currentDate.setMonth(currentMonth + step); 
    this.updateFormattedDate();
  }

  private updateFormattedDate(): void {
    const month = this.monthNames[this.currentDate.getMonth()];
    const year = this.currentDate.getFullYear();
    this.formattedDate = `${month}, ${year}`;
  }

  public btnPressed(event?: string): void {
    this.btnAction.emit(event);
  }

  public filterPressed(): void {
    this.filterAction.emit();
  }

  public searchPressed(): void {
    this.searchAction.emit({search: this.searchString, action: true});
  }

  public getSearchQuery(
    searchQuery: string,
    event: KeyboardEvent | any,
    clear?: boolean
  ): void {
    clear ? (this.searchQueryElement.nativeElement.value = '') : null;
    this.searchQuery.emit(searchQuery);
    this.searchString = searchQuery;
    const key = event.key || event.keyCode;

    if (key == 'Enter' || key == 8 || searchQuery == '') {
      this.searchAction.emit({search: searchQuery, action: true});
    }
  }
}
