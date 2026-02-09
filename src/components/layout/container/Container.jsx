import styled from './Container.module.scss'

export default function Container({ className, children }) {
  return <div className={styled.Container}>{children}</div>
}
