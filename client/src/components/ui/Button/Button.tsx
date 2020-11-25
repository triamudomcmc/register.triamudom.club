import cn from 'classnames'
import React, {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import { useButton } from 'react-aria'
import s from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

const Button: FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    children,
    active,
    onClick,
    width,
    Component = 'button',
    loading = false,
    disabled = false,
    style = {},
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)
  const { buttonProps, isPressed } = useButton(
    {
      ...rest,
      // @ts-ignore onClick === onPress for our purposes
      onPress: onClick,
      isDisabled: disabled,
      elementType: Component,
    },
    ref
  )

  const rootClassName = cn(
    s.root,
    {
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )

  return (
    <Component
      aria-pressed={active}
      ref={mergeRefs([ref, buttonRef])}
      {...buttonProps}
      data-active={isPressed ? '' : undefined}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
    >
      {children}
    </Component>
  )
})

export default Button
