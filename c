import {
  FormControl,
  TextArea as NativeTextArea,
  ITextAreaProps,
  IFormControlProps,
  IFormControlLabelProps,
  Stack,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import { Platform } from 'react-native'; // Import Platform module

export type IFormInputProps = Omit<ControllerProps, 'render'> & {
  inputProps?: ITextAreaProps;
  formControlProps?: IFormControlProps;
  formControlLabel?: IFormControlLabelProps;
  label?: string;
  h?: number;
  maxHeight?: number;
  numberOfLines?: number;
  fontSize?: number;
  borderRadius?: number;
  borderColor?: string;
  bg?: string;
};

const TextArea: React.FC<IFormInputProps> = ({
  control,
  h, // chiều cao mặc định từ bên ngoài (nếu có)
  maxHeight = 85, // chiều cao tối đa 4 dòng (khoảng 160 đơn vị)
  name,
  label,
  inputProps,
  formControlProps,
  formControlLabel,
  bg,
  fontSize = 15,
  borderRadius = 12,
  borderColor = '#F2F2F2',
}) => {
  const [height, setHeight] = useState(h || 40);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value = '' }, // Giá trị mặc định là chuỗi rỗng
        fieldState: { error, invalid, isTouched },
        formState: { isSubmitted },
      }) => (
        <FormControl {...formControlProps}>
          <Stack>
            {label && (
              <FormControl.Label {...formControlLabel}>
                {label}
              </FormControl.Label>
            )}
            <NativeTextArea
              onContentSizeChange={(e) => {
                const contentHeight = e.nativeEvent.contentSize.height;
                if (!h) { // Only adjust height if h is not provided from outside
                  if (Platform.OS === 'ios') {
                    if (contentHeight <= maxHeight) {
                      setHeight(contentHeight);
                      setScrollEnabled(false); // Không cần thanh cuộn
                    } else {
                      setHeight(maxHeight);
                      setScrollEnabled(true); // Cần thanh cuộn
                    }
                  } else if (Platform.OS === 'android') {
                    if (contentHeight <= maxHeight) {
                      setHeight(contentHeight + 10); // Add a small buffer for Android
                      setScrollEnabled(false); // Không cần thanh cuộn
                    } else {
                      setHeight(maxHeight);
                      setScrollEnabled(true); // Cần thanh cuộn
                    }
                  }
                }
              }}
              fontSize={fontSize}
              h={height}
              borderRadius={borderRadius}
              borderColor={borderColor}
              maxHeight={maxHeight}
              scrollEnabled={scrollEnabled}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              bg={bg}
              autoCompleteType="off"
              {...inputProps}
            />
            {invalid && (isTouched || isSubmitted) && (
              <Text color={'red.500'} mt={2} fontSize={11}>
                {error?.message}
              </Text>
            )}
          </Stack>
        </FormControl>
      )}
    />
  );
};

export default TextArea;
