import "css-doodle";
// style
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";

const RadialLines: React.FC<SProps> = ({ ...p }) => {
  return (
    <Doodle {...p}>
      {`
        @grid: 1 / 8em 14em; background-size: 100%; background-image: @svg(
          <svg viewBox="0 0 100 175">
            @M100(
            <path
              stroke-width="@r.5"
              stroke="@p(#60569e, #e6437d)"
              d="M0 0 L@r100 @r175"
            />
            )
          </svg>
        );
      `}
    </Doodle>
  );
};

export default RadialLines;
