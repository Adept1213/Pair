import './style.css';
import question from './../../icons/question.png';
import { ICard } from '../Main/Main';
import { memo } from 'react';


function CardInner({id, icon, open, guessed}: ICard): JSX.Element {
    return (
            guessed 
            ?
            <div className="card__wrapper" id={id.toString()}>
                <div className='card__back_o'>
                    <img src={icon} alt="oops"/>
                </div>
            </div>
            :
            <div className="card__wrapper" id={id.toString()}>
                <div className={open ? 'card_active' : 'card'}>
                <img src={question} alt="oops"/>
                </div>
                <div className={!open ? 'card__back_active' : 'card__back'}>
                    <img src={icon} alt="oops"/>
                </div>
            </div>
    )
}

export const Card = memo(CardInner)