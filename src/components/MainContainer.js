import React, { useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";


function MainContainer({stocks}) {
const [portfolio, setPortfolio] = useState([])
const [search, setSearch] = useState({sort: null, filter: null})


  function handleBuyClick(id){
    
    const newPortfolioStock = stocks.find((stock) => stock.id === id)
     if (!portfolio.find((stock) =>stock.id === id)){
      setPortfolio([...portfolio, newPortfolioStock])
     }
    }

  function handleSellClick(id){
    const updatePortfolio = [...portfolio].filter((stock) =>stock.id !== id)
    setPortfolio(updatePortfolio)
  }

  
  
  function sortStocks(sortBy){
    const updatedSearch = {...search}
      updatedSearch.sort = sortBy 
      setSearch(updatedSearch)

  }
  console.log(search)
  function filter(filterBy){
    const updatedSearch = {...search}
      updatedSearch.filter = filterBy 
      setSearch(updatedSearch)
  }
   
    function sortedStock(){
      if (!search.sort){
        return(stocks)
      }
    else if (search.sort === "Alphabetically"){
       return([...stocks].sort((stockA, stockB) => stockA.name.localeCompare(stockB.name)))
    }else if(search.sort === "Price"){ 
      return([...stocks].sort((stockA, stockB) => stockA.price - stockB.price))
    }
  }
    
    function filterStocks(){
      
      return(
        sortedStock().filter((stock) => !search.filter ? true : stock.type === search.filter)
        )
    }

  return (
    <div>
      <SearchBar onSortStocks={sortStocks} onFilter={filter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks()} onHandleClick={handleBuyClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio ={portfolio} onHandleClick ={handleSellClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
