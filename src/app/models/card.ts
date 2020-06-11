const CARD_COLORS = [
    'RED',
    'GREEN',
    'BLUE',
    'VIOLET',
    'YELLOW',
    'GREY',
    'PURPLE',
    'PINK'
]

export interface Card {
    x: number;
    color: string;
    flipped: boolean;
}

export const CARDS: Array<Card> = CARD_COLORS.map(color => {
    return {
        x: 0,
        color: color,
        flipped: false
    }
});