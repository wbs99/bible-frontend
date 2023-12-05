import { animated, useSpring } from '@react-spring/web'
import { Children, ReactNode, useState } from 'react'
import { CurrentUser } from './TopMenu/CurrentUser'
import { Menu } from './TopMenu/Menu'

type Props = {
  onClickMask?: () => void
  visible?: boolean
  children?: ReactNode
}

export const LeftMenu = (props: Props) => {
  const { onClickMask, visible, children } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  // 打开动画 0 => 1
  // 关闭动画 1 => 0
  const markStyle = useSpring({
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(true)
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(false)
      }
    }
  })
  const menuStyle = useSpring({
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(100%)'
  })

  return (
    <>
      <animated.div className="fixed top-0 right-0 w-100% h-100% z-[calc(var(--z-menu)-1)] bg-black:75" style={markStyle} onClick={onClickMask}
      />
      <animated.div className='fixed top-0 right-0 w-70vw max-w-20em h-100% z-[var(--z-menu)] flex flex-col' style={menuStyle}>
        {children}
      </animated.div>
    </>
  )
}
