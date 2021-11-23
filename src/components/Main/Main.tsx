import './style.css';
import { Card } from '../Card/Card';
import React, { useEffect, useState } from 'react';
import { array } from '../../Cards/Cards';

export interface ICard {
    id : number | string,
    icon : string,
    open : boolean,
    guessed : boolean
}

function makeRandomCopy(arr: ICard[]): ICard[] {
    let copyArr: ICard[] = JSON.parse(JSON.stringify(array));
    return copyArr.sort(cbRandomArr)
} 

function cbRandomArr(a: ICard, b: ICard) {
    return Math.random() - 0.5;
}

export function Main(): JSX.Element {
    let [cards, setCards] = useState(makeRandomCopy(array));

    function changeStateCardsOpen(id: number): void {
        let index: number = cards.findIndex(i => i.id === id); 
        setCards(prev => {
            let copy: ICard[] = JSON.parse(JSON.stringify(prev));
            copy[index].open = !copy[index].open;
            return [...copy] 
        })
    };
    function changeCardsAllClose(): void {
        setCards(prev => {
            let copy: ICard[] = JSON.parse(JSON.stringify(prev));
            copy = copy.map(i => {
                return {
                    ...i,
                    open : false,
                }
            });
            return [...copy] 
        })
    };
    function changeCardsGuessed(arr: number[]): void {
        let first: number = cards.findIndex(i => i.id === arr[0]); 
        let second: number = cards.findIndex(i => i.id === arr[1]);
        setCards(prev => {
            let copy: ICard[] = JSON.parse(JSON.stringify(prev));
            copy[first].guessed = true;
            copy[first].open = false;
            copy[second].guessed = true;
            copy[second].open = false;
            Object.freeze(copy[first])
            Object.freeze(copy[second])
            return [...copy];
        }) 
    };

    function getId(event: React.MouseEvent<Element, MouseEvent>) {
        let element = event.target as HTMLElement;
        let idString: string | undefined = element?.parentElement?.id || element?.parentElement?.parentElement?.id;
        return Number(idString);
    };
    function click(event: React.MouseEvent<Element, MouseEvent>): void {
        let id = getId(event);
        id >= 0 && changeStateCardsOpen(id);
    };
    function guess(): void {
        let pair: ICard[] = cards.filter(i => i.open === true);
        if (pair.length === 2 && pair[0].icon === pair[1].icon) {
            let id: number[] = [pair[0].id as number, pair[1].id as number];
            changeCardsGuessed(id);
        } else if (pair.length === 2) {
            changeCardsAllClose();
        }
    };

    useEffect(() => {
        setTimeout(guess, 1000)
    }, [cards.filter(i => i.open).length])

    return(
        <main onClick={click}>
            {cards.map(i => <Card {...i} key={i.id}/>)}
        </main>
    )
}