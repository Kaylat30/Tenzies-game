/* eslint-disable react/prop-types */
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    const renderDiceDots = () => {
        const dots = [];
    
        for (let i = 0; i < props.value; i++) {
          dots.push(<div key={i} className="die-num">.</div>);
        }
    
        return dots;
      };
    return (
        <div className="die-face" onClick={props.hold} style={styles}>
            {/* <h2 className="die-num">{props.value}</h2> */}
            {renderDiceDots()}
        </div>
    )
}