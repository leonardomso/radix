import React, {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  FC,
} from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';

type SliderProps = {
  name?: string;
  min?: number;
  max?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  variant?: 'normal' | 'fade';
  trackStyle?: any;
  innerTrackStyle?: any;
  thumbStyle?: any;
} & ComponentPropsWithRef<'input'>;

export const Slider: FC<SliderProps> = ({
  name,
  min = 0,
  max = 100,
  value,
  onChange,
  variant,
  trackStyle,
  innerTrackStyle,
  thumbStyle,
  ...props
}) => {
  const isControlled = value !== undefined && onChange !== undefined;
  const [stateValue, setStateValue] = useState<number>(Number(value) || 0);

  const percentage = ((stateValue - min) * 100) / (max - min || 100);

  // keep local state in sync with `value` prop
  useEffect(() => {
    if (isControlled) {
      setStateValue(Number(value));
    }
  }, [value, isControlled]);

  return (
    <Wrapper>
      <Input
        {...props}
        type="range"
        name={name}
        value={String(stateValue)}
        min={min}
        max={max}
        onChange={
          isControlled
            ? onChange
            : (event: ChangeEvent<HTMLInputElement>) => setStateValue(Number(event.target.value))
        }
        variant={variant}
        thumbStyle={thumbStyle}
      />
      <Track trackStyle={trackStyle}>
        <InnerTrack
          style={{ width: `${percentage}%` }}
          variant={variant}
          innerTrackStyle={innerTrackStyle}
        />
      </Track>
    </Wrapper>
  );
};

Slider.defaultProps = {
  step: '1',
  variant: 'normal',
};

const TRACK_HEIGHT = 1;

const Wrapper = styled('div')({
  width: '100%',
  position: 'relative',
  display: 'flex',
});

const trackStyle = {
  backgroundColor: 'transparent',
  height: `${TRACK_HEIGHT}px`,
};

const thumbStyle = {
  appearance: 'none',
  position: 'relative',
  top: '50%',
  border: '1px solid',
  transition: 'transform 100ms ease',
  transform: 'translateY(-50%)',
};

// @ts-ignore
const Input = styled('input')<SliderProps>(props =>
  css({
    appearance: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'block',
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    width: '100%',
    position: 'relative',
    zIndex: 1,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-slider-runnable-track': {
      ...trackStyle,
    },
    '&::-moz-range-track': {
      ...trackStyle,
    },
    '&::-webkit-slider-thumb': {
      ...thumbStyle,
      ...props.thumbStyle,
    },
    '&::-moz-range-thumb': {
      ...thumbStyle,
      ...props.thumbStyle,
    },
  })(props)
);

const Track = styled('div')<SliderProps>(
  css({
    ...trackStyle,
    backgroundColor: 'gray',
    position: 'absolute',
    left: 0,
    top: '50%',
    right: 0,
    zIndex: 0,
    transform: 'translateY(-50%)',
  }),
  props => css(props.trackStyle)(props)
);

const InnerTrack = styled('div')<SliderProps>(
  css({
    ...trackStyle,
    height: '100%',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
  }),
  props => css(props.innerTrackStyle)(props)
);
