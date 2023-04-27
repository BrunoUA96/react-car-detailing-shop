import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
   <ContentLoader
      speed={5}
      width={260}
      height={480}
      viewBox="0 0 260 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="350" rx="10" ry="10" width="260" height="63" />
      <rect x="0" y="280" rx="10" ry="10" width="260" height="50" />
      <rect x="120" y="432" rx="22" ry="22" width="140" height="45" />
      <rect x="0" y="438" rx="10" ry="10" width="110" height="35" />
      <rect x="9" y="0" rx="10" ry="10" width="240" height="260" />
   </ContentLoader>
);

export default Skeleton;
