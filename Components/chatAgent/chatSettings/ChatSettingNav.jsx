import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const ChatSettingNav = () => {
  const pathname = usePathname()

  const links = [
    {href: '/workspace/agents/chats/chatsetting/playground', label: 'Playground'},
    {href: '/workspace/agents/chats/chatsetting/activity', label: 'Activity'},
    {href: '/workspace/agents/chats/chatsetting/source', label: 'Source'},
    {href: '/workspace/agents/chats/chatsetting/connect/embeds', label: 'Connect'},
    {href: '/workspace/agents/chats/chatsetting/settings/general', label: 'Settings'},
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

export default ChatSettingNav