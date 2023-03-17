/* ---------------------------------- types --------------------------------- */
import type { UiSize, ColorTheme } from 'style/types';
import type { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { PageContainer, FlexContainer } from 'components/container';
import { SizeAppliedText } from 'components/typography';

export const SystemSettings = ({
  labels,
  uiSize,
  colorTheme,
  setUiSize,
  setColorTheme
}: {
  labels: Labels;
  uiSize: UiSize;
  colorTheme: ColorTheme;
  setUiSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setColorTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <PageContainer marginTop="-5rem" flexDirection="column">
      <FlexContainer height="4rem">
        <SizeAppliedText variant="heading" uiSize={uiSize}>
          {labels.systemSettings}
        </SizeAppliedText>
      </FlexContainer>
      <FlexContainer
        height="fit-content"
        alignItems="flex-start"
        justifyContent="space-evenly"
      >
        <FormControl>
          <FormLabel id="ui-size-radio-buttons-group-label">
            {labels.uiSize}
          </FormLabel>
          <RadioGroup
            aria-labelledby="ui-size-radio-buttons-group-label"
            defaultValue="large"
            name="radio-buttons-group"
            value={uiSize}
            onChange={setUiSize}
          >
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label={labels.uiSizeMedium}
            />
            <FormControlLabel
              value="large"
              control={<Radio />}
              label={labels.uiSizeLarge}
            />
            <FormControlLabel
              value="extraLarge"
              control={<Radio />}
              label={labels.uiSizeExtraLarge}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="theme-radio-buttons-group-label">
            {labels.colorTheme}
          </FormLabel>
          <RadioGroup
            aria-labelledby="theme-radio-buttons-group-label"
            defaultValue="bright"
            name="radio-buttons-group"
            value={colorTheme}
            onChange={setColorTheme}
          >
            <FormControlLabel
              value="bright"
              control={<Radio />}
              label={labels.colorThemeDefault}
            />
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label={labels.colorThemeDark}
            />
          </RadioGroup>
        </FormControl>
      </FlexContainer>
    </PageContainer>
  );
};
