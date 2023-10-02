import { Flex, FlexProps } from "../flex";

type VstackProps = Omit<FlexProps, "direction">;

const Vstack = (props: VstackProps) => <Flex {...props} direction="column" />;

export { Vstack };
