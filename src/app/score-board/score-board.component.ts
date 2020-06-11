import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private memoryService: MemoryService) { }

  ngOnInit(): void {
  }

  get currentScore(): number {
    return this.memoryService.Score;
  }

  get currentTries(): number {
    return this.memoryService.Tries;
  }

  get hasWon(): boolean {
    return this.memoryService.HasWon;
  }
}
