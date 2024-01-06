import "./app-filter.css"

const AppFilter = () => {
    return (
        <div className="btn-group">
            <button 
                className="btn btn-light"
                type="button">
                Все сотрудники
            </button>

            <button type="button"
                className="btn btn-outline-light">
                На повышение
            </button>
            <button type="button"
                className="btn btn-outline-light">
                З/П больше 1000$
            </button>
        </div>
    )
}

export default AppFilter;