import React, { FC, useRef } from 'react'
import s from './Modal.module.css'
import { FocusScope } from '@react-aria/focus'
import { Transition } from '@headlessui/react'
import { useOverlay, OverlayContainer } from '@react-aria/overlays'
import { usePreventScroll } from 'react-aria'
import { useUI } from '../context'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

const Modal: FC<Props> = (props) => {
  const { displayModal } = useUI()
  const { children, open = false, onClose } = props
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>

  let { overlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: false,
      onClose: onClose,
      ...props,
    },
    ref
  )

  usePreventScroll({ isDisabled: !displayModal })

  return (
    <Transition show={open}>
      <OverlayContainer>
        <div className={s.root}>
          <div className={s.container}>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            </Transition.Child>

            <FocusScope contain restoreFocus autoFocus>
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                className="flex items-center justify-center min-h-screen"
              >
                <div
                  className={s.modal}
                  {...overlayProps}
                  ref={ref}
                  tabIndex={0}
                >
                  {children}
                </div>
              </Transition.Child>
            </FocusScope>
          </div>
        </div>
      </OverlayContainer>
    </Transition>
  )
}

export default Modal
