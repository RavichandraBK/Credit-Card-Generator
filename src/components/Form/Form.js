import React from 'react'
import './Form.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form(props) {

  let {cardDynamic} = props;
  
  let [error, setError] = useState(false);
  let [details, setDetails] = useState({
    cardName: "",
    cardNumber: '',
    cardMon: '',
    cardYear: '',
    cardCvv: ''
  })

  let chk = false;

  // let [len, setLen] = useState({
  //   cardnumlen: '',
  //   cardmonlen: '',
  //   cardyearlen: '',
  //   cardcvvlen: ''
  // })

  let cardNumberFormat = () => {
    let InputVals = details.cardNumber.replaceAll(" ", "");
    let tmp = InputVals;
    // console.log(details.cardNumber)
    if (details.cardNumber.length > 14) {
      tmp = InputVals.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
      setDetails({ ...details, cardNumber: tmp })
      // console.log(details.cardNumber)

    }
    else if (details.cardNumber.length > 9) {
      tmp = InputVals.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
      setDetails({ ...details, cardNumber: tmp })
    }
    else if (details.cardNumber.length > 4) {
      tmp = InputVals.replace(/(\d{4})(\d{0,4})/, "$1 $2");
      setDetails({ ...details, cardNumber: tmp })
     
    }

  }

  let handleError = () => {
    if (details.cardName === '' || details.cardNumber === '' || details.cardMon === '' || details.cardYear === '' || details.cardCvv === '' || (details.cardMon > 12 || details.cardMon < 1) || (details.cardCvv.length < 3) || (details.cardNumber.length<19)) {
      setError(true);
      chk = true;
      
    }
    else {
      setError(false);
      

    }
  }

 
 let showToast = ()=>{
    toast('✅Successfully updated the card!! ',{
      position:toast.POSITION.BOTTOM_CENTER,
      className:'toast'
    })
 }


  let handleSubmit = (e)=>{
    e.preventDefault();
    handleError();
    if(!chk){
      cardDynamic(details);
      showToast();
    }
  }


  return (
    <>
      <div className='form'>
        <div className='grad'></div>
        <div className='card-input'>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column' }}>

              <label id='lb-1' htmlFor='card-name'>CARDHOLDER NAME</label>
              <input id='card-name'
                placeholder='e.g. Jane Appleseed'
                type='text'
                onKeyDown={(e) => { if (!((e.key >= 'A' && e.key <= 'Z') || (e.key === ' ') || (e.key >= 'a' && e.key <= 'z') || (e.key === 'Backspace'))) { e.preventDefault(); } }}
                onChange={e => { setDetails({ ...details, cardName: e.target.value }) }}
              />
              {error && details.cardName.length <= 0 && <p id='er1' style={{ margin: '0px', textAlign: 'left' }}>CardHolder name  required</p>}
            </div>

            <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column' }}>
              <label id='lb-2' htmlFor='card-name'>CARD NUMBER</label>
              <input id='card-num'
                placeholder='e.g. 1234 5678 9123 0000'
                maxLength={19}
                value={details.cardNumber}
                type='text'
                onKeyDown={(e) => { if (!((e.key >= '0' && e.key <= '9') || (e.key === 'Backspace'))) { e.preventDefault(); } }}
                onKeyUp={cardNumberFormat}
                onChange={e => { setDetails({ ...details, cardNumber: e.target.value }) }}
              />
              {error && details.cardNumber.length <= 0 ? <p id='er2' style={{ margin: '0px', textAlign: 'left' }}>Card number required</p> : ""}
              {
                  (error && (details.cardNumber.length > 0 && details.cardNumber.length < 19)) ?
                    <p id='invalid-cardnum' >Invalid card number</p> : ""
                }
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <label id='lb-3' htmlFor='card-name'>EXP.DATE (MM/YY)</label>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '38%' }}>
                    <input id='card-mon'
                      placeholder='MM'
                      value={details.cardMon}
                      // onInvalid={e => { if(e.target.value>12 || e.target.value<1){e.target.setCustomValidity('Enter a valid month')}; }} 
                      type='text'
                      maxLength={2}
                      onKeyDown={(e) => { if (!((e.key >= '0' && e.key <= '9') || (e.key === 'Backspace'))) { e.preventDefault(); } }}
                      onKeyUp={(e) => { if ((e.key >= '0' && e.key <= '9' && e.target.value.length <= 1)) { setDetails({...details,cardMon:'0' + e.target.value}) } }}
                      onChange={e => { setDetails({ ...details, cardMon: e.target.value });if ((e.key >= '0' && e.key <= '9' && e.target.value.length <= 1)) { setDetails({...details,cardMon:'0' + e.target.value}) } }}
                    />
                    {
                      (error && details.cardMon.length <= 0) ?
                        <p id='er3'>MM required</p> : ""
                    }
                    {
                      (error && (details.cardMon < 1 || details.cardMon > 12) && details.cardMon.length > 0) ?
                        <p id='invalid-month' >Month Invalid</p> : ""
                    }
                  </div>
                  <div >
                    <input id='card-year'
                      placeholder='YY'
                      type='text'
                      value={details.cardYear}
                      maxLength={2}
                      onKeyDown={(e) => { if (!((e.key >= '0' && e.key <= '9') || (e.key === 'Backspace'))) { e.preventDefault(); } }}
                      onKeyUp={(e) => { if ((e.key >= '0' && e.key <= '9' && e.target.value.length <= 1)) { setDetails({...details,cardYear:'0' + e.target.value}) } }}

                      onChange={e => setDetails({ ...details, cardYear: e.target.value })}
                    />
                    {
                      (error && details.cardYear.length <= 0) ?
                        <p id='year-val' style={{ textAlign: 'right' }}>YY required</p> : ""
                    }

                  </div>

                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label id='lb-4' htmlFor='card-name'>CVC</label>
                <input id='card-cvv'
                  placeholder='e.g. 123'
                  type='text'

                  maxLength={3}
                  onKeyDown={(e) => { if (!((e.key >= '0' && e.key <= '9') || (e.key === 'Backspace'))) { e.preventDefault(); } }}
                  onChange={e => setDetails({ ...details, cardCvv: e.target.value })}
                />
                {
                  error && details.cardCvv.length <= 0 ?
                    <p id='er4' >CVC required</p> : ""
                }
                {
                  (error && (details.cardCvv.length > 0 && details.cardCvv.length < 3)) ?
                    <p id='invalid-month' >Invalid cvc</p> : ""
                }
              </div>

            </div>
            <button className='con-btn'>Confirm</button>

          </form>
        </div>
        <ToastContainer toastStyle={{ backgroundColor: "green",color:'#fff' }}/>
      </div>
    </>
  )
}

export default Form
