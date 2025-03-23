import React from 'react'
import { Category } from '../components/Category'
import { HeroSection } from '../components/HeroSection'
import EditorialsSection from '../components/EditorialsSection'
import NewsletterSubscription from '../components/NewsLetterSubscription'

const Homepage = () => {
  return (
    <div>
    <HeroSection/>
        <Category/>
        <EditorialsSection/>
        <NewsletterSubscription/>
      
    </div>
  )
}

export default Homepage
