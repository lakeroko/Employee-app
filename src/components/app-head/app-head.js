import "./app-head.css";

const AppInfo = (props) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников N</h1>
            <h2>Общее число сотрудников: {props.count}</h2>
            <h2>Премию получат: {props.increase}</h2>
        </div>
    )
}

export default AppInfo;