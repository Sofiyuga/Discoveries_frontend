import "./Loader.sass"

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <div className="ring"></div>
            <span>Идет загрузка. Ожидайте...</span>
        </div>
    )
}

export default Loader