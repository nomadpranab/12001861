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
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )
  
}


function ProductTable({products})
{
    const rows=[];
    let lastcategory=null;
    products.forEach((product)=>{
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

    
}