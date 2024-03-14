import styles from './feature.css'
import coding from './cartooncoding_2_60x56.png'
import guitar from './cartoonguitar_60x60.png'
import swim from './cartoonswimmer_1_60x60.png'

function Feature(props){
    var logo
    var left = "6.5%"
    logo = coding
    if (props.name==="Swimming") {
        left = "37.5%"
        logo = swim
    } else if (props.name==="Guitar") {
        left = "68.5%";
        logo = guitar
    }

    return (
      <section className="main" style={{ left }}> {/* Apply margin-left dynamically */}
        <p>{props.name}</p>
        <img src={logo}></img>
      </section>
    );
}

export default Feature;