// Background.js
import React from 'react';
import Svg, { G, Path, Defs, Filter, FeFlood, FeBlend, FeGaussianBlur, ClipPath, Rect } from 'react-native-svg';

const Background = () => {
  return (
    <Svg width="312" height="339" viewBox="0 0 312 339">
      <Defs>
        <Filter id="filter0_f_3981_936" x="-313" y="-297" width="865.072" height="934.5" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_3981_936" />
        </Filter>
        <Filter id="filter1_f_3981_936" x="-4.12354" y="69.1309" width="485.718" height="518.369" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_3981_936" />
        </Filter>
        <Filter id="filter2_f_3981_936" x="-313" y="-130.7" width="551.88" height="595.72" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_3981_936" />
        </Filter>
        <Filter id="filter3_f_3981_936" x="29.3848" y="-247" width="472.688" height="544.038" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_3981_936" />
        </Filter>
        <ClipPath id="clip0_3981_936">
          <Rect width="312" height="339" rx="20" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_3981_936)">
        <G filter="url(#filter0_f_3981_936)">
          <G filter="url(#filter1_f_3981_936)">
            <Path
              d="M238.736 537.5C345.249 537.5 431.595 443.845 431.595 328.315C431.595 212.786 345.249 119.131 238.736 119.131C132.222 119.131 45.8765 212.786 45.8765 328.315C45.8765 443.845 132.222 537.5 238.736 537.5Z"
              fill="white"
            />
          </G>
          <G filter="url(#filter2_f_3981_936)">
            <Path
              d="M-37.0601 365.02C60.1088 365.02 138.88 276.435 138.88 167.16C138.88 57.8847 60.1088 -30.7002 -37.0601 -30.7002C-134.229 -30.7002 -213 57.8847 -213 167.16C-213 276.435 -134.229 365.02 -37.0601 365.02Z"
              fill="#F7C619"
            />
          </G>
          <G filter="url(#filter3_f_3981_936)">
            <Path
              d="M276.132 247.039C373.301 247.039 452.072 158.454 452.072 49.1786C452.072 -60.0965 352.494 -197 255.325 -197C158.156 -197 79.3848 -108.415 79.3848 0.859924C79.3848 110.135 178.963 247.039 276.132 247.039Z"
              fill="#4280EF"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Background;
