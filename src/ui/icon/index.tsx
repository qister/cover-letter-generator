import { useEffect, useState } from 'react'

type IconImg = 'check' | 'copy' | 'delete' | 'home' | 'plus' | 'repeat'

export const Icon = ({ image, alt }: { image: IconImg; alt?: string }) => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    import(`./iconImages/${image}.svg`).then((icon) => setSrc(icon.default))
  }, [image])

  if (!src) return null

  return <img src={src} alt={alt} />
}
