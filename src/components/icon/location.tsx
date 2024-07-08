import Image from 'next/image'
import React from 'react'

export default function LocationIcon({
  width = 20,
  height = 20,
  className
}:Readonly<IconProps>) {
  return (
    <Image
      src="/location.png"
      alt="Location Icon"
      width={width}
      height={height}
      className={className}
    />
  )
}
