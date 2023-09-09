import * as React from 'react';
import Svg, {Path, Text, TSpan} from 'react-native-svg';

const WindDirection = ({
  rotation = 0,
  width = 100,
  height = 100,
}: {
  rotation?: number;
  width?: number;
  height?: number;
}) => (
  <Svg
    style={{
      transform: [{rotate: `${rotation}deg`}],
    }}
    width={width}
    height={height}
    viewBox="0 0 512 512">
    <Path
      fill="#fff"
      stroke="#000"
      strokeWidth={1.9}
      d="M72.001 431.91c1.613-2.38 180.24-362.1 180.24-362.1l179.39 362.27-181.23-144.24s-180.01 146.45-178.4 144.07z"
    />
    <Path d="M250.38 287.85c1.87 1.47 181.25 144.29 181.25 144.29L252.22 69.82c0 .003-3.72 216.55-1.84 218.03z" />
  </Svg>
);
export default WindDirection;
