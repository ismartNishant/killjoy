import { useRef, useState, useEffect } from 'react'
import Button from './Button'
import clsx from 'clsx'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isIndicatorActive, setisIndicatorActive] = useState(false)
  const navContainerRef = useRef(null)
  const audioElementRef = useRef(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  const { y: currentScrollY } = useWindowScroll()

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(prev => !prev)
    setisIndicatorActive(prev => !prev)
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play()
    } else {
      audioElementRef.current.pause()
    }
  }, [isAudioPlaying])

  const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavbarVisible(true)
      navContainerRef.current.classList.remove('floating-nav')
    } else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false)
      navContainerRef.current.classList.add('floating-nav')
    } else if (currentScrollY < lastScrollY) {
      setIsNavbarVisible(true)
      navContainerRef.current.classList.add('floating-nav')
    }
    setLastScrollY(currentScrollY)
  }, [currentScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.2
    })
  }, [isNavbarVisible])

  return (
    <div
      ref={navContainerRef}
      className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
    >
      <header className=' absolute top-1/2  w-full -translate-y-1/2'>
        <nav className='flex items-center size-full justify-between p-4'>
          <div className='flex items-center gap-7'>
            <img src='/img/logo.png' alt='logo' className='w-10' />
            <Button
              id='product-button'
              title='Products'
              rightIcon={<TiLocationArrow />}
              containerClass='!bg-limegreen md:flex hidden items-center justify-center gap-1'
            />
          </div>
          <div className='flex  h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className='nav-hover-btn'
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              className='ml-10 flex items-center space-x-0.5'
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                src='/audio/loop.mp3'
                className='hidden'
                loop
              />
              {[1, 2, 3, 4].map(bar => (
                <div
                  key={bar}
                  className={clsx('indicator-line', {
                    active: isIndicatorActive
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
