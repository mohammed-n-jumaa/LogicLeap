import React from 'react'
import { Tab, Nav } from 'react-bootstrap'
import Features from '../components/Features'
import NavServicse from '../components/navServices'
import Partner from '../components/partner'

function Services() {
  return (
<main className="main">



  {/* Services Section */}
  
  <NavServicse />
  {/* /Services Section */}

  <Features />

  {/* Features 2 Section */}
  
  {/* /Features 2 Section */}
  {/* Clients Section */}
  <Partner />
  {/* /Clients Section */}
  {/* Services Section */}
  
  {/* /Services Section */}
</main>

  )
}

export default Services