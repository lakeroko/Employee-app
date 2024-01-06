import './employees-add-form.css';
import { Component } from 'react';

class EmployeesAddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            salary: 0
        }
    }

    onValueChange = (e) => {
        this.setState(state => {
            return{[e.target.name]: e.target.value}
        })
    }

    onDeleteValue = () => {
        this.setState((state) => {
            return {name: ""}
        })
    }

    render() {
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name" 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        name="salary"
                        onChange={this.onValueChange}/>

                    <button type="submit"
                            className="btn btn-outline-light"
                            onClick={(e) => {
                                e.preventDefault()
                                this.props.onAdd(this.state.name, this.state.salary)
                            }}>
                                Добавить
                            </button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;