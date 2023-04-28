import strawberry from './strawberry.png'
import './App.css';
import ProductList from './components/ProductList';
import CharacteristicPicker from './components/CharacteristicPicker';
import { useState } from 'react';


const App = () => {
  const [characteristicChoice, setCharacteristicChoice] = useState("All")

  const handleCharacteristicPick = (e) => {
    let value = e.target.value
    console.log('🍓 someone picked: ', value)
    setCharacteristicChoice(value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={strawberry} className="App-logo" alt="logo" />
        <h1>
          Jesse's Product Haus
        </h1>
        <p>git'n you yer stuff since 1988</p>
      </header>
      <div className='characteristic-picker-container'>
        <CharacteristicPicker 
          handleCharacChoice={handleCharacteristicPick}
          selectedCharac={characteristicChoice}
        />
      </div>
      <hr/>
      <div className='product-list-container'>
        <ProductList characteristic={characteristicChoice}/>
      </div>
    </div>
  );
}

export default App;
