import React from 'react'
import './CardLayout.css'

export default function CardLayout({cardNumber,owner,expMon,expYY,cardCVV}) {
  return (
    <>
      <div className='container'>
        <div className='front-card'>
            <div className='dsgn-crls'>
                <div className='big-cir'></div>
                <div className='small-cir'></div>
            </div>
            <div className='credit-num'><p>{cardNumber?cardNumber:'0000 0000 0000 0000'}</p></div>
            <div className='credit-own'>
                <p>{owner?owner.toUpperCase():'JANE APPLESEED'}</p>
                <p>{`${expMon?expMon:'00'}/${expYY?expYY:'00'}`}</p>
            </div>
        </div>
        <div className='back-card'>
            <p>{cardCVV?cardCVV:'000'}</p>
        </div>

      </div>
    </>
  )
}
