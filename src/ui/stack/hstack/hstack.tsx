import {Flex, FlexProps} from '../flex';

type HstackProps = Omit<FlexProps, 'direction'>;

const Hstack = (props: HstackProps) => (
  <Flex
    {...props}
    direction="row"
  />
);

export {Hstack};
