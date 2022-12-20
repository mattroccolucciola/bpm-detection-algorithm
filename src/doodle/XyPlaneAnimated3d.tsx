import "css-doodle";
// style
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";

const XyPlaneAnimated3d: React.FC<SProps> = ({ ...p }) => {
  return (
    <Doodle
      {...p}
      sx={{
        top: 0,
        position: "absolute",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        zIndex: 0,
        "& > css-doodle": {
          top: 0,
          position: "absolute",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
        },
      }}
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
      `}
    </Doodle>
  );
};

export default XyPlaneAnimated3d;
