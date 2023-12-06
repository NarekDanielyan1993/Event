import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';

import { ALLOWED_FILE_TYPES } from 'constant';

import { StyledFileInput, StyledTextField, styleMuiTextField } from './style';
function FormInput({
    control,
    name,
    label,
    type = 'text',
    error,
    defaultValue,
    options,
    views,
    format: dateFormat,
    ...rest
}) {
    const theme = useTheme();

    const defaultOptions = {
        defaultValue,
        error: !!error,
        variant: 'outlined',
        size: 'small',
        helperText: error,
        type,
        label,
        fullWidth: true,
        inputProps: {
            form: {
                autoComplete: 'off',
            },
        },
        ...rest,
    };

    switch (type) {
        case 'switch':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Switch
                            {...defaultOptions}
                            {...field}
                            checked={field.value}
                            {...rest}
                        />
                    )}
                />
            );
        case 'select':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange, ref } }) => (
                        <TextField
                            {...defaultOptions}
                            inputRef={ref}
                            onChange={onChange}
                            select
                            value={value}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            );
        case 'multiple-select':
            return (
                <Controller
                    control={control}
                    defaultValue={defaultValue}
                    name={name}
                    render={({
                        field: { onChange, value, name: optionName },
                    }) => (
                        <FormControl>
                            <InputLabel>{label}</InputLabel>
                            <Select
                                {...defaultOptions}
                                input={<OutlinedInput label={label} />}
                                multiple
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                            >
                                {options.map((option) => (
                                    <MenuItem key={optionName} value={option}>
                                        {optionName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
            );
        case 'custom-date':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <DatePicker
                                disablePast
                                format={dateFormat}
                                onChange={onChange}
                                slotProps={{
                                    textField: {
                                        ...defaultOptions,
                                        ...rest,
                                        inputProps: {
                                            readOnly: true,
                                        },
                                    },
                                }}
                                {...rest}
                                sx={{ ...styleMuiTextField(theme) }}
                                value={value}
                                views={views}
                            />
                        );
                    }}
                />
            );
        case 'file':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <>
                            <StyledFileInput
                                accept={ALLOWED_FILE_TYPES}
                                onChange={(e) => onChange(e.target.files[0])}
                                variant="outlined"
                                {...defaultOptions}
                                {...rest}
                            />
                            <Typography
                                sx={{
                                    color: theme.palette.error.main,
                                    paddingLeft: theme.spacing(2),
                                    fontSize: theme.spacing(1.5),
                                }}
                            >
                                {error || ''}
                            </Typography>
                        </>
                    )}
                />
            );
        case 'textarea':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange, ref } }) => (
                        <StyledTextField
                            fullWidth
                            multiline
                            onChange={onChange}
                            ref={ref}
                            rows={8}
                            value={value}
                            {...rest}
                            {...defaultOptions}
                        />
                    )}
                />
            );
        case 'checkbox':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value}
                                    onChange={onChange}
                                    {...defaultOptions}
                                    {...rest}
                                />
                            }
                            label={label}
                        />
                    )}
                />
            );
        case 'password': {
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <StyledTextField
                            fullWidth
                            onChange={onChange}
                            value={value}
                            {...defaultOptions}
                            {...rest}
                        />
                    )}
                />
            );
        }
        default:
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <StyledTextField
                            fullWidth
                            onChange={onChange}
                            value={value}
                            {...defaultOptions}
                            {...rest}
                        />
                    )}
                />
            );
    }
}

export default FormInput;
