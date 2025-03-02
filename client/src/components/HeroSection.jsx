import { Button } from '@mantine/core'
import { Sparkles } from 'lucide-react'
import React from 'react'

export const HeroSection = () => {
  return (
    <div className='h-screen flex justify-center items-center relative'>
        <div className='flex justify-center items-center absolute inset-0 bg-gradient-to-b from-sky-500/20 to-black'>

        <div className='relative z-10'>
        <h1>AI Summary</h1>
        <Button leftSection={<Sparkles/>}>Explore Now</Button>

        </div>
        </div>
    </div>
  )
}
