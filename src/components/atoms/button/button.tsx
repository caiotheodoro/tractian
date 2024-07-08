'use client';
import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  type: 'primary' | 'default' | 'outline' | 'invisible' | 'ghost';
  size: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;

  active?: boolean;
}

export default function Button({
  type,
  size,
  icon,
  children,
  onClick,
  active
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[size]} ${active && styles.active}`}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
