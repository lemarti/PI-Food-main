import React from "react";
export default function Pagination({
    recipesPerPage,allRecipes,pagination
}){
const pageNumbers=[] 
for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav>
      <span className="pagination">
        {pageNumbers &&
          pageNumbers.map(number => (
            <a className="number" key={number}>
              <p onClick={() => pagination(number)}>{number}</p>
            </a>
          ))}
      </span>
    </nav>
  )  
}