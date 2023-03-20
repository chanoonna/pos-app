/* ---------------------------------- types --------------------------------- */
import type { UiSize, ColorTheme } from 'style/types';
import type { Labels } from 'AppModule/AppStarting/constants';

/* --------------------------------- imports -------------------------------- */

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FlexContainer } from 'components/container';
import { SizeAppliedText } from 'components/typography';

export const SizeAndColorOptions = ({
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
    <FlexContainer
      height="12rem"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <FlexContainer alignItems="flex-start" width="fit-content">
        <FormControl>
          <FlexContainer height="2.5rem">
            <FormLabel id="ui-size-radio-buttons-group-label">
              <SizeAppliedText textTypeVariant="menuTitle" uiSize={uiSize}>
                {labels.uiSize}
              </SizeAppliedText>
            </FormLabel>
          </FlexContainer>
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
              label={
                <SizeAppliedText textTypeVariant="menu" uiSize={uiSize}>
                  {labels.uiSizeMedium}
                </SizeAppliedText>
              }
            />
            <FormControlLabel
              value="large"
              control={<Radio />}
              label={
                <SizeAppliedText textTypeVariant="menu" uiSize={uiSize}>
                  {labels.uiSizeLarge}
                </SizeAppliedText>
              }
            />
            <FormControlLabel
              value="extraLarge"
              control={<Radio />}
              label={
                <SizeAppliedText textTypeVariant="menu" uiSize={uiSize}>
                  {labels.uiSizeExtraLarge}
                </SizeAppliedText>
              }
            />
          </RadioGroup>
        </FormControl>
      </FlexContainer>
      <FlexContainer alignItems="flex-start" width="fit-content">
        <FormControl>
          <FlexContainer height="2.5rem">
            <FormLabel id="theme-radio-buttons-group-label">
              <SizeAppliedText textTypeVariant="menuTitle" uiSize={uiSize}>
                {labels.colorTheme}
              </SizeAppliedText>
            </FormLabel>
          </FlexContainer>
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
              label={
                <SizeAppliedText textTypeVariant="menu" uiSize={uiSize}>
                  {labels.colorThemeDefault}
                </SizeAppliedText>
              }
            />
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label={
                <SizeAppliedText textTypeVariant="menu" uiSize={uiSize}>
                  {labels.colorThemeDark}
                </SizeAppliedText>
              }
            />
          </RadioGroup>
        </FormControl>
      </FlexContainer>
    </FlexContainer>
  );
};
