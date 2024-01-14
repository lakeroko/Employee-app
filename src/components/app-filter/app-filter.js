import "./app-filter.css"

const AppFilter = (props) => {
    const {onDefault, onUpp, onSalaryOneThousand} = props
    return (
        <div className="btn-group">
            <button 
                className="btn btn-light"
                type="button"
                onClick={onDefault}
                >
                Все сотрудники
            </button>

            <button type="button"
                className="btn btn-outline-light"
                onClick={onUpp}
                >
                На повышение
            </button>
            <button type="button"
                className="btn btn-outline-light"
                onClick={onSalaryOneThousand}
                >
                З/П больше 1000$
            </button>
        </div>
    )
}

export default AppFilter;