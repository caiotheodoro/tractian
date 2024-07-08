'use client'
import Header from '@/components/molecules/header/header'
import React from 'react'
import styles from './layout.module.css'

export default function Layout({children}: Readonly<ComponentProps>) {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.content}>
          {children}
      </main>
    </div>
  )
}
