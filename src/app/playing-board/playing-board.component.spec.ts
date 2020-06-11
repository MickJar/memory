import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingBoardComponent } from './playing-board.component';

describe('PlayingBoardComponent', () => {
  let component: PlayingBoardComponent;
  let fixture: ComponentFixture<PlayingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
