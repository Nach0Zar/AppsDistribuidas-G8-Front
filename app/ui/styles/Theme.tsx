import React from "react";

interface ColorTheme{
    primary: string,
    second: string,
    primaryBackground: string,
    secondBackground: string,
    font : string
}

export const COLOR : ColorTheme = {
    primary: '#76ABAE', //cyan
    second: '#EEEEEE', //white
    primaryBackground: '#31363F', //greyblack
    secondBackground: '#222831', //black
    font: '',
}

const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    primary: "#007260",
    secondary: "#39B68D",
    grey: "#CCCCCC"
}

export default COLORS;