import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentProps<'button'>{
    children?: ReactNode;
    label?: string;
}

export const Button = (props: ButtonProps) => {
    const {
        children,
        type = 'primary',
        label = 'React Button',
        ...otherProps
    } = props;

    const cx = classNames.bind(styles);

    return (
        <button
            className={cx('button')}
            {...otherProps}
        >
            { children || label }
        </button>
    );
}

export default Button;