import Image from 'next/image'
import React from 'react'

export default function AssetIcon({
  width = 20,
  height = 20,
  className
}:Readonly<IconProps>) {
  return (
    <Image
      src="/asset.png"
      alt="Location Icon"
      width={width}
      height={height}
      className={className}
    />
  )
}
