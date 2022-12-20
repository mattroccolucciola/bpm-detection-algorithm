import "css-doodle";
// style
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";
import { useEffect, useRef } from "react";
import { useAppContext } from "../mobxApp";
import { observer } from "mobx-react-lite";

const XyPlaneAnimated3d: React.FC<SProps> = ({ ...p }) => {
  const isAnimate = useAppContext((s) => s.isAnimate);
  const doodleRef = useRef<HTMLDivElement>(null);

  // WARNING: this is VERY hacky and I need to choose a new library if I want easy access to properties / dont want to deal with shadow dom
  useEffect(() => {
    const shadowRoot = document.querySelector(
      ".rotating-nav css-doodle"
    )?.shadowRoot;
    const gridCellElems = shadowRoot?.querySelectorAll("grid cell") as
      | HTMLElement[]
      | undefined;
    if (gridCellElems) {
      gridCellElems.forEach((gridCell: HTMLElement) => {
        gridCell.style.animationName = isAnimate && "scale";
      });
    }
  }, [isAnimate, doodleRef.current]);

  return (
    <Doodle
      top={0}
      className="rotating-nav"
      position="absolute"
      width="100%"
      maxWidth="100%"
      minWidth="100%"
      zIndex={0}
      doodleRef={doodleRef}
      sx={{
        "& > css-doodle": {
          top: 0,
          position: "absolute",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
        },
      }}
      {...p}
    >
      {`
        @grid: 128x3;
        :container{
          width: 100%;
          height: 50px;
          top: 0px;
        }
        :doodle {
          width: 100%;
          height: 50px;
          position: absolute;
          left: 0px;
          top: 0px;
        }
        --sat: calc(0.15 + 0.2 * @row * @col / @size);
        background: hsla(225, 50%, 75%, var(--sat));
        border-radius: 0%;
        height: 20px;
        width:  25px;
        border: 0.1px solid slateblue;
        transform: rotate(calc(50deg * @row * @col / @size));

        --scaledelay: calc(( ( @row/@size-row ) * ( @col/@size-col )) * 1s);
          
        
        animation-delay: var(--scaledelay);
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        

        @keyframes scale {
          0%{
            transform: rotate(calc(50deg * @row * @col / @size));
          }
          100%{
            transform: rotate(calc(90deg + 50deg * @row * @col / @size));
          }
        }
      `}
    </Doodle>
  );
};

export default observer(XyPlaneAnimated3d);
