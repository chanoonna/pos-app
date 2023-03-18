/* ---------------------------------- types --------------------------------- */
import type { UiSize } from 'style/types';
import type { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { SizeAppliedText } from 'components/typography';
import { FlexContainer } from 'components/container';

/* ------------------------------------ - ----------------------------------- */

export const BeforeStarting = ({
  labels,
  uiSize
}: {
  labels: Labels;
  uiSize: UiSize;
}) => {
  return (
    <FlexContainer marginTop="-5rem" rowGap={3} flexDirection="column">
      <SizeAppliedText textTypeVariant="heading" uiSize={uiSize}>
        {labels.beforeStarting}
      </SizeAppliedText>
      <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
        {labels.beforeStartingText1}
      </SizeAppliedText>
      <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
        {labels.beforeStartingText2}
      </SizeAppliedText>
      <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
        {labels.beforeStartingText3}
      </SizeAppliedText>
      <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
        {labels.beforeStartingText4}
      </SizeAppliedText>
      <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
        {labels.beforeStartingText5}
      </SizeAppliedText>
    </FlexContainer>
  );
};
