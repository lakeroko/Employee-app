import "./app-filter.css"

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'increase', label: 'На повышение'},
        {name: 'more1000', label: 'З/П больше 1000$'}
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name; // если  filter из пропсов совпадает с name
        const clazz = active ? 'btn-light' : 'btn-outline-light'; // то этот класс должен быть активным, и на эту кнопку навешивается класс 'btn-light'  
        
        return (
            <button type="button"
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onFilterSelect(name)}>
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}


export default AppFilter;