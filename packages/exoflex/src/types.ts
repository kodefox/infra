import { ActivityIndicatorProps } from './components/ActivityIndicator';
import { ButtonProps } from './components/Button/types';
import { AvatarIconProps } from './components/Avatar/AvatarIcon';
import { AvatarImageProps } from './components/Avatar/AvatarImage';
import { AvatarTextProps } from './components/Avatar/AvatarText';
import { BadgeProps } from './components/Badge';
import { CalendarProps } from './components/Calendar/Calendar';
import { CheckboxProps } from './components/Checkbox';
import { ChipProps } from './components/Chip';
import { CollapsibleProps } from './components/Collapsible';
import { DateTimePickerProps } from './components/DateTimePicker/types';
import { DividerProps } from './components/Divider';
import { DrawerItemProps } from './components/Drawer/DrawerItem';
import { IconButtonProps } from './components/IconButton';
import { MenuProps, MenuItemProps } from './components/Menu';
import { ProgressBarProps } from './components/ProgressBar';
import { RadioButtonProps } from './components/RadioButton';
import { RichRadioGroupProps } from './components/RichRadio/RichRadioGroup';
import { RichRadioItemProps } from './components/RichRadio/RichRadioItem';
import { SegmentedControlProps } from './components/SegmentedControl/SegmentedControl';
import { SliderProps } from './components/Slider';
import { SwithcProps } from './components/Switch';
import { TextProps } from './components/Text';
import { TextInputProps } from './components/TextInput/types';
import { TimePickerProps } from './components/TimePicker/types';
import { ToastProps } from './components/Toast';
import { AccordionProps, Title } from './components/Accordion';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export type Theme = {
  fonts: Fonts;
  colors: Colors;
  dark: boolean;
  roundness: number;
  animation: {
    scale: number;
  };
  uppercase: {
    button: boolean;
    textinput: boolean;
  };
  style?: {
    accordion: Pick<
      AccordionProps<Title>,
      | 'containerStyle'
      | 'iconStyle'
      | 'sectionContainerStyle'
      | 'titleContainerStyle'
      | 'titleStyle'
    >;
    activityIndicator: Pick<ActivityIndicatorProps, 'style'>;
    avatarIcon: Pick<AvatarIconProps, 'style'>;
    avatarImage: Pick<AvatarImageProps, 'style'>;
    avatarText: Pick<AvatarTextProps, 'style' | 'labelStyle'>;
    badge: Pick<BadgeProps, 'style'>;
    button: Pick<ButtonProps, 'contentStyle' | 'labelStyle' | 'style'>;
    calendar: Pick<CalendarProps, 'style'>;
    checkbox: Pick<CheckboxProps, 'style' | 'textStyle'>;
    chip: Pick<ChipProps, 'style' | 'iconStyle' | 'textStyle'>;
    collapsible: Pick<
      CollapsibleProps,
      | 'contentContainerStyle'
      | 'iconStyle'
      | 'style'
      | 'titleContainerStyle'
      | 'titleStyle'
    >;
    dateTimePicker: Pick<
      DateTimePickerProps,
      | 'cancelButtonContainerStyleIOS'
      | 'contentContainerStyleIOS'
      | 'datePickerContainerStyleIOS'
      | 'titleStyle'
    >;
    divider: Pick<DividerProps, 'style'>;
    drawerItem: Pick<DrawerItemProps, 'labelStyle' | 'style'>;
    iconButton: Pick<IconButtonProps, 'style'>;
    menu: Pick<MenuProps, 'style' | 'contentStyle'>;
    menuItem: Pick<MenuItemProps, 'style'>;
    progressBar: Pick<ProgressBarProps, 'style'>;
    radioButton: Pick<RadioButtonProps, 'style' | 'textStyle'>;
    richRadioGroup: Pick<
      RichRadioGroupProps<{}>,
      'style' | 'contentContainerStyle'
    >;
    richRadioItem: Pick<RichRadioItemProps, 'style' | 'textStyle'>;
    segmentedControl: Pick<
      SegmentedControlProps,
      | 'activeTextStyle'
      | 'indicatorStyle'
      | 'segmentStyle'
      | 'style'
      | 'textStyle'
    >;
    slider: Pick<
      SliderProps,
      | 'containerStyle'
      | 'markerStyle'
      | 'markerContainerStyle'
      | 'pressedMarkerStyle'
      | 'selectedStyle'
      | 'trackStyle'
      | 'unselectedStyle'
    >;
    switch: Pick<SwithcProps, 'thumbStyle' | 'trackStyle'>;
    text: Pick<TextProps, 'style'>;
    textInput: Pick<
      TextInputProps,
      'containerStyle' | 'errorMessageStyle' | 'labelStyle' | 'style'
    >;
    timePicker: Pick<TimePickerProps, 'style'>;
    toast: Pick<ToastProps, 'style' | 'textStyle'>;
  };
};

export type ThemeShape = DeepPartial<Theme>;

export type FullFontWeight =
  | '100'
  | '200'
  | '300' // light
  | '400' // normal
  | '500' // medium
  | '600'
  | '700' // bold
  | '800'
  | '900'
  | 'normal'
  | 'bold';

export type FontWeight =
  | '300' // light
  | '400' // normal
  | '500' // medium
  | '700' // bold
  | 'light'
  | 'normal'
  | 'medium'
  | 'bold';

export type FontStyle = 'normal' | 'italic';

export type Font = {
  name: string;
  weight: FullFontWeight;
  style?: FontStyle;
  size?: number;
  source?: FontSource;
};

// TODO: Add support for all font weights in theme.
export type FontPreset = {
  light: Font;
  normal: Font;
  medium: Font;
  bold: Font;
};

export type Fonts = { [fontPresetName: string]: FontPreset };

export type Colors = {
  primary: string;
  background: string;
  surface: string;
  accent: string;
  error: string;
  text: string;
  disabled: string;
  border: string;
  placeholder: string;
  backdrop: string;
  onSurface: string;
  onBackground: string;
  notification: string;
};

export type FontSource = string | number;
