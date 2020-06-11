import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../services/memory.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-playing-board',
  templateUrl: './playing-board.component.html',
  styleUrls: ['./playing-board.component.scss']
})
export class PlayingBoardComponent implements OnInit {

  playingBoard: Card[];

  constructor(private memoryService: MemoryService) { }

  ngOnInit(): void {
    this.playingBoard = this.memoryService.PlayingBoard;
  }

  cardFlipped(card: Card) {
    this.memoryService.pickCard(card);
  }
}
