import "css-doodle";
// style
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";

const GradientSquares: React.FC<SProps> = ({ ...p }) => {
  return (
    <Doodle {...p}>
      {`
        @grid: 24 / 80vmin; 
        background: hsl(@rn(360), 20%, 20%);
        transition: @r(.5s) ease;
        transform: 
          scale(@rn(.75, 1.75, 2))
          skew(@rn(-30deg, 30deg, 3));
      `}
    </Doodle>
  );
};

export default GradientSquares;
