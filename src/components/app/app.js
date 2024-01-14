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
        ],
        Increase: [],
        isIncrease: false,

        SalaryOneThousand: [],
        isSalaryOneThousand: false,

        term: "",
    }
}

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newArr = data.filter((elem, index) => {
                return elem.id !== id
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

    handleSearch = (ArrItems, term) => {
        if (term.length === 0){
            return ArrItems;
        }

        return ArrItems.filter((value) => {
            return value.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (newTerm) => {
        this.setState(state => {
            return {
                term: newTerm
            }
        })
    }

    onUpp = () => {
        const {data} = this.state;

        this.setState({
            isIncrease: true, 
            isSalaryOneThousand: false,
            Increase: data.filter(item => item.increase),
        })
    }

    onSalaryOneThousand = () => {
        const {data} = this.state;

        this.setState({isSalaryOneThousand: true,
            isIncrease: false, 
            SalaryOneThousand: data.filter(item => item.salary >= 1000)})
    }

    onDefault = () => {
        const {isIncrease, isSalaryOneThousand} = this.state;

        if (isIncrease || isSalaryOneThousand){
            this.setState({isIncrease: false, isSalaryOneThousand: false})
        }
    }

    addCurrentData = () => {
        
    }


    render(){
        const {data, term, 
            isIncrease, Increase,
            isSalaryOneThousand, SalaryOneThousand
        } = this.state

        let visibleData;

        if (isIncrease){
            visibleData = this.handleSearch(Increase, term)
        } else if (isSalaryOneThousand){
            visibleData = this.handleSearch(SalaryOneThousand, term)
        } else {
            visibleData = this.handleSearch(data, term)
        }

        return (
            <div className="app">
                <AppInfo 
                count={this.state.data.length} 
                increase={visibleData.filter((item) => {
                    return item.increase;
                }).length}
                />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter onUpp={this.onUpp} 
                    onDefault={this.onDefault}
                    onSalaryOneThousand={this.onSalaryOneThousand}
                    />
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