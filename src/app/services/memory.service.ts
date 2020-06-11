import { Injectable } from '@angular/core';
import { PlayingBoard } from '../models/playingBoard';
import { Card, CARDS } from '../models/card';
import { Subject, Observable } from 'rxjs';

export enum BoardState {
  NO_CARD_FLIPPED = 1,
  CARD_FLIPPED,
  TWO_CARDS_FLIPPED,
  GAME_WON,
  GAME_OVER
}

export enum GameDifficulty {
  HARD = 1,
  MEDIUM,
  EASY
}

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private playingBoard: PlayingBoard;
  private currentPlayCard: Card;
  private boardState: BoardState = BoardState.NO_CARD_FLIPPED;
  private score: number = 0;
  private tries: number = 0;
  private difficulty: GameDifficulty = GameDifficulty.EASY;
  private subject = new Subject<Card>();
  
  
  public flipper: Observable<Card> = this.subject.asObservable();
  boardSize: number = 8;
  lockBoard: boolean = false;

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    let cards = this.initializeDeckOfCards();
    
    this.playingBoard = <PlayingBoard>{
      cards: cards
    }

    this.playingBoard.cards.forEach((card, index) => {
      card.x = index
    });

    this.playingBoard.cards = this.shuffle(this.playingBoard.cards);

  }

  private initializeDeckOfCards() {
    const deck = CARDS;
    const deckClone = [];
    deck.forEach(card => deckClone.push(Object.assign({}, card)));
    let cards = deck.concat(deckClone);
    return cards;
  }


  get Score() {
    return this.score;
  }

  get Tries() {
    return this.tries;
  }

  get HasWon() {
    return this.boardState == BoardState.GAME_WON;
  }

  get PlayingBoard(): Card[] {
    return this.playingBoard.cards;
  }

  public async pickCard(card: Card): Promise<boolean> {
    if (this.lockBoard) {
      return;
    }
    switch(this.boardState) {
      case BoardState.NO_CARD_FLIPPED: {
        // Flip card
        this.currentPlayCard = card;
        this.boardState = BoardState.CARD_FLIPPED;
        this.flipCard(card);
        return true;
      }
      case BoardState.CARD_FLIPPED: {
        // Compare Cards
        if (this.currentPlayCard.color == card.color) {
          this.boardState = BoardState.TWO_CARDS_FLIPPED;
          this.flipCard(card);
          return this.pickCard(card);
        } else {
          this.flipCard(card);
          await this.delay(this.difficulty * 1000);
          this.turnCardBack(card);
          this.turnCardBack(this.currentPlayCard);
          this.currentPlayCard = null;
          this.boardState = BoardState.NO_CARD_FLIPPED;
          return false;
        }
      }
      case BoardState.TWO_CARDS_FLIPPED: {
        // Count score
        this.boardState = BoardState.NO_CARD_FLIPPED;
        this.score++;
        
        if (this.score == this.boardSize) {
          this.boardState = BoardState.GAME_WON
          return true;
        };
        this.currentPlayCard = null;
        return true;
      }
    }
  }

  private turnCardBack(card: Card) {
    card.flipped = false;
    this.subject.next(card);
  }

  private flipCard(card: Card) {
    this.tries++;
    card.flipped = true;
    this.subject.next(card);
  }

  private delay(ms: number) {
    this.lockBoard = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.lockBoard = false;
        resolve();
      }, ms);
    });
  }

  private shuffle(arr: Card[]): Card[] {
    const newArr = arr.slice();
    for (let i = newArr.length; i; i -= 1) {
        const j = Math.floor(Math.random() * i);
        const x = newArr[i - 1];
        newArr[i - 1] = newArr[j];
        newArr[j] = x;
    }
    return newArr;
  }
}