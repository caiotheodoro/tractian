interface ComponentProps {
  children: React.ReactNode;
}


interface PageParams {
  company: string;

  [key: string]: string;
}
interface DynamicProps {
  children: React.ReactNode;
  params: PageParams;
}


interface IconProps {
  width?: number;
  height?: number;
  className?: string;


}

type INodeType = "asset" | "location" | "component";

type ISensorType = "energy" | "vibration";

type ISensorStatus = "operating" | "alert" ;

interface IPromiseCallback<T> {
  (T): Promise<void>;
}
//extends generic js object (like .length)
interface INode extends Record<string, any> {
  id: string;
  name: string;
  type: INodeType;
  children: INode[];

  sensorType?: ISensorType;

  status?: ISensorStatus;
  
  
} 

type INodeProps = Omit<INode, "children">;