import { joiResolver } from '@hookform/resolvers/joi';
import { useForm as useReactHookForm } from 'react-hook-form';

import FormInput from '../components/Field';

const useForm = ({ validationSchema, defaultValues }) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useReactHookForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: joiResolver(validationSchema),
        defaultValues,
    });

    function FormField({ name, label, ...rest }) {
        return (
            <FormInput
                control={control}
                error={errors[name]?.message}
                label={label}
                name={name}
                {...rest}
            />
        );
    }

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        FormField,
        reset,
    };
};

export default useForm;
