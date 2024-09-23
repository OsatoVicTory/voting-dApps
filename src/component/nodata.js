import './styles.css';

const NoData = ({ text }) => {

    return (
        <div className="noData">
            <div className="noData-img"></div>
            <h3>{text}</h3>
        </div>
    )
};

export default NoData;