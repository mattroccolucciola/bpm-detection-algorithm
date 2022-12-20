// react
import { useEffect, useRef } from "react";
// state
import { AppStore, useAppContext } from "../mobxApp";
import { observer } from "mobx-react-lite";
// style
import "css-doodle";
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";

/** Displays a 3d grid
 */
const XyPlaneAnimated3d: React.FC<SProps> = ({ ...p }) => {
  // state
  const animateState = useAppContext((s) => s.animateState);
  // see if we can restart the animation
  // const setAnimateState: AppStore["setAnimateState"] = useAppContext(
  //   (s) => s.setAnimateState
  // );
  const doodleRef = useRef<HTMLDivElement>(null);

  const fwdAnimation = "success";
  const revAnimation = "pending";
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
        gridCell.style.animationName = animateState;
        gridCell.onanimationend = () => {
          // setAnimateState(revAnimation);
          // gridCellElems[gridCellElems.length - 1].style.animationName =
          //   revAnimation;
        };
      });
    }
  }, [animateState]);

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
        transform: rotate(calc(150deg * @row * @col / @size));

        --startState: calc(150deg * ((@row * @col) / @size));
        --${fwdAnimation}delay: calc(( ( @row/@size-row ) * ( @col/@size-col )) * 1s);
        --${revAnimation}delay: calc(( ( @row/@size-row ) * ( @col/@size-col )) * 2s + 0.5s);
        
        animation-delay:           var(--${fwdAnimation}delay), var(--${revAnimation}delay);
        animation-duration:        .6s, 10s;
        animation-direction:       normal, normal;
        animation-iteration-count: 1, 1;
        animation-timing-function: ease-in-out, ease-out;
        animation-fill-mode:       forwards, none;

        @keyframes ${fwdAnimation} {
          100%{
            transform: rotate(calc(150deg + var(--startState)));
          }
        }
        @keyframes ${revAnimation} {
          0% { transform: rotate(calc(150deg + var(--startState))); }
          100% { transform: rotate(calc(-180deg + (150deg + var(--startState)))); }
        }
      `}
    </Doodle>
  );
};

export default observer(XyPlaneAnimated3d);
