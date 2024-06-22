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
            {name: "Jonh", salary: 800, increase:true, bonus:false, id: 1},
            {name: "Smith", salary: 1100, increase:false, bonus:false, id: 2},
            {name: "Alex", salary: 2300, increase:false, bonus:false, id: 3},
        ],
        term: "",
        filter: "all",
    }
}

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newArr = data.filter(elem => {
                return elem.id !== id
            })
            return {data: newArr}
        })
    }

    addNewPerson = (name, salary) => {
        if (name !== "" && salary != ""){
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

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name
            .toLowerCase()
            .indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        // обновляет состояние term
        this.setState({term})
    }

    filterPost = (data, filter) => { 
        // возвращает новый массив
        switch (filter) {
            case 'increase':
                return data.filter(item => item.increase)
            case "more1000":
                return data.filter(item => item.salary >= 1000)
            default:
                return data;
            }
    }

    onFilterSelect = (filter) => {
        // обновляет состояние filter
        this.setState({filter})
    }

    render(){
        const {data, term, filter} = this.state
        const employees = data.length;
        const increase = data.filter(item => item.increase).length;

        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                employees={employees} 
                increase={increase}
                />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter onFilterSelect={this.onFilterSelect} filter={filter}/>
                </div>
                <EmployeesList 
                data={visibleData} 
                onDelete={this.deleteItem}
                onToggle={this.onToggle}
                />
                <EmployeesAddForm data={this.state.data} onAdd={this.addNewPerson}/>
            </div>
        );
    }
}

export default App;