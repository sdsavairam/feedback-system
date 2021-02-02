import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() itemId: number;
  @Input() isReadonly: boolean;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  public inputName: string;
  constructor() { }


  ngOnInit(): void {
    this.inputName = this.itemId + '_rating';
  }

  onClick(rating: number): void {
    if(!this.isReadonly){
      this.rating = rating;
      this.ratingClick.emit({
        itemId: this.itemId,
        rating: rating
      });
    }
  }

}
