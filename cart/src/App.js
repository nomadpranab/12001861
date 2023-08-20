import {useState} from 'react';
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function FilteredTable({products})
{
  const [searchtext,setsearchtext]=useState("");
  const [instock,setinstock]=useState(false);
  return(
    <div>
      <SearchBar searchtext={searchtext} instock={instock} onsearchtextChange={setsearchtext} oninstockChange={setinstock}/>
      <ProductTable products={products} searchtext={searchtext} instock={instock}/>
    </div>
  )
}

function ProductTable({products,searchtext,instock})
{
    const rows=[];
    let lastcategory=null;
    products.forEach((product)=>{
      if (
        product.name.toLowerCase().indexOf(
          searchtext.toLowerCase()
        ) === -1
      ) 
      {
        return;
      }

      if (instock && !product.stocked) {
        return;
      }


      if(product.category!==lastcategory)
      {
          rows.push(
          <ProductCategoryRow category={product.category} key={product.category}/>
        );
      }

      rows.push(
      <ProductRow product={product} key={product.name}/>
    )

      lastcategory=product.category;
    });

return(
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
);    
}

function SearchBar({ searchtext, instock ,onsearchtextChange,oninstockChange})
{
  return(
    <form>
      <input type="text" placeholder="search.." value={searchtext} onChange={(e) => onsearchtextChange(e.target.value)}/>
      <label>
        <input type="checkbox" checked={instock} onChange={(e) => oninstockChange(e.target.checked)}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({product})
{
  const name=product.stocked?product.name : <span style={{color:"red"}}>{product.name}</span>;
  return(
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
  
}



export default function App(){
  return <FilteredTable products={PRODUCTS}/>
}