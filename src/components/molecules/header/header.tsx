'use client'
import React from 'react'
import styles from './header.module.css'
import LogoIcon from '@/components/icon/logo'
import Link from 'next/link'
import Button from '@/components/atoms/button/button'
import GoldIcon from '@/components/icon/gold'
import { usePathname, useRouter } from 'next/navigation'
export default function Header() {
  const router = useRouter()
  const pathname = usePathname();
  const handleRedirect = (path: string) => {
    router.push(path)
  }

  
  return (
    <header className={styles.container}>
        <div className={styles.content}>
          <Link href="#" className={styles.link}>
            <LogoIcon />
          </Link>
        </div>
        <div className={styles.buttonGroup}>
          {headerItems.map((item, index) => (
            <Button
              icon={<GoldIcon  />}
              key={index}
              type={'primary'}
              size="small"
              active={pathname === item.href}
              onClick={() => handleRedirect(item.href)}
            >
              <span>{item.title}</span>
            </Button>
          ))}
        </div>
      </header>
  )
}


const headerItems = [
  {
    title: 'Apex Unit',
    href: '/apex-unit',
  },
  {
    title: 'Tobias Unit',
    href: '/tobias-unit',
  },
  {
    title: 'Jaguar Unit',
    href: '/jaguar-unit',
  },
]