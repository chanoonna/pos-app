/* ---------------------------------- types --------------------------------- */
import type { UiSize, ColorTheme } from 'style/types';
import type { Labels } from './constants';

/* -------------------------------- constants ------------------------------- */
import { UI_SIZE, COLOR_THEME } from 'style/constants';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { PageContainer, FlexContainer } from 'components/container';
import { HeadingLabel } from 'components/typography';

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
    <PageContainer marginTop="-5rem" flexDirection="column" rowGap={3}>
      <HeadingLabel uiSize={uiSize}>{labels.systemSettings}</HeadingLabel>
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
            defaultValue={UI_SIZE.LARGE}
            name="radio-buttons-group"
            value={uiSize}
            onChange={setUiSize}
          >
            <FormControlLabel
              value={UI_SIZE.MEDIUM}
              control={<Radio />}
              label={labels.uiSizeMedium}
            />
            <FormControlLabel
              value={UI_SIZE.LARGE}
              control={<Radio />}
              label={labels.uiSizeLarge}
            />
            <FormControlLabel
              value={UI_SIZE.EXTRA_LARGE}
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
            defaultValue={COLOR_THEME.DEFAULT}
            name="radio-buttons-group"
            value={colorTheme}
            onChange={setColorTheme}
          >
            <FormControlLabel
              value={COLOR_THEME.DEFAULT}
              control={<Radio />}
              label={labels.colorThemeDefault}
            />
            <FormControlLabel
              value={COLOR_THEME.DARK}
              control={<Radio />}
              label={labels.colorThemeDark}
            />
          </RadioGroup>
        </FormControl>
      </FlexContainer>
    </PageContainer>
  );
};
