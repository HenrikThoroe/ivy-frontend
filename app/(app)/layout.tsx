import Navbar from '@/components/Navbar/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'

export const metadata = {
  title: 'Ivy',
  description: 'Chess Engine Manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row overflow-scroll  bg-primary px-[20px]">
      <div className="sticky top-0 h-full py-[14px]">
        <Sidebar />
      </div>
      <div className="h-fit w-full px-[40px] py-[49px]">
        <Navbar />
        <main className="h-full w-full px-[20px] py-[15px]">{children}</main>
      </div>
    </div>
  )
}
