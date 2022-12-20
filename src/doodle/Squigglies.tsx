import "css-doodle";
// style
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";

const Squigglies: React.FC<SProps> = ({ ...p }) => {
  return (
    <>
      <Doodle
        sx={{
          top: 0,
          position: "absolute",
          height: "100%",
          maxHeight: "100%",
          minHeight: "100%",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          "& > css-doodle": {
            top: 0,
            position: "absolute",
            width: "100%",
            maxWidth: "100%",
            minWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            minHeight: "100%",
          },
        }}
        {...p}
      >
        {`
        :doodle {
          @grid: 32x1 / 10vmin 90vmin;
          overflow: hidden;
          filter: url(#chalk_2);
          top: 0;
        }
        transform: translate(@r(-10%, 10%), @r(-10%, 10%)) rotate(@r(-100, 100)deg);
        width: @r(400, 1000)%;
        height: @r(500, 1000)%;
        border-left: @r(10)px solid @p(rgba(250, 95, 120, @r(.05, 0.1)), rgba(212, 150, 53, @r(.05, 0.1)));
        border-bottom: @r(10)px solid @p(rgba(250, 95, 120, @r(.05, 0.1)), rgba(212, 150, 53, @r(.05, 0.1)));
        border-radius: @r(100, 1000)%;
        background-image: @svg(
          <svg
            width="0"
            height="0"
            style={{ position: "absolute" }}
            viewBox="-10 -30 200 200"
          >
            <filter
              id="chalk_2"
              height="2"
              width="1.6"
              color-interpolation-filters="sRGB"
              y="-0.5"
              x="-0.3"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                baseFrequency="0.9"
                seed="115"
                result="result1"
                numOctaves="2"
                type="turbulence"
              />
              <feDisplacementMap
                scale="1"
                yChannelSelector="G"
                in2="result1"
                xChannelSelector="R"
                in="SourceGraphic"
              />
            </filter>
          </svg>

        );
      `}
      </Doodle>
    </>
  );
};

export default Squigglies;
