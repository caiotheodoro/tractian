interface ComponentProps {
  children: React.ReactNode;
}

interface DynamicProps {
  children: React.ReactNode;
  params: {
    company: string;
  };
}


interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}