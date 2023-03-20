import { createUseStyles } from "react-jss";

export const styles = createUseStyles({
    container: {
        display: "flex",
        justifyContent: "center",

        width: 25,

    },
    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: 30,
        height: 30
    },
    "@keyframes go-up-down": {
        "0%": { height: 0 },
        "100%": { height: 20 }
    },
    line1: {
        position: "relative",
        width: 2,
        height: 1,
        backgroundColor: "#fff",
        animation: `$go-up-down 0.7s infinite alternate`
    },
    line2: {
        position: "relative",
        width: 2,
        height: 1,
        backgroundColor: "#fff",
        animation: `$go-up-down 0.6s infinite alternate`
    },
    line3: {
        position: "relative",
        width: 2,
        height: 1,
        backgroundColor: "#fff",
        animation: `$go-up-down 0.9s infinite alternate`
    },
    line4: {
        position: "relative",
        width: 2,
        height: 1,
        backgroundColor: "#fff",
        animation: `$go-up-down 0.3s infinite alternate`
    },
    line5: {
        position: "relative",
        width: 2,
        height: 1,
        backgroundColor: "#fff",
        animation: `$go-up-down 0.4s infinite alternate`
    }
});
