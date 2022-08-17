import './App.css';
import Select from 'react-select';
import  { useState, useEffect } from 'react';

function Products(props){
  const [products, setProducts] = useState();
  useEffect(() => {
    getProductsByCharacteristic(props.characteristic ? props.characteristic : '')
      .then((data) => {setProducts(data)});
  });
  if (!props.characteristic) return;
  if (!products) {
    return <div>No data found</div>;
  }
  else return (
    <div className="products">
      <h3>Products:</h3>
      <ul>
        {products.map((el)=><li>{el.name}</li>)}
      </ul>
    </div>
  )
}
function App() {
  let options = [];
  const [option, setOption] = useState('');
  getCharacteristcs().then((characteristics)=>{
      for (let i in characteristics){
        options.push({value: characteristics[i], label: characteristics[i]});
      }
  });
  
  return (
    <div className="App">
      <h1>Get products by a characteristic</h1>
      <Select 
        className="select" 
        options={options} 
        onChange={(selectedOption)=>{setOption(selectedOption.value)}}
      />
      <Products characteristic={option}></Products>
    </div>
  );
}

async function getProducts(){
  const response = await fetch('http://localhost:8000/products');
  const data = await response.json();
  return data;
}

async function getCharacteristcs(){
  const products = await getProducts();
  let characteristics = []
  for (let i in products) {
      characteristics = characteristics.concat(products[i].characteristics);
  }
  return characteristics.filter((item,
    index) => characteristics.indexOf(item) === index);
}

async function getProductsByCharacteristic(characteristic){
  const response = await fetch(`http://localhost:8000/products?characteristic=${characteristic}`);
  const data = await response.json();
  return data;
}

export default App;
