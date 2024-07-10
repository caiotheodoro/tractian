import AlertIcon from "@/components/atoms/icon/alert";
import AssetIcon from "@/components/atoms/icon/asset";
import ComponentIcon from "@/components/atoms/icon/component";
import LocationIcon from "@/components/atoms/icon/location";
import OperatingIcon from "@/components/atoms/icon/operating";
import VibrationIcon from "@/components/atoms/icon/vibration";
import VoltIcon from "@/components/atoms/icon/volt";

export const NodeIcon = {
  asset: AssetIcon,
  component: ComponentIcon,
  location: LocationIcon,
} as unknown as INode;

export const SensorIcon = {
  energy: VoltIcon,
  vibration: VibrationIcon,
} as unknown as INode;

export const SensorStatusIcon = {
  operating: OperatingIcon,
  alert: AlertIcon,
} as unknown as INode;