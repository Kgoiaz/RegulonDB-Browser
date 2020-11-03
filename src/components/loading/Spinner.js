import React, { Children, useEffect } from "react";
import { SVG } from "@svgdotjs/svg.js";

export default function App({children}) {
  const idCanvas = "amva1290EF";
  useEffect(() => {
    let drawPlace = document.getElementById("loading");
    let canvas = document.getElementById(idCanvas);
    if (drawPlace && canvas === null) {
      const width = drawPlace.clientWidth;
      const height = drawPlace.clientHeight;
      canvas = SVG().addTo(`#loading`).size(width, height).id(idCanvas);
      let azucar = "#f6d07d";
      let a = "#7df6a7";
      let t = "#d67df6";
      let g = "#7d88f6";
      let c = "#f67da2";
      let duration = 2000;
      let size = 35;
      let space = 2;
      const n = width / (size + space)+5;
      for (let i = -2; i < n; i++) {
        let b1 = SelectAmino(a, t, c, g);
        let b2 = Par(b1, a, t, c, g);
        let x = i * (size + space);
        let yi = 0;
        let yf = height - size;
        let ym = yf / 2;
        let delay = i * (size + space);
        let c1 = canvas.circle(size).move(x, yi).fill(azucar);
        let c2 = canvas.circle(size).move(x, yf).fill(azucar);
        let r1 = canvas.rect(size/2, ym).move(x + size / 2 / 2, yi + size / 2,).fill(b1).rx(20).ry(20);
        let r2 = canvas.rect(size/2, ym).move(x + size / 2 / 2, ym + size / 2,).fill(b2).rx(20).ry(20);
        let group = canvas.group()
        group.add(r1)
        group.add(r2)
        group.add(c1)
        group.add(c2)
        group.animate({
            duration: duration,
            delay: delay,
            times: 10000
          }).rotate(360)
      }
      let txt = canvas.text("Loading...");
      txt.font({
        family: "Arial",
        size: 50,
        anchor: "middle",
        leading: "1.5em"
      });
      txt.move(-190, height / 2 - 30);
      txt
        .animate({
          duration: n * 150,
          delay: 0,
          times: 10000
        })
        .move(width, height / 2 - 30);
      CAMINAR(canvas, width);
    }
  });
  return <div id="loading" style={{ height: "200px", width: "100%", position: 'absolute', zIndex:'-1' }} />;
}

function SelectAmino(a, t, c, g) {
  let n = Math.floor(Math.random() * (4 - 1)) + 1;
  switch (n) {
    case 1:
      return a;
    case 2:
      return g;
    case 3:
      return t;
    default:
      return c;
  }
}

function Par(amn, a, t, c, g) {
  switch (amn) {
    case a:
      return t;
    case t:
      return a;
    case c:
      return g;
    default:
      return c;
  }
}

function CAMINAR(canvas, width) {
  let n = Math.floor(Math.random() * (100 - 1)) + 1;
  if (n === 12) {
    let image = canvas.image("https://i.imgur.com/XJQeaix.gif");
    image.move(width, -50);
    image
      .animate({
        duration: n * 300,
        delay: 0,
        times: 1
      })
      .move(-2000, -50);
  }
  return null;
}
