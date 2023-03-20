import { styles } from "./styles";

const Equalizer = () => {
    const classes = styles();

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <div className={classes.line1}></div>
                <div className={classes.line2}></div>
                <div className={classes.line3}></div>
                <div className={classes.line4}></div>

            </div>
        </div>
    );
};

export default Equalizer;
