import React, { FC, HTMLAttributes } from 'react'
import cn from 'classnames'
import s from './Card.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: any
}

const Card: FC<Props> = (props) => {
  const { className, children, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  return (
    <div className={rootClassName} {...rest}>
      <div className={s.content}>{children}</div>
    </div>
  )
}

export default Card
