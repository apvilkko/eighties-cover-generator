import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

const getViewWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const getViewHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const FONTS = [
  { family: '"Archivo Black", sans-serif' },
  { family: '"Questrial", sans-serif' },
  { family: '"Volkhov", serif' }
];

const COLORS = {
  pink1: "#DA5597",
  gray1: "#261B24",
  green1: "#3DB688",
  gold1: "#CD954E"
};

const Cover = ({ data }) => {
  const canvasRef = useRef(null);
  const [dim, setDim] = useState(Math.min(getViewWidth(), getViewHeight()));
  const [specs, setSpecs] = useState({
    bg: 1
  });
  const [texts, setTexts] = useState({
    artist: {
      family: 2,
      size: 9,
      x: 2,
      y: 1,
      uppercase: true,
      color: "green1",
      stroke: "gold1"
    },
    title: {
      family: 0,
      size: 3,
      x: "center",
      y: 15,
      uppercase: true,
      color: "pink1",
      shadow: "gray1",
      letterSpacing: 2.5
    }
  });
  const [styles, setStyles] = useState({});

  useLayoutEffect(() => {
    const updateSize = () => {
      setDim(Math.min(getViewWidth(), getViewHeight()));
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const obj = {};
    const scale = dim / 100;
    Object.keys(data).forEach(field => {
      const spec = texts[field];
      const shadowSize = spec.size * scale * 0.1;
      const shadowColor = COLORS[spec.shadow] || "black";
      const style = {
        position: "absolute",
        top: `${scale * spec.y}px`,
        left: spec.x === "center" ? "20%" : `${scale * spec.x}px`,
        fontFamily: FONTS[spec.family].family,
        fontSize: `${spec.size * scale}px`,
        color: COLORS[spec.color] || "#777",
        textTransform: spec.uppercase ? "uppercase" : "",
        textShadow: spec.shadow
          ? `-${shadowSize}px ${shadowSize}px 1px ${shadowColor}`
          : "none",
        letterSpacing: `${spec.letterSpacing * scale}px`,
        WebkitTextStroke: spec.stroke
          ? `${spec.size / (scale * 0.4)}px ${COLORS[spec.stroke]}`
          : "initial"
      };
      obj[field] = style;
    });
    setStyles(obj);
  }, [dim, data, texts]);

  const bgImageSrc = `images/bg${specs.bg}.jpg`;

  return (
    <div
      className="canvas"
      ref={canvasRef}
      style={{
        width: dim,
        height: dim
      }}
    >
      <div
        className="background"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: dim,
          width: dim,
          zIndex: 1,
          backgroundImage: `url(${bgImageSrc})`,
          filter: "blur(1px) contrast(70%) brightness(70%)"
        }}
      />
      <div
        className="content"
        style={{
          position: "absolute",
          height: dim,
          width: dim,
          left: 0,
          right: 0,
          zIndex: 2
        }}
      >
        <div style={styles.artist}>{data.artist}</div>
        <div style={styles.title}>{data.title}</div>
      </div>
    </div>
  );
};

export default Cover;
