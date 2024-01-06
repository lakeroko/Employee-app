import "./app.css";

import AppInfo from "../app-head/app-head";
import SearchPanel from "../search-panel/search-panel.js"
import AppFilter from "../app-filter/app-filter.js";
import EmployeesList from "../employears-list/employears-list.js";
import EmployeesAddForm from "../employears-add-form/employees-add-form.js";

import { Component } from "react";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
            {name: "Jonh", salary: 800, increase:true, bonus:true, id: 1},
            {name: "Smith", salary: 1100, increase:false, bonus:false, id: 2},
            {name: "Alex", salary: 2300, increase:false, bonus:false, id: 3},
            {name: "Pidor", salary: 1488, increase: false, bonus:false, id: 4}
        ],
        term: ""
    }
}

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newArr = data.filter((elem, index) => {
                return elem.id != id
            })
            return {data: newArr}
        })
    }

    addNewPerson = (name, salary) => {
        
        this.setState(({data}) => {
            const newArr = []
            Object.assign(newArr, data)
            newArr.push(
                {
                    name: name, 
                    salary: salary, 
                    increase: false, 
                    bonus: false,
                    id: data[data.length-1].id+1
                }
            )
            return {data: newArr}
        })
    }

    onToggle = (id, elem) => {
        this.setState(({data}) => {
            return {data: data.map((item) => {
                if (item.id === id){
                    return {...item, [elem]: !item[elem]}
                }
                return item
            })}
        })
    }

    render(){

        const {data, term} = this.state
        return (
            <div className="app">
                <AppInfo 
                count={this.state.data.length} 
                increase={this.state.data.filter((item) => {
                    return item.increase;
                }).length}
                />

                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>
                <EmployeesList 
                data={this.state.data} 
                onDelete={this.deleteItem}
                onToggle={this.onToggle}
                />
                <EmployeesAddForm data={this.state.data} onAdd={this.addNewPerson}/>
            </div>
        );
    }
}

export default App;