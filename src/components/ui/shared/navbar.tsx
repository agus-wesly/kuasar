import { HambergerMenu } from 'iconsax-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { buttonVariants } from '../button'
import { cn } from '@/lib/utils'
import useScroll from '@/hooks/use-scroll'

const MENU_ITEMS = [
  { label: 'For Creator' },
  { label: 'Reach Beyond Borders' },
  { label: 'For Business' },
  { label: 'Page Explore More' },
] as const

const MENU_ITEMS_DESKTOP = [
  { label: 'For Business' },
  { label: 'For Creators' },
  { label: 'Schedule a Meeting' },
] as const

type Props = {}

export default function Navbar({}: Props) {
  const scrolled = useScroll(20)

  return (
    <nav
      className={cn('sticky top-0 bg-white/80 backdrop-blur-lg z-[4]', {
        'border-b': scrolled,
      })}
    >
      <div className="container flex justify-between items-center py-3">
        <a href="#">
          <img
            src="https://static.wixstatic.com/media/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png/v1/fill/w_114,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png"
            className="w-[96px]"
          />
        </a>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <HambergerMenu size="24" color="purple" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mt-6">
                <SheetTitle className="text-2xl">MENU</SheetTitle>
              </SheetHeader>
              <ul className="pt-10 px-4 flex flex-col gap-2 text-sm text-primary/80 font-semibold">
                {MENU_ITEMS.map((item) => (
                  <a className="py-2 border-b" key={item.label} href="#">
                    {item.label}
                  </a>
                ))}
                <li></li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex gap-4">
          {MENU_ITEMS_DESKTOP.map((item) => (
            <a
              key={item.label}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'rounded-full text-sm'
              )}
              href={'#'}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
