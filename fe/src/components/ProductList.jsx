import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

const ProductList = (props) => {
  const [products, setProducts] = useState()
  const [loading, setLoading] = useState(false)

  const fetchProductsFromBE = async (characteristic) => {
    let data;
    try {
      let url = baseUrl + '/products'
      const queryParams = formatQueryParams(characteristic)
      url += queryParams
      console.log("GET", url.split("8000")[1])
      const result = await axios.get(url)
      data = result.data
      console.log(data)
      setProducts(data)

    } catch (error) {
      console.log(error)
      alert(error)
    }
    return data;
  }

  const formatQueryParams = (characteristic) => {
    let qpString = '';
    if (characteristic && characteristic !== "All") {
      qpString += '?'
      qpString += 'characteristics=' + characteristic
    }
    return qpString
  }

  useEffect(() => {
    setLoading(true)
    fetchProductsFromBE(props.characteristic)
    setLoading(false)
  }, [props.characteristic])

  if (loading) {
    return <div>
      LOADING
    </div>
  } 
  
  return (
    <div>
      <ul>
        {
          products && products.map((p) => {
            return(
              <div key={p.name}>
                <li>{p.name}</li>
                <ul>
                  {p.characteristics && p.characteristics.map((c) => {
                    return (<li key={c+'-li'}>{c}</li>)
                  })}
                </ul>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ProductList