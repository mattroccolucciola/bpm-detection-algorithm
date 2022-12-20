// react
import "css-doodle";
// style
import { SProps } from "../mui/interfaces";
// components
import Doodle from ".";

const Sunset: React.FC<SProps> = ({ ...p }) => {
  return (
    <Doodle {...p}>
      {`
        :doodle {
          @grid: 17x1 / 100% 100%; 
          overflow: hidden;
          border: 0.2vmin solid #000;
          background: @var(--sky);
          transition: @r(0.3, 0.7)s ease all;
        }
        transition: @r(0.3, 0.7)s ease all;
        @nth(1) {
          position: absolute;
          @place-cell: @m2(@r(0, 100)%);
          @size: @r(1.5vmin, 10vmin) @lr;
          ::before, ::after {
            content: "";
            position: absolute;
            @place-cell: 0 0;
            @size: 100% 100%;
            background: @var(--sun);
            border-radius: 100%;
            transition: inherit;
          }
          ::before {
            opacity: 0.25;
            transform: scale(@r(1.01, 1.5));
          }
          ::after {
            border: 1px solid #000;
          }
        }
        @nth(2, 3, 4, 5, 6, 7) {
          position: absolute;
          left: @r(0, 100)%;
          bottom: 0;
          @size:@r(4vmin, 10vmin) @lr;
          background: @var(--mountain);
          border: 1px solid #000;
          transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(-30deg, 30deg), @lr);
        }
        @nth(8, 9, 10, 11, 12, 13, 14, 15, 16, 17) {
          position: absolute;
          left: @r(0, 100)%;
          bottom: 0;
          @size:@r(0.5vmin, 3vmin) @lr;
          background: @var(--tree);
          border: 1px solid #000;
          transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(30, 40deg), @lr);
        }
      `}
      {/* --rule-a: (:doodle {--sun: #f0943a; --sky: #3d2333; --mountain: #452340; --tree: #e284af;});
  --rule-b: (:doodle {--sun: #de6b70; --sky: #f0e87f; --mountain: #6a73c2; --tree: #9596be;});
  --rule-c: (:doodle {--sun: #f0e87f; --sky: #57b2cf; --mountain: #c79498; --tree: #9596be;});
  --rule-d: (:doodle {--sun: #f0933b; --sky: #de6b6f; --mountain: #85616e; --tree: #b14b34;});
  --rule-e: (:doodle {--sun: #f0e87f; --sky: #0e1116; --mountain: #c89598; --tree: #e284af;});
  --rule-f: (:doodle {--sun: #f0f0f0; --sky: #eacdb1; --mountain: #f5aeb2; --tree: #b04b35;});
  --rule-g: (:doodle {--sun: #f0f0f0; --sky: #57b2cf; --mountain: #85616e; --tree: #452340;});
  --rule-h: (:doodle {--sun: #f0f0f0; --sky: #de6b6f; --mountain: #f5aeb2; --tree: #e284ae;});
  --rule-i: (:doodle {--sun: #f0f0f0; --sky: #25272b; --mountain: #452340; --tree: #85616e;}); */}
      {/* {`
@grid: 50x1 / 100%;

@place: center;
@size: calc(75% / @I * @i);

transform: rotate(calc(@i * 5deg));

border-radius: 30%;
border: 1px solid hsla(
  calc(10 + 4 * @i), 70%, 68%, @r.8
);`
          } */}
      {/* {`
    @grid: 1 / 8em 14em;
    background-size: 100%;
    background: #60569e;
    box-shadow: @m5(
      calc(@n * 2px) calc(@n * 2px) 0 0 #e6437d
    );;`} */}
      {/* {`
    @grid: 1 / 8em 14em; background-size: 100%; background: linear-gradient(
      @rand(360deg),
      @m(3, (
        @pick-n(#60569e, #e6437d, #ebbf4d)
          calc(@n(-1) * 100% / 3),
        @lp
          calc(@n * 100% / 3)
      ))
    );`} */}
      {/* {`
    @grid: 1 / 8em 14em; background-size: 100%; background-image: @svg(
    <svg viewBox="0 0 100 175">
      @M10(
      <path
        stroke-width="@r.5"
        stroke="@p(#60569e, #e6437d)"
        d="M0 0 L@r100 @r175"
      />
      )
    </svg>
    );`} */}
    </Doodle>
  );
};

export default Sunset;
