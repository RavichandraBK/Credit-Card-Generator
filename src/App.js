import Form from './components/Form/Form';
import './App.css';
import Cards from './components/Card/CardLayout';
import { useState } from 'react';

function App() {
  let [final,setFinal] = useState({
    name:'Jane Appleseed',
    number:'0000 0000 0000 0000',
    mon:'00',
    yy:'00',
    cvv:'000'
  })
  let handleChange = (props)=>{
    setFinal({
      name:props.cardName,
      number:props.cardNumber,
      mon:props.cardMon,
      yy:props.cardYear,
      cvv:props.cardCvv
    })
  }
  return (
    <div className="App">
      <Cards
      cardNumber={final.number}
      owner={final.name}
      expMon={final.mon}
      expYY={final.yy}
      cardCVV={final.cvv}
      />
      <Form cardDynamic={handleChange}/>
    </div>
  );
}

export default App;
