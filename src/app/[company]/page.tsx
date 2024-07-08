import Button from '@/components/atoms/button/button'
import React from 'react'
import styles from '@/app/[company]/page.module.css'
import LockIcon from '@/components/icon/lock'
import DangerIcon from '@/components/icon/danger'

export default function Company({params: {company}}:Readonly<DynamicProps>) {
  return (
    <div className={styles.header}>
        <div className={styles.headerText}>Ativos <span>/ {company}</span></div>
        <div className={styles.headerButtons}>
          <Button type="ghost" size="medium" icon={<LockIcon />} >
            <span>Filter label</span>
          </Button>
          <Button type="ghost" size="medium" icon={<DangerIcon />} >
            <span>Crítico</span>
          </Button>
        </div>
      </div>
  )
}
