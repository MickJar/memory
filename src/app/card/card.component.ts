import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Card } from '../models/card';
import { MemoryService } from '../services/memory.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output() flippedEvent = new EventEmitter();



  constructor(private memoryService: MemoryService) { }

  ngOnInit(): void {
    this.memoryService.flipper.subscribe(card => {
      if (card.x == this.card.x) {
        this.card.flipped = card.flipped;
      }
    })
  }

  @HostListener("click") 
  onClick(){
    if (this.card.flipped) {
      return;
    }
    this.flippedEvent.emit(this.card);
  }
}
