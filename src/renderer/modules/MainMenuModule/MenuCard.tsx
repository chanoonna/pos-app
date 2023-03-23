/* ---------------------------------- types --------------------------------- */
import type { UiSize } from 'style/types';
import SvgIcon from '@mui/material/SvgIcon';

/* --------------------------------- imports -------------------------------- */
import { FlexContainer, PaperHoverContainer } from 'components/container';
import { SizeAppliedText } from 'renderer/components/typography';
import { iconSizeBig } from 'style/theme';

export const MenuCard = ({
  Icon,
  label,
  uiSize
}: {
  Icon: typeof SvgIcon;
  label: string;
  uiSize: UiSize;
}) => {
  return (
    <PaperHoverContainer
      justifyContent="center"
      width="15rem"
      height="15rem"
      rowGap={0}
    >
      <FlexContainer height="9rem">
        <Icon sx={{ fontSize: iconSizeBig[uiSize] }} />
      </FlexContainer>
      <SizeAppliedText textTypeVariant="menuTitle" uiSize={uiSize}>
        {label}
      </SizeAppliedText>
    </PaperHoverContainer>
  );
};
