import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const PhoneSettingNav = () => {
  const pathname = usePathname()

  const links = [
    {href: '/workspace/agents/phone/phonesetting/playground', label: 'Playground'},
    {href: '/workspace/agents/phone/phonesetting/callhistory', label: 'Call History'},
    {href: '/workspace/agents/phone/phonesetting/connect', label: 'Connect'},
    {href: '/workspace/agents/phone/phonesetting/configure', label: 'Configure'},
  ]
    
  return (
    <>
        <div className={`flex gap-[1vw] `}>
          {links.map((link, index) => (
            <>
              <Link href={link.href} className={`${(pathname.includes(link.href) || (index > 2 && pathname.includes(link.href.slice(0, 44)))) && 'border-b-[.25vw] border-zinc-500'} px-[.5vw] pb-[.8vw]`}>{link.label}</Link>
            </>
          ))}
        </div>
    </>
  )
}

export default PhoneSettingNav