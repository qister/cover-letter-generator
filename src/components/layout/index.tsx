import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../header'

import styles from './styles.module.css'

const MainContent = ({ children }: { children: ReactNode }) => (
  <main className={styles.mainContent}>{children}</main>
)

export const Layout = () => (
  <>
    <Header />
    <MainContent>
      <Outlet />
    </MainContent>
  </>
)
