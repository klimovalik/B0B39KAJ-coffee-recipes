import React from 'react';
import './App.css';

import Menu from './menu/Menu';
import CupWindow from './cup/Cup';
import Recipe from './recipe/Recipe';

import data from './coffeeTypes.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeTypes: JSON.parse(localStorage.getItem("coffeeTypes")) || data,
      chosenCoffeeType: JSON.parse(localStorage.getItem("chosenCoffeeType")) || "Cappuccino"
    };

    this.handleFavoritesChange = this.handleFavoritesChange.bind(this);
    this.handleChosenCoffeeTypeChange = this.handleChosenCoffeeTypeChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', e => {
      const hrefParam = new URL(window.location.href).searchParams.get('coffee');
      const currentCoffeeType = hrefParam ? hrefParam : "Cappuccino"

      this.handleChosenCoffeeTypeChange(currentCoffeeType);
    });
  }

  handleFavoritesChange(name) {
    let coffeeTypes = this.state.coffeeTypes.slice();
    coffeeTypes = coffeeTypes.map(coffee => coffee.name === name ? {...coffee, liked: !coffee.liked} : coffee);
    console.log(coffeeTypes)
    this.setState({
      coffeeTypes: coffeeTypes
    });
    localStorage.setItem("coffeeTypes", JSON.stringify(coffeeTypes));
  }

  handleChosenCoffeeTypeChange(chosenCoffeeType) {
    console.log(chosenCoffeeType)
    this.setState({
      chosenCoffeeType: chosenCoffeeType
    });
    localStorage.setItem("chosenCoffeeType", JSON.stringify(chosenCoffeeType));
  }

  render() {
    document.title = this.state.chosenCoffeeType + " Recipe";
    const chosenCoffeeType = this.state.coffeeTypes
        .find((coffeeType) => coffeeType.name === this.state.chosenCoffeeType);

    return (
      <div className="App">
        <Menu
            coffeeTypes={this.state.coffeeTypes}
            onFavoritesChange={this.handleFavoritesChange}
            onChosenCoffeeTypeChange={this.handleChosenCoffeeTypeChange}
        />
        <CupWindow
            cupFor={chosenCoffeeType}
        />
        <Recipe
            recipeFor={chosenCoffeeType}
        />
      </div>
    );
  }
}

export default App;
